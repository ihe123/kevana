import React, { Component } from 'react';
import { auth } from '../services/auth';


class signup extends Component {
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

    auth(email, password)
      .then( () => {
        console.log('new user signed up!');
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
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}

export default signup;