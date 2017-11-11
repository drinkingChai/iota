import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../store'
import Textbox from './reusables/Textbox'
import Button from './reusables/Button'
import Welcome from './messages/Welcome'

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

  render = () => {
    const { email, password, welcomeShown } = this.state
    const { onChange, onSubmit } = this


    return (
      <div className='login'>
        { welcomeShown ? <Welcome /> : null }

        <h3>Login</h3>
        <div className='form'>
          <Textbox
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
          </div>
        </div>

        <h3>Register</h3>

        <div className='btn-group'>
          <Link to='/register' className='btn'>Register</Link>
          <button className='btn btn-red'> Login with Google</button>
          <button className='btn btn-blue'>Login with Facebook</button>
        </div>
      </div>
    )
  }
}

const mapDispatch = { signIn }

export default connect(null, mapDispatch)(UserLogin)
