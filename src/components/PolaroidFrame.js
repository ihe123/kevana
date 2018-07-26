import React from 'react';
import '../css/PolaroidFrame.css';
import pic1 from '../img/DSC05087.jpg';

const PolaroidFrame = props => {
  const { url, caption } = props;

  return (
    <div className='polaroid-outer-container'>
      <div className='polaroid-inner-container'>
        <img className='polaroid-image' src={url}/>
        <p className='polaroid-caption'>{caption}</p>
      </div>
    </div>
  )
}

export default PolaroidFrame;