import React, { Component } from 'react'
import { connect } from 'react-redux'
import { trainMachine } from '../store'

class Train extends Component {
  constructor() {
    super()
    this.state = { phrase: '', category: '' }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange({ target }) {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.props.trainMachine(this.state)
      .then(() => this.setState({ phrase: '', category: '' }))
  }

  render() {
    const { phrase, category } = this.state
    const { onChange, onSubmit } = this

    return (
      <form onSubmit={ onSubmit }>
        <label htmlFor='phrase'>Phrase</label>
        <input name='phrase' value={ phrase } onChange={ onChange }/>
        <label htmlFor='category'>Categories</label>
        <input name='category' value={ category } onChange={ onChange }/>
        <button className='btn'>Train</button>
      </form>
    )
  }
}

const mapDispatch = { trainMachine }

export default connect(null, mapDispatch)(Train)
