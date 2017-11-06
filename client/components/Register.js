import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../store'

class Register extends Component {
  state = {
    email: '',
    password: ''
  }

  onChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSubmit = ev => {
    ev.preventDefault()
    this.props.register(this.state)
      .then(() => this.props.history.push('/welcome'))
  }

  render = () => {
    const { email, password } = this.state
    const { onChange, onSubmit } = this

    return (
      <div className='login'>
        <h3>Register</h3>
        <form onSubmit={ onSubmit }>
          <label htmlFor='email'>Email</label>
          <input type='email' value={ email } onChange={ onChange('email') } />

          <label htmlFor='password'>Password</label>
          <input type='password' value={ password } onChange={ onChange('password') } />

          <button className='btn'>Register</button>
        </form>

        <div className='btn-group'>
          <h4>Already have an account?</h4>
          <Link to='/login' className='btn'>Login</Link>
        </div>
      </div>
    )
  }
}

const mapDispatch = { register }
export default connect(null, mapDispatch)(Register)
