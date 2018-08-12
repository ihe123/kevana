import React, { Component } from 'react'
import UnauthenticatedSplash from '../components/UnauthenticatedSplash';
import VenueCard from '../components/VenueCard';
import { ref } from '../services/firebaseConstants';

class VenuePage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      venueDetails: {},
      loading: true
    };
  }

  componentDidMount() {
    const { venueDetails } = this.state;

    ref.child('venueDetails').once('value')
      .then(snapshot => {
        // console.log('snapshot', snapshot);
        const newVenueDetails = snapshot.val();
        // console.log('newVenueDetails', newVenueDetails);
        this.setState({
          venueDetails: {...venueDetails, ...newVenueDetails},
          loading: false
        });
      })
      .catch(err => {
        console.log('error in getting rsvp data: ', err);
        this.setState({
          loading: false
        });
      })
  }

  render() {
    const { venueDetails, loading } = this.state;

    return (
      <div>
        {
          loading === true ?
            <div className="splash-container" style={{background: '#77878B'}}>
              <h1 style={{color: 'white', textAlign: 'center'}}>Loading...</h1>
            </div> :
            Object.keys(venueDetails).length === 0 ?
              <UnauthenticatedSplash/> :
              <div>
                <VenueCard 
                  type='Ceremony' 
                  name={venueDetails.ceremony.locationName} 
                  address={venueDetails.ceremony.locationAddress} 
                  startTime={venueDetails.ceremony.startTime} 
                  background='#FBBEA7'
                />
                <VenueCard
                  type='Banquet' 
                  name={venueDetails.banquet.locationName} 
                  address={venueDetails.banquet.locationAddress} 
                  startTime={venueDetails.banquet.startTime} 
                  background='#F48788'
                />
              </div>
        }
      </div>
    )
  }
}

export default VenuePage