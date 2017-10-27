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

    return (
      <form onSubmit={ onSubmit }>
        <textarea
          autoFocus
          name='text'
          value={ text }
          onChange={ onChange }
          style={{ resize: 'none' }}></textarea>
        <button className='btn'>Submit</button>
      </form>
    )
  }
}

const mapDispatch = { postThought }

export default connect(null, mapDispatch)(Jot)
