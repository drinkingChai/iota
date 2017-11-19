import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmedSubmitted from './messages/ConfirmedSubmitted'
import Loading from './messages/Loading'
import { updatePassword, updateProfile, signOut } from '../store'
import Textbox from './reusables/Textbox'
import Button from './reusables/Button'
import { Link } from 'react-router-dom'

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

  passwordChange = () => {
    this.setState({ inProgress: true })
    this.props.updatePassword(this.state.password)
      .then(() => {
        this.setState({ confirmDisplayed: true, inProgress: false })
      })
  } 

  profileUpdate = () => {
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

        <div className='form'>
          <Textbox
            label='Change email'
            type='email'
            value={ this.state.email }
            onChange={ this.changeHandler('email') } />

          <Button
            label='Update profile'
            onClick={ this.profileUpdate } />

          <Textbox
            label='Change password'
            type='password'
            value={ this.state.password }
            onChange={ this.changeHandler('password') } />

          <Button
            label='Update password'
            onClick={ this.passwordChange } />

          <Link
            to='/login'
            className='btn btn-red'
            style={{ width: '50%' }}
            onClick={ this.props.signOut }>Sign out</Link>
        </div>
      </div>
    )
  }
}

const mapState = ({ currentUser }) => ({ user: currentUser.user })
const mapDispatch = { updatePassword, updateProfile, signOut }
export default connect(mapState, mapDispatch)(Profile)