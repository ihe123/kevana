import React, { Component } from 'react';
import TriviaCard from '../components/TriviaCard';
import UsersList from '../components/UsersList';
import TriviaFinishedCard from '../components/TriviaFinishedCard';
import { firebaseAuth, firestore } from '../services/firebaseConstants';
import UnauthenticatedSplash from '../components/UnauthenticatedSplash';
import Layout from '../components/layout';

class TriviaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      currentQuestionNumber: '',
      currentChoices: [],
      currentQuestionBody: '',
      gameRoom: 'waitingRoom',
      users: [],
      selectedChoice: '',
      userEmail: '',
      finalQuestion: '',
      finishedTriviaGame: false,
      answerFrequencyData: []
    }
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true
        });
      } else {
        this.setState({
          authed: false
        });
      }
    });
  }

  getFinalQuestionNumber = () => {
    return firestore.collection('triviaQuestions').doc('finalQuestion').get()
      .catch(err => {
        console.log('Error fetching final question number: ', err);
      })
  }  

  getCurrentTriviaData = questionNumber => {
    return firestore.collection('triviaQuestions').doc(questionNumber).get()
      .catch(err => {
        console.log('Error fetching question choices: ', err);
      })
  }

  getAnswerFrequencyData = data => {
    const { gameRoom, currentQuestionNumber, currentChoices} = data;

    let answerFrequency = currentChoices.reduce( (acc, choice) => {
      acc[choice] = 0;
      return acc;
    }, {});

    return firestore.collection(`gameRooms/${gameRoom}/submissions`)
      .where('currentQuestionNumber', '==', currentQuestionNumber)
      .get()
      .then( snapshot => {
        snapshot.forEach(doc => {
          const { userAnswer } = doc.data();
          if (answerFrequency[userAnswer] === undefined) {
            answerFrequency[userAnswer] = 1;
          } else {
            answerFrequency[userAnswer] += 1;
          }
        })

        const answerFrequencyData = Object.keys(answerFrequency).map( answer => (
          { answer, count: answerFrequency[answer]}
        ))

        return answerFrequencyData;
      })
      .catch( err => {
        console.log('Error retrieving data for answer frequency chart: ', err);
      })
  }

  hostNewGame = () => {
    const email = firebaseAuth().currentUser.email;

    this.getFinalQuestionNumber()
      .then( doc => {
        const finalQuestion = doc.data().number;
        this.setState({
          finalQuestion
        });
      });

    return firestore.collection('gameRooms').add({
        users: [email]
      })
      .then(docReference => {
        const gameRoom = docReference.id;
        console.log(`New game created with Game Room ID of: ${gameRoom}`);
        this.setState({
          currentQuestionNumber: '1',
          gameRoom,
          userEmail: email
        }, () => {
          this.unsubFromGame = firestore.doc(`gameRooms/${gameRoom}`).onSnapshot(doc => {
            const users = doc.data().users;
            this.setState({
              users
            });
          })
        })
      })
      .catch(err => {
        console.log('Error in creating new game: ', err);
      })
  }

  joinGame = room => {
    const email = firebaseAuth().currentUser.email;
    this.setState({
      userEmail: email
    });

    firestore.collection('gameRooms').doc(room).get()
      .then(doc => {
        const currentUsers = doc.data().users;
        if (!currentUsers.includes(email)) {
          doc.ref.update({
            users: [...currentUsers, email]
          });
        }
      })
      .catch(err => {
        console.log('Error adding user to room: ', err);
      });

    this.getFinalQuestionNumber()
      .then( doc => {
        const finalQuestion = doc.data().number;
        this.setState({
          finalQuestion
        });
      });

    this.setState({
      gameRoom: room,
      currentQuestionNumber: '1'
    }, () => {        
      this.unsubFromGame = firestore.doc(`gameRooms/${room}`).onSnapshot(doc => {
        const users = doc.data().users;
        this.setState({
          users
        });
      });
    });
  }

  handleSubmitAnswer = event => {
    event.preventDefault();
    const { gameRoom, currentQuestionNumber, selectedChoice, userEmail, finalQuestion } = this.state;

    if (selectedChoice === '') {
      alert('Whoa there, you need to select a choice before submitting!');
    } else {
      firestore.collection(`gameRooms/${gameRoom}/submissions`)
        .where('userEmail', '==', userEmail)
        .where('currentQuestionNumber', '==', currentQuestionNumber)
        .get()
        .then( snapshot => {
          if (snapshot.size > 0) {
            snapshot.forEach(doc => {
              doc.ref.update({
                currentQuestionNumber,
                userAnswer: selectedChoice,
                userEmail
              }).then( () => {
                this.setState({
                  selectedChoice: ''
                });
              })
            })
          } else {
            firestore.collection(`gameRooms/${gameRoom}/submissions`).add({
              currentQuestionNumber,
              userAnswer: selectedChoice,
              userEmail 
            }).then( () => {
              this.setState({
                selectedChoice: ''
              });
            });
          }
        })
  
      if (finalQuestion !== currentQuestionNumber) {
        this.setState(prevState => {
          const prevQuestionNumber = parseInt(prevState.currentQuestionNumber)
          return {
            currentQuestionNumber: (prevQuestionNumber + 1).toString()
          }
        }, () => {
          const { currentChoices } = this.state;
          this.getAnswerFrequencyData({gameRoom, currentQuestionNumber, currentChoices})
            .then(answerFrequencyData => {
              this.setState({
                answerFrequencyData
              });
            });
        });
      } else {
        this.setState({
          finishedTriviaGame: true
        });
      }
    }
  }

  handleRadioSelection = event => {
    this.setState({
      selectedChoice: event.target.value
    });
  }

  componentWillUnmount() {
    const { gameRoom } = this.state;
    if (gameRoom !== 'waitingRoom') {
      this.unsubFromGame();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestionNumber !== prevState.currentQuestionNumber) {
      this.getCurrentTriviaData(this.state.currentQuestionNumber)
        .then(doc => {
          const currentChoices = doc.data().data.choices;
          const currentQuestionBody = doc.data().data.question;

          this.setState({
            currentChoices
          }, () => {
            const { currentQuestionNumber, currentChoices, gameRoom } = this.state;
            this.getAnswerFrequencyData({gameRoom, currentQuestionNumber, currentChoices})
              .then(answerFrequencyData => {
                this.setState({
                  answerFrequencyData
                });
              });
          });

          this.setState({
            currentQuestionBody
          });
        })
    }
  }

  render() {
    const {
      currentQuestionNumber, 
      currentChoices, 
      currentQuestionBody, 
      gameRoom, 
      users, 
      finishedTriviaGame, 
      answerFrequencyData, 
      selectedChoice, 
      authed
    } = this.state;
    return (
      <Layout>
        <div>
          <div className="secondary-page" style={{background: '#EAADAD'}}>
            <h1 style={{color: 'white', textAlign: 'center'}}>Trivia!</h1>
          </div>
          {
            ! authed ?
              <UnauthenticatedSplash /> :
              finishedTriviaGame ?
                <TriviaFinishedCard/> :
                <TriviaCard
                  number={currentQuestionNumber} 
                  choices={currentChoices} 
                  question={currentQuestionBody} 
                  gameRoom={gameRoom}
                  answerFrequencyData={answerFrequencyData}
                  hostNewGame={this.hostNewGame} 
                  handleRadioSelection={this.handleRadioSelection} 
                  handleSubmitAnswer={this.handleSubmitAnswer} 
                  joinGame={this.joinGame}
                  selectedChoice={selectedChoice}
                />
          }
          {
            (gameRoom !== 'waitingRoom' && !finishedTriviaGame) ?
              <UsersList 
                users={users} 
                gameRoom={gameRoom}/> :
              null
          }
        </div>
      </Layout>
    )
  }
}

export default TriviaPage;