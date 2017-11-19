import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
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

            <h3>Login with:</h3>
            <div className='btn-group-horiz'>
              <Button
                label='Google'
                className='btn btn-red' />
              <Button
                label='Facebook'
                className='btn btn-blue' />
            </div>
          </div>
        </div>

        <br/>
        <h3>Register</h3>

        <div className='btn-group'>
          <Link to='/register' className='btn'>Register</Link>
          
        </div>
      </div>
    )
  }
}

const mapDispatch = { signIn }
export default withRouter(connect(null, mapDispatch)(UserLogin))
