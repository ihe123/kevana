import React from 'react';
import '../css/VenueCard.css';

const VenueCard = props => {
  const { type, name, address, startTime, background } = props;
  // const placeholderProps = {
  //   type: 'Banquet',
  //   name: 'Tai Wu',
  //   address: '300 El Camino',
  //   startTime: '6:00 PM',
  //   background: '#77878B' 
  // };

  // const { type, name, address, startTime, background } = placeholderProps;

  return (
    <div className='venue-container' style={ { background, color: 'white' } }>
      <h1>{type}</h1>
      <h2>{name}</h2>
      <h2>{address}</h2>
      <h2>{startTime}</h2>
    </div>
  )
}

export default VenueCard;