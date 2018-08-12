import React from 'react';
import '../css/VenueCard.css';

const VenueCard = props => {
  const { type, name, address, startTime, background } = props;

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