import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn, googleSignIn, facebookSignIn } from '../store'
import Textbox from './reusables/Textbox'
import Button from './reusables/Button'
import FullScreenMessage from './messages/FullScreenMessage'

class UserLogin extends Component {
  state = { email: '', password: '', welcomeShown: false }

  onChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSubmit = () => {
    this.setState({ welcomeShown: true })
    this.props.signIn(this.state)
      .then(() => this.props.history.push('/jot'))
  }

  handleGoogleLogin = () => {
    this.props.googleSignIn()
  }

  handleFacebookLogin = () => {
    this.props.facebookSignIn()
  }

  render = () => {
    const { email, password, welcomeShown } = this.state
    const { onChange, onSubmit, handleGoogleLogin, handleFacebookLogin } = this

    return (
      <div className='login-container'>
        <div className='login'>
          { welcomeShown ? <FullScreenMessage text='Logging in...' /> : null }

          <h3>Login</h3>
          <div className='form'>
            <Textbox
              type='email'
              label='E-mail'
              value={ email }
              onChange={ onChange('email') } />
            <Textbox
              type='password'
              label='Password'
              value={ password }
              onChange={ onChange('password') } />  
            <div className='btn-group'>
              <Button
                label='Login'
                onClick={ onSubmit } />
              <Link to='/register' className='btn'>Register</Link>

              <h3>Login with:</h3>
              <div className='btn-group-horiz'>
                <a
                  href='/api/auth/google'
                  className='btn google'>Google</a>
                <a
                  href='/api/auth/facebook'
                  className='btn facebook'>Facebook</a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = { signIn, googleSignIn, facebookSignIn }
export default withRouter(connect(null, mapDispatch)(UserLogin))
