import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postThought } from '../store'
import Loading from './messages/Loading'
import Textarea from './reusables/Textarea'
import Button from './reusables/Button'

class Jot extends Component {
  state = { text: '', submittedDisplayed: false }

  onChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSubmit = () => {
    this.setState({ submittedDisplayed: true })
    this.props.postThought(this.state)
      .then(() => {
        this.setState({ text: '', submittedDisplayed: false })
      })
  }

  render = () => {
    const { text, submittedDisplayed } = this.state
    const { onChange, onSubmit } = this
    const inputDisabled = text.length < 5 ? true : false

    return (
      <div className='jot-container'>
        <div className='form jot-form'>
          { submittedDisplayed ? <Loading message='Your jot has been recorded.' /> : null }

          <h3>Write</h3>
          <Textarea
            value={ text }
            onChange={ onChange('text') }
            placeHolder='Tap or click to get started...' />
          <div className='btn-group'>
            <Button
              label='Jot it down'
              onClick={ onSubmit }
              disabled={ inputDisabled } />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = { postThought }

export default connect(null, mapDispatch)(Jot)
