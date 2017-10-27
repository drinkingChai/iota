import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postThought } from '../store'

class Jot extends Component {
  constructor() {
    super()
    this.state = { text: '' }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange({ target }) {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.props.postThought(this.state)
      .then(classification => {
        console.log(classification)
        this.setState({ text: '' })
      })
  }

  render() {
    const { text } = this.state
    const { onChange, onSubmit } = this
    const inputDisabled = text.length < 5 || text.length > 100 ? true : false

    return (
      <form onSubmit={ onSubmit }>
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
