import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../store'
import Textbox from './reusables/Textbox'
import Button from './reusables/Button'
import FullScreenMessage from './messages/FullScreenMessage'

class Register extends Component {
  state = {
    email: '',
    password: '',
    welcomeShown: false
  }

  onChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSubmit = () => {
    this.setState({ welcomeShown: true })
    this.props.register(this.state)
      .then(() => this.props.history.push('/welcome'))
  }

  render = () => {
    const { email, password, welcomeShown } = this.state
    const { onChange, onSubmit } = this

    return (
      <div className='login-container'>
        <div className='login'>
          { welcomeShown ? <FullScreenMessage text='Creating user...' /> : null }

          <h3>Register</h3>
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
                label='Register'
                onClick={ onSubmit } />
            </div>
          </div>

          <br/>
          <div className='btn-group'>
            <h4>Already have an account?</h4>
            <Link to='/login' className='btn'>Login</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = { register }
export default connect(null, mapDispatch)(Register)
