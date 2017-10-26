import React, { Component } from 'react'
import { connect } from 'react-redux'

class Train extends Component {
  constructor() {
    super()
    this.state = { thought: '', cats: '' }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange({ target }) {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.setState({ thought: '', cats: '' })
  }

  render() {
    const { thought, cats } = this.state
    const { onChange, onSubmit } = this

    return (
      <form onSubmit={ onSubmit }>
        <textarea name='thought' value={ thought } onChange={ onChange }></textarea>
        <input name='cats' value={ cats } onChange={ onChange }/>
        <button>Submit</button>
      </form>
    )
  }
}

export default connect()(Train)
