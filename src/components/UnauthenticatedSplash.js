import React from 'react';
import Link from 'gatsby-link';

const UnauthenticatedSplash = props => (
  <div className="splash-container" style={{background: 'red'}}>
    <h1 style={{color: 'white', textAlign: 'center'}}>Seeing this? <Link to="/login">Login</Link> with your credentials.</h1>
  </div>
)

export default UnauthenticatedSplash;