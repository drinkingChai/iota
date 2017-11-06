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

  onSubmit = ev => {
    ev.preventDefault()
    this.setState({ submittedDisplayed: true })
    this.props.postThought(this.state)
      .then(classification => {
        this.setState({ text: '', submittedDisplayed: false })
      })
  }

  render = () => {
    const { text, submittedDisplayed } = this.state
    const { onChange, onSubmit } = this
    const inputDisabled = text.length < 5 || text.length > 200 ? true : false

    return (
      <form onSubmit={ onSubmit }>
        { submittedDisplayed ? <Loading message='Your jot has been recorded.' /> : null }

        <h3>Jot it down</h3>
        <Textarea
          autoFocus={ true }
          value={ text }
          onChange={ onChange('text') }
          className={ inputDisabled ? 'red' : null } />
        <Button
          label='Jot it down'
          disabled={ inputDisabled } />
      </form>
    )
  }
}

const mapDispatch = { postThought }

export default connect(null, mapDispatch)(Jot)
