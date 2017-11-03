import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateThought, removeCategory,
  addCategory, deleteThought, fetchThoughts } from '../store'
import JotSubmit from './messages/JotSubmit'
import PleaseWait from './messages/PleaseWait'
import DelConfirm from './messages/DelConfirm'

class ViewEditJot extends Component {
  constructor() {
    super()
    this.state = {
      text: '', newcategory: '', categories: '',
      updatedDisplayed: false, waitDisplayed: false, delConfDisplayed: false }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onRemoveCategory = this.onRemoveCategory.bind(this)
    this.onAddCategory = this.onAddCategory.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onCancelDelete = this.onCancelDelete.bind(this)
    this.onConfirmDelete = this.onConfirmDelete.bind(this)
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

  onAddCategory(ev) {
    ev.preventDefault()
    const newCategories = this.state.newcategory.split(',').filter(c => c.length)

    this.setState({ waitDisplayed: true })
    setTimeout(() => {
      Promise.all(newCategories.map(label =>
        this.props.addCategory(this.props.thought, { label: label.trim() })
      ))
      .then(() => this.setState({ newcategory: '', waitDisplayed: false }))
    }, 1000)
    
  }

  onDelete(ev) {
    ev.preventDefault()
    this.setState({ delConfDisplayed: true })
  }

  onCancelDelete(ev) {
    ev.preventDefault()
    this.setState({ delConfDisplayed: false })
  }

  onConfirmDelete(ev) {
    ev.preventDefault()
    const { deleteThought, thought, history, fetchThoughts } = this.props

    deleteThought(thought.id)
      .then(() => history.push('/thoughts'))
      .then(() => fetchThoughts())
  }

  render() {
    const { text, newcategory, classifications, updatedDisplayed, waitDisplayed, delConfDisplayed } = this.state
    const { onChange, onSubmit, onDelete, onRemoveCategory, onAddCategory, onCancelDelete, onConfirmDelete } = this
    const inputDisabled = text.length < 5 || text.length > 100 ? true : false

    return (
      <form onSubmit={ onSubmit }>
        { updatedDisplayed ? <JotSubmit /> : null }
        { waitDisplayed ? <PleaseWait /> : null }
        { delConfDisplayed ?
          <DelConfirm
            content={ this.props.thought }
            cancel={ onCancelDelete }
            confirm={ onConfirmDelete } /> :
            null }

        <h3>Edit a thought</h3>
        <label htmlFor='text'>Thought</label>
        <textarea
          name='text'
          value={ text }
          onChange={ onChange }
          className={ inputDisabled ? 'red' : null }></textarea>

        <label htmlFor='categories'>Categories</label>
        <div className='categories'>
          { classifications && classifications.map(cat => (
              <button
                key={ cat.id }
                onClick={ (ev) => onRemoveCategory(ev, cat) }
                className='category remove-category'>
                <span>{ cat.label } <i className='im im-x-mark'></i></span>
              </button>)) }
        </div>

        <label htmlFor='newcategory'>Add categories</label>
        {/* have this autocomplete to existing cats */}
        <input
          name='newcategory'
          value={ newcategory }
          onChange={ onChange } />
        <button
          className='btn btn-blue'
          onClick={ onAddCategory }>Add category</button>

        <button
          className='btn'
          disabled={ inputDisabled }>Update</button>
        <button
          className='btn btn-red'
          onClick={ onDelete }>Delete</button>
      </form>
    )
  }
}

const mapState = ({ thoughts }, ownProps) => ({
  thought: thoughts.find(t => t.id == ownProps.match.params.id)
})
const mapDispatch = {
  updateThought,
  removeCategory,
  addCategory,
  deleteThought,
  fetchThoughts
}

export default connect(mapState, mapDispatch)(ViewEditJot)
