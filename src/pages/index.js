import React from 'react'
import Link from 'gatsby-link'

import heartIcon from '../svg/ic_favorite_black_24px.svg';
import '../css/Home.css';

const IndexPage = () => (
  <div>
    <div className="splash-container" style={{background: '#F48788'}}>
      <h1 style={{color: 'white', textAlign: 'center'}}>Come Celebrate Our Wedding!</h1>
    </div>
    <div className="splash-container" style={{background: '#EAADAD'}}>
      <h1 style={{color: 'white', textAlign: 'center'}}>Venue Details</h1>
    </div>
    <div className="splash-container" style={{background: '#77878B', height: '20vh', width: '100vw'}}>
      <p style={{color: 'white'}}>Made with <img className="svg-icon" src={heartIcon} alt="heart icon"/> in San Francisco</p>
    </div>
  </div>
)

export default IndexPage
