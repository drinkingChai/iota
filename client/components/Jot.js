import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postThought } from '../store'
import JotSubmit from './messages/JotSubmit'

class Jot extends Component {
  constructor() {
    super()
    this.state = { text: '', submittedDisplayed: false }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange({ target }) {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.setState({ submittedDisplayed: true })
    this.props.postThought(this.state)
      .then(classification => {
        this.setState({ text: '', submittedDisplayed: false })
      })
  }

  render() {
    const { text, submittedDisplayed } = this.state
    const { onChange, onSubmit } = this
    const inputDisabled = text.length < 5 || text.length > 100 ? true : false

    return (
      <form onSubmit={ onSubmit }>
        { submittedDisplayed ? <JotSubmit /> : null }

        <h3>Jot it down</h3>
        <textarea
          autoFocus
          name='text'
          value={ text }
          onChange={ onChange }
          className={ inputDisabled ? 'red' : null }></textarea>
        <button
          className='btn'
          disabled={ inputDisabled }>Submit</button>
      </form>
    )
  }
}

const mapDispatch = { postThought }

export default connect(null, mapDispatch)(Jot)
