import React, { Component } from 'react';
import UnauthenticatedSplash from '../components/UnauthenticatedSplash';
import { ref, storage } from '../services/firebaseConstants';
import Layout from '../components/layout';
import '../css/Rsvp.css';

class RsvpPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      rsvpLink: '',
      loading: true,
      invitationFrontURL: '',
      invitationBackURL: '',
      rsvpCardURL: ''
    };
  }

  componentDidMount() {
    ref.child('rsvpLink').once('value')
      .then(snapshot => {
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

    storage.ref('invitations/Invitation_back.JPG').getDownloadURL().then(url => {
      this.setState({
        invitationBackURL: url
      });
    });

    storage.ref('invitations/Invitation_front.JPG').getDownloadURL().then(url => {
      this.setState({
        invitationFrontURL: url
      });
    });

    storage.ref('invitations/RSVP.JPG').getDownloadURL().then(url => {
      this.setState({
        rsvpCardURL: url
      });
    });
  }

  render() {
    const { rsvpLink, loading, invitationFrontURL, invitationBackURL, rsvpCardURL } = this.state;
    return (
      <Layout>
        <div>
          {
            loading === true ?
              <div className="splash-container" style={{background: '#77878B'}}>
                <h1 style={{color: 'white', textAlign: 'center'}}>Loading...</h1>
              </div> :
              rsvpLink === '' ?
                <UnauthenticatedSplash/> :
                <div>
                  <div className="splash-container" style={{background: '#77878B', height: '50vh'}}>
                    <h1 style={{color: 'white', textAlign: 'center'}}>RSVP Link: <a href={rsvpLink}>Google Form</a></h1>
                  </div>
                  <div className="splash-container" style={{background: '#F48788', height: '30vh'}}>
                    <h2 style={{color: 'white', textAlign: 'center'}}>Scans of the Physical Cards</h2>
                  </div>
                  <div className='invitations-container' style={{background: '#F48788'}}>
                    <div className='invitation'>
                      <img className='invitation-card-img' src={invitationFrontURL}/>
                    </div>
                    <div className='invitation'>
                      <img className='invitation-card-img' src={invitationBackURL}/>
                    </div>
                    <div className='invitation'>
                      <img className='invitation-card-img rsvp' src={rsvpCardURL} style={{maxHeight: '50vh'}}/>
                    </div>
                  </div>
                </div>
          }
        </div>
      </Layout>
    )
  }
}

export default RsvpPage