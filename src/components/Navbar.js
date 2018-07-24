import React, {Component} from 'react';
import Link from 'gatsby-link';
import { firebaseAuth } from '../services/firebaseConstants';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  toggleNavTransparency = event => {
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link > a');
    if (document.documentElement.scrollTop || document.body.scrollTop > window.innerHeight) {
      nav.classList.add('nav-colored');
      nav.classList.remove('nav-transparent');
      navLinks.forEach( link => {
        link.classList.add('nav-link-colored');
        link.classList.remove('nav-link-transparent');
      })
    } else {
      nav.classList.add('nav-transparent');
      nav.classList.remove('nav-colored');
      navLinks.forEach( link => {
        link.classList.add('nav-link-transparent');
        link.classList.remove('nav-link-colored');
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.toggleNavTransparency);

    firebaseAuth().onAuthStateChanged( user => {
      if (user) {
        this.setState({
          loggedIn: true
        })
      } else {
        this.setState({
          loggedIn: false
        })
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleNavTransparency);
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <div className="navbar">
      <div className="nav-link-container">
        <h1 className="nav-link brand">
          <Link
            className="nav-link-transparent"
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            Ivana & Kevin
          </Link>
        </h1>
        <div className="nav-items-container">
          <h2 className="nav-link">
            <Link
              className="nav-link-transparent"
              to="/rsvp"
              style={{
                textDecoration: 'none',
              }}
            >
              RSVP
            </Link>
          </h2>
          <h2 className="nav-link">
            <Link
              className="nav-link-transparent"
              to="/venue"
              style={{
                textDecoration: 'none',
              }}
            >
              Venue
            </Link>
          </h2>
          <h2 className="nav-link">
            <Link
              className="nav-link-transparent"
              to="/gallery"
              style={{
                textDecoration: 'none',
              }}
            >
              Photo Gallery
            </Link>
          </h2>
          <h2 className="nav-link">
            <Link
              className="nav-link-transparent"
              to="/about-us"
              style={{
                textDecoration: 'none',
              }}
            >
              About Us
            </Link>
          </h2>
          {
            loggedIn ?
            <h2 className="nav-link">
              <Link
                className="nav-link-transparent"
                to="/logout"
                style={{
                  textDecoration: 'none',
                }}
              >
                Logout
              </Link>
            </h2> :
            null
          }
        </div>
      </div>
    </div>
    )
  }
}

export default Navbar;