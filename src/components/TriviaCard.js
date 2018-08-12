import React, { Component } from 'react';
import TriviaGame from './TriviaGame';
import GameRoomsList from './GameRoomsList';
import '../css/TriviaCard.css';

class TriviaCard extends Component {
  render() {
    const { number, choices, question, gameRoom, hostNewGame, handleRadioSelection, handleSubmitAnswer, joinGame, answerFrequencyData, selectedChoice } = this.props;
    
    return (
      <div className="trivia-card">
        { 
          gameRoom === 'waitingRoom' ?
            <div style={{display: 'flex', flexDirection: 'column', padding: '1rem', alignItems: 'center'}}>
              <h3>Host a New Game:</h3>
              <button onClick={ hostNewGame } style={{maxWidth: '230px'}}>Host a New Trivia Game</button>
              <h3 style={{paddingTop: '1rem'}}>Join an Existing Trivia Game:</h3>
              <GameRoomsList joinGame={joinGame}/>
            </div> :
            choices.length > 0 ?
              <TriviaGame 
                number={number} 
                choices={choices} 
                question={question} 
                answerFrequencyData={answerFrequencyData}
                handleRadioSelection={handleRadioSelection} 
                handleSubmitAnswer={handleSubmitAnswer}
                selectedChoice={selectedChoice}
                gameRoom={gameRoom}/> :
              <p>Loading trivia game...</p>
        }
      </div>
    )
  }
}

export default TriviaCard;