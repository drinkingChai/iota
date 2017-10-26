import React, { Component } from 'react'
import { connect } from 'react-redux'

class Jot extends Component {
  constructor() {
    super()
    this.state = { thought: '' }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange({ target }) {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.setState({ thought: '' })
  }

  render() {
    const { thought } = this.state
    const { onChange, onSubmit } = this

    return (
      <form onSubmit={ onSubmit }>
        <textarea
          autoFocus
          name='thought'
          value={ thought }
          onChange={ onChange }
          style={{ resize: 'none' }}></textarea>
        <button className='btn'>Submit</button>
      </form>
    )
  }
}

export default connect()(Jot)
