import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserLogin extends Component {
  constructor() {
    super()
    this.state = { email: '', password: '' }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    // on success
    this.props.history.push('/welcome')
  }

  render() {
    const { email, password } = this.state
    const { onChange, onSubmit } = this

    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={ onSubmit }>
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' value={ email } onChange={ onChange } />

          <label htmlFor='password'>Password</label>
          <input name='password' type='password' value={ password } onChange={ onChange } />

          <button className='btn'>Login</button>
        </form>

        <h3>Register</h3>

        <div className='btn-group'>
          <button className='btn'>Register</button>
          <button className='btn btn-red'> Login with Google</button>
          <button className='btn btn-blue'>Login with Facebook</button>
        </div>
      </div>
    )
  }
}

const mapDispatch = { }

export default connect()(UserLogin)
