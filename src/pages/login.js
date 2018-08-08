import React, { Component } from 'react';
import { loginEmail, resetPassword } from '../services/auth';
import Link from 'gatsby-link';
import '../css/Login.css';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      wrongPassword: false,
      validEmail: true,
      userFound: true,
      passwordResetEmailSent: false
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

  handleForgotPassword = () => {
    const { email } = this.state;
    resetPassword(email)
      .then( () => {
        console.log('Password reset email sent');
        this.setState({
          passwordResetEmailSent: true
        });
      })
      .catch( err => {
        if (err.code === 'auth/invalid-email') {
          console.log('invalid email address');
          this.setState({
            validEmail: false
          });
        } else if (err.code === 'auth/user-not-found') {
          console.log('no user found with that email address');
          this.setState({
            userFound: false,
            validEmail: true
          });
        } else {
          console.log('Error occurred when sending reset email: ', err);
        }
      })
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
        console.log('Login error occurred: ', err);
        if (err.code === 'auth/wrong-password') {
          this.setState({
            wrongPassword: true,
            validEmail: true,
            userFound: true
          });
        } else if (err.code === 'auth/user-not-found') {
          console.log('no user found with that email address');
          this.setState({
            userFound: false,
            validEmail: true
          });
        } else if (err.code === 'auth/invalid-email') {
          console.log('invalid email address');
          this.setState({
            validEmail: false
          });
        }
      })
  }

  render() {
    const { wrongPassword, userFound, validEmail } = this.state;
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
          { (wrongPassword || !validEmail) ?
              <div>
                <p style={{color: 'white'}}>Invalid username or password.</p>
                <button onClick={this.handleForgotPassword}>Forgot Password</button>
              </div> :
              null 
          }
          { 
            !userFound ?
              <p style={{color: 'white'}}>No user found with that email address.</p> :
              null
          }
        </form>
      </div>
    )
  }
}

export default login;