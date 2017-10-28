import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateThought } from '../store'
import JotSubmit from './messages/JotSubmit'

class ViewEditJot extends Component {
  constructor() {
    super()
    this.state = { text: '', categories: '', updatedDisplayed: false }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.props.thought) return
    const { text, classifications } = this.props.thought
    this.setState({ text, categories: classifications.reduce((str, c) => (str += `${c.label}, `), '') })
  }

  componentWillReceiveProps(nextProps) {
    const { text, classifications } = nextProps.thought
    this.setState({ text, categories: classifications.reduce((str, c) => (str += `${c.label}, `), '') })
  }

  onChange({ target }) {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.props.updateThought(this.state)
      .then(classification => {
        this.setState({ updatedDisplayed: true })
        setTimeout(() => {
          this.setState({ text: '', updatedDisplayed: false })
        }, 2000)
        //console.log(classification)
        //this.setState({ text: '' })
      })
  }

  render() {
    const { text, categories, updatedDisplayed } = this.state
    const { onChange, onSubmit } = this
    const inputDisabled = text.length < 5 || text.length > 100 ? true : false

    //if (!this.props.thought) return <div></div>

    return (
      <form onSubmit={ onSubmit }>
        { updatedDisplayed ? <JotSubmit /> : null }

        <h3>Edit a thought</h3>
        <textarea
          name='text'
          value={ text }
          onChange={ onChange }
          className={ inputDisabled ? 'red' : null }></textarea>
        <input
          name='categories'
          value={ categories }
          onChange={ onChange } />
        <button
          className='btn'
          disabled={ inputDisabled }>Update</button>
      </form>
    )
  }
}

const mapState = ({ thoughts }, ownProps) => ({
  thought: thoughts.find(t => t.id == ownProps.match.params.id)
})
const mapDispatch = { updateThought }

export default connect(mapState, mapDispatch)(ViewEditJot)
