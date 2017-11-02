import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { displayMenu } from '../store'

class Nav extends Component {
  constructor() {
    super()
    this.state = { menuActive: false }
    this.displayMenu = this.displayMenu.bind(this)
  }

  displayMenu() {
    this.setState({ menuActive: !this.state.menuActive })
  }

  render() {
    const { menuActive } = this.state
    const { displayMenu } = this

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

          <div className='link-group'>
            <Link to='/jot' onClick={ displayMenu }>Jot</Link>
            <Link to='/thoughts' onClick={ displayMenu }>ThoughtStream</Link>
            <Link to='/stats' onClick={ displayMenu }>Analyze</Link>
            <Link to='/login' onClick={ displayMenu }>Login</Link>
          </div>

          <div className='nav-footer'>
            <p>Created with much <i className="im im-heart"></i> by</p>
            <p>Wasif Zaman</p>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(connect()(Nav))
