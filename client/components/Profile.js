import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmedSubmitted from './messages/ConfirmedSubmitted'
import Loading from './messages/Loading'
import { updatePassword, updateProfile } from '../store'

class Profile extends Component {
  state = {
    email: '',
    password: '',
    confirmDisplayed: false,
    inProgress: false
  }

  componentDidMount = () => {
    this.setState(this.props.user)
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState(nextProps.user)
  }

  changeHandler = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  passwordChange = ev => {
    ev.preventDefault()
    this.setState({ inProgress: true })
    this.props.updatePassword(this.state.password)
      .then(() => {
        this.setState({ confirmDisplayed: true, inProgress: false })
      })
  } 

  profileUpdate = ev => {
    ev.preventDefault()
    this.setState({ inProgress: true })

    const {
      email
    } = this.state

    this.props.updateProfile({ email })
      .then(() => this.setState({ confirmDisplayed: true, inProgress: false }))
  }

  render = () => {
    return (
      <div>
        <h3>Your profile</h3>

        { this.state.inProgress && !this.state.confirmDisplayed ? 
          <Loading message='saving...' /> : null }

        { this.state.confirmDisplayed ?
          <ConfirmedSubmitted
            message='Your profile has been updated.'
            confirm={ () => { this.setState({ confirmDisplayed: false }) } } /> : null }

        <form onSubmit={ this.profileUpdate }>
          <label htmlFor='email'>Change email</label>
          <input type='email' value={ this.state.email } onChange={ this.changeHandler('email') } />

          <button className='btn'>Update profile</button>
        </form>

        <form onSubmit={ this.passwordChange }>
          <label htmlFor='password'>Change password</label>
          <input type='password' value={ this.state.password } onChange={ this.changeHandler('password') } />

          <button className='btn'>Update password</button>
        </form>

      </div>
    )
  }
}

const mapState = ({ user }) => ({ user })
const mapDispatch = { updatePassword, updateProfile }
export default connect(mapState, mapDispatch)(Profile)