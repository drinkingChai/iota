import React, { Component } from 'react'
import { connect } from 'react-redux'
import { trainMachine } from '../store'
import Loading from './messages/Loading'

class Train extends Component {
  state = { phrase: '', category: '', thankYouDisplayed: false }

  onChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSubmit = ev => {
    ev.preventDefault()
    this.props.trainMachine(this.state)
      .then(() => {
        this.setState({ thankYouDisplayed: true })
        setTimeout(() => {
          this.setState({ phrase: '', category: '', thankYouDisplayed: false })
        }, 2000)
      })
  }

  render = () => {
    const { phrase, category,
            thankYouDisplayed } = this.state
    const { onChange, onSubmit } = this

    return (
      <form onSubmit={ onSubmit }>
        { thankYouDisplayed ? <Loading message='Thank you for helping the bot learn!' /> : null }

        <h3>Train</h3>
        <label htmlFor='phrase'>Phrase</label>
        <input value={ phrase } onChange={ onChange('phrase') }/>
        <label htmlFor='category'>Categories</label>
        <input value={ category } onChange={ onChange('category') }/>
        <button className='btn'>Train</button>
      </form>
    )
  }
}

const mapDispatch = { trainMachine }
export default connect(null, mapDispatch)(Train)
