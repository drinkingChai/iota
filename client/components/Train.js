import React, { Component } from 'react'
import { connect } from 'react-redux'
import { trainMachine } from '../store'
import TrainSubmit from './messages/TrainSubmit'

class Train extends Component {
  constructor() {
    super()
    this.state = { phrase: '', category: '', thankYouDisplayed: false }
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
      .then(() => {
        this.setState({ thankYouDisplayed: true })
        setTimeout(() => {
          this.setState({ phrase: '', category: '', thankYouDisplayed: false })
        }, 2000)
      })
  }

  render() {
    const { phrase, category,
            thankYouDisplayed } = this.state
    const { onChange, onSubmit } = this

    return (
      <form onSubmit={ onSubmit }>
        { thankYouDisplayed ? <TrainSubmit /> : null }

        <h3>Train</h3>
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
