import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store'

class Nav extends Component {
  state = { menuActive: false }

  displayMenu = () => {
    this.setState({ menuActive: !this.state.menuActive })
  }

  logOut = () => {
    this.props.signOut()
    this.setState({ menuActive: false })
  }

  render = () => {
    const { menuActive } = this.state
    const { displayMenu, logOut } = this
    const { isAuthenticated } = this.props

    return (
      <div>
        <div className='top-bar'>
          <i className="im im-book"></i> <span>jot</span>
        </div>
        
        <nav className={ menuActive ? 'nav-visible' : 'nav-hidden' }>
          <div className={ menuActive ? 'burger-container-active' : 'burger-container-inactive' }>
            <button onClick={ displayMenu }>
              { menuActive ?
                <i className="im im-x-mark"></i> :
                <i className="im im-menu"></i> }
            </button>
          </div>

          { isAuthenticated ?
            <div className='link-group'>
              <Link to='/jot' onClick={ displayMenu }>Jot</Link>
              <Link to='/thoughts' onClick={ displayMenu }>ThoughtStream</Link>
              <Link to='/stats' onClick={ displayMenu }>Analyze</Link>
              <Link to='/profile' onClick={ displayMenu }>Profile</Link>
              <Link to='/login' onClick={ logOut }>Logout</Link>
            </div> :
            <div className='link-group'>
              <Link to='/login' onClick={ displayMenu }>Login</Link>
              <Link to='/register' onClick={ displayMenu }>Register</Link>
            </div> }

          <div className='nav-footer'>
            <p>Created with much <i className="im im-heart"></i> by</p>
            <p>Wasif Zaman</p>
          </div>
        </nav>
      </div>
    )
  }
}

const mapState = ({ isAuthenticated }) => ({ isAuthenticated })
const mapDispatch = { signOut }
export default withRouter(connect(mapState, mapDispatch)(Nav))
