import React, {Component} from 'react'
import Link from 'gatsby-link'

class Navbar extends Component {

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
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleNavTransparency);
  }

  render() {
    return (
      <div className="navbar">
      <div className="nav-link-container">
        <h1 className="nav-link brand">
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            Kevin & Ivana
          </Link>
        </h1>
        <div className="nav-items-container">
          <h2 className="nav-link">
            <Link
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
              to="/about-us"
              style={{
                textDecoration: 'none',
              }}
            >
              About Us
            </Link>
          </h2>
        </div>
      </div>
    </div>
    )
  }
}

export default Navbar;