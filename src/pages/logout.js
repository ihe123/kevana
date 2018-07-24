import React, { Component } from 'react';
import { logout } from '../services/auth';


class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleLogout = event => {
    logout()
      .then( () => {
        console.log('logout successful!');
        window.location.href = '/';
      })
      .catch( err => {
        console.log('error when logging out: ', err);
      })
  }

  render() {
    return (
      <div className="splash-container" style={{background: '#F48788'}}>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

export default login;