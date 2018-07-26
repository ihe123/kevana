import React, { Component } from 'react';

class AboutUsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  render() {
    return (
      <div>
        <div className="secondary-page" style={{background: '#EAADAD'}}>
          <h1 style={{color: 'white', textAlign: 'center'}}>About Us</h1>
        </div>
        <div>
  
        </div>
      </div>
    )
  }
}

export default AboutUsPage;