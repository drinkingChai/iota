import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store'
import { version } from '../../package.json'


class Nav extends Component {
  state = { menuActive: false }

  displayMenu = () => {
    // this.setState({ menuActive: !this.state.menuActive })
  }

  logOut = () => {
    this.props.signOut()
    this.setState({ menuActive: false })
  }

  render = () => {
    const { menuActive } = this.state
    const { displayMenu, logOut } = this
    const { isAuthenticated } = this.props
    const pathname = '/' + this.props.history.location.pathname.split('/')[1]

    const links = [
      { path: '/jot', label: 'Write', iconClass: 'im im-pencil' },
      { path: '/thoughts', label: 'Feed', iconClass: 'im im-book' },
      { path: '/stats', label: 'Analytics', iconClass: 'im im-bar-chart'  },
      { path: '/profile', label: 'Profile', iconClass: 'im im-user-settings'  }
    ]

    return (
      <div>
        <div className={ `top-bar ${ this.props.location.pathname == '/jot' ? 'jot' : '' }` }>
          {/*<i className="im im-book"></i>
          <span>jot</span>
          <i onClick={ displayMenu } className="im im-menu"></i>*/}
          <span className='top-bar-left'>iota <span className='version'>(v{ version })</span></span>
          <span className='top-bar-mid'>iota <span className='version'>(v{ version })</span></span>
          <span className='top-bar-right'>
          { isAuthenticated && links.map(link =>
            <Link
              key={ link.path }
              to={ link.path }
              className={ link.path == pathname ? 'active' : '' }
              onClick={ displayMenu }>{ link.label }</Link> )}
          </span>
        </div>
        
        <nav className={ menuActive ? 'nav-visible' : 'nav-hidden' }>
          <div className='menu'>
            <div className={ menuActive ? 'burger-container-active' : 'burger-container-inactive' }>
              <button className='x-container' onClick={ displayMenu }>
                <i className="im im-x-mark"></i>
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
          </div>
        </nav>

        { isAuthenticated ?
          <div className={ `bottom-bar ${ this.props.location.pathname == '/jot' ? 'jot' : '' }` }>
          { links.map(link =>
            <Link
              key={ link.path }
              to={ link.path }
              className={ link.path == pathname ? 'active' : '' }
              onClick={ displayMenu }><i className={ link.iconClass }></i></Link> )}
          </div> : null }
      </div>
    )
  }
}

const mapState = ({ currentUser }) => ({ isAuthenticated: currentUser.isAuthenticated })
const mapDispatch = { signOut }
export default withRouter(connect(mapState, mapDispatch)(Nav))
