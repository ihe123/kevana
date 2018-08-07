import React, { Component } from 'react';
import { loginEmail } from '../services/auth';
import Link from 'gatsby-link';
import '../css/Login.css';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      wrongPassword: false
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
        // console.log('logged in!');
        window.location.href = '/';
      })
      .catch( err => {
        console.log('error occurred: ', err);
        if (err.code === 'auth/wrong-password') {
          this.setState({
            wrongPassword: true
          });
        }
      })
  }

  render() {
    const { wrongPassword } = this.state;
    return (
      <div className="splash-container" style={{background: '#F48788'}}>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <input className="form-submit-button" type="submit" value="Login" />
          { wrongPassword ? <p style={{color: 'white'}}>Invalid username or password.</p> : null }
        </form>
      </div>
    )
  }
}

export default login;