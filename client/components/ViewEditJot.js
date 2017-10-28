import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateThought, removeCategory } from '../store'
import JotSubmit from './messages/JotSubmit'

class ViewEditJot extends Component {
  constructor() {
    super()
    this.state = { text: '', categories: '', updatedDisplayed: false }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onRemoveCategory = this.onRemoveCategory.bind(this)
  }

  componentDidMount() {
    if (!this.props.thought) return
    const { text, classifications } = this.props.thought
    this.setState({ text, classifications })
  }

  componentWillReceiveProps(nextProps) {
    const { text, classifications } = nextProps.thought
    this.setState({ text, classifications })
  }

  onChange({ target }) {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.setState({ updatedDisplayed: true })
    this.props.updateThought(this.props.match.params.id, this.state)
      .then(classification => {
        this.setState({ updatedDisplayed: false })
      })
  }

  onRemoveCategory(ev, category) {
    ev.preventDefault()
    this.props.removeCategory(this.props.thought, category)
  }

  render() {
    const { text, classifications, updatedDisplayed } = this.state
    const { onChange, onSubmit, onRemoveCategory } = this
    const inputDisabled = text.length < 5 || text.length > 100 ? true : false

    return (
      <form onSubmit={ onSubmit }>
        { updatedDisplayed ? <JotSubmit /> : null }

        <h3>Edit a thought</h3>
        <label htmlFor='text'>Thought</label>
        <textarea
          name='text'
          value={ text }
          onChange={ onChange }
          className={ inputDisabled ? 'red' : null }></textarea>
        <label htmlFor='categories'>Categories</label>
        <div className='remove-categories-container'>
          { 
            classifications && classifications.map(cat => (
              <button
                key={ cat.id }
                onClick={ (ev) => onRemoveCategory(ev, cat) }
                className='category remove-category'>
                <div>
                  <span>{ cat.label }</span>
                  <i className='im im-x-mark'></i>
                </div>
              </button>))
          }
        </div>
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
const mapDispatch = {
  updateThought,
  removeCategory
}

export default connect(mapState, mapDispatch)(ViewEditJot)
