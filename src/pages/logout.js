import React, { Component } from 'react';
import { logout } from '../services/auth';
import '../css/Logout.css';
import Layout from '../components/layout';

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
      <Layout>
        <div className="splash-container" style={{background: '#F48788'}}>
          <button className="logout-button" onClick={this.handleLogout}>Logout</button>
        </div>
      </Layout>
    )
  }
}

export default login;