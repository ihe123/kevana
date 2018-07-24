import React, { Component } from 'react';
import { loginEmail } from '../services/auth';
import Link from 'gatsby-link';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    loginEmail(email, password)
      .then( () => {
        console.log('logged in!');
        window.location.href = '/';
      })
      .catch( err => {
        console.log('error in creating new user: ', err);
      })
  }

  render() {
    return (
      <div className="splash-container" style={{background: '#F48788'}}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default login;