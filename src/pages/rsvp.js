import React, { Component } from 'react';
import UnauthenticatedSplash from '../components/UnauthenticatedSplash';
import { ref } from '../services/firebaseConstants';

class RsvpPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      rsvpLink: '',
      loading: true
    };
  }

  componentDidMount() {
    ref.child('rsvpLink').once('value')
      .then(snapshot => {
        // console.log('snapshot', snapshot);
        const rsvpLink = snapshot.val();
        this.setState({
          rsvpLink,
          loading: false
        });
      })
      .catch(err => {
        console.log('error in getting rsvp data: ', err);
        this.setState({
          loading: false
        })
      })
  }

  render() {
    const { rsvpLink, loading } = this.state;
    return (
      <div>
        {
          loading === true ?
            <div className="splash-container" style={{background: '#77878B'}}>
              <h1 style={{color: 'white', textAlign: 'center'}}>Loading...</h1>
            </div> :
            rsvpLink === '' ?
              <UnauthenticatedSplash/> :
              <div className="splash-container" style={{background: '#77878B'}}>
                <h1 style={{color: 'white', textAlign: 'center'}}>RSVP Link: <a href={rsvpLink}>Google Form</a></h1>
              </div>            
        }
      </div>
    )
  }
}

export default RsvpPage