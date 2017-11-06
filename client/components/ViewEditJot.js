import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateThought, removeCategory,
  addCategory, deleteThought, fetchThoughts } from '../store'
import Loading from './messages/Loading'
import Confirm from './messages/Confirm'
import Textbox from './reusables/Textbox'
import Textarea from './reusables/Textarea'
import Button from './reusables/Button'

class ViewEditJot extends Component {
  state = {
    text: '', newcategory: '', categories: '',
    updatedDisplayed: false, waitDisplayed: false, delConfDisplayed: false
  }

  componentDidMount = () => {
    if (!this.props.thought) return
    const { text, classifications } = this.props.thought
    this.setState({ text, classifications })
  }

  componentWillReceiveProps = (nextProps) => {
    const { text, classifications } = nextProps.thought
    this.setState({ text, classifications })
  }

  onChange = name => ev =>
    this.setState({ [name]: ev.target.value })

  onSubmit = () => {
    this.setState({ updatedDisplayed: true })
    this.props.updateThought(this.props.match.params.id, this.state)
      .then(classification => {
        this.setState({ updatedDisplayed: false })
      })
  }

  onRemoveCategory = category => ev => {
    this.props.removeCategory(this.props.thought, category)
  }

  onAddCategory = () => {
    const newCategories = this.state.newcategory.split(',').filter(c => c.length)

    this.setState({ waitDisplayed: true })
    setTimeout(() => {
      Promise.all(newCategories.map(label =>
        this.props.addCategory(this.props.thought, { label: label.trim() })
      ))
      .then(() => this.setState({ newcategory: '', waitDisplayed: false }))
    }, 1000)
    
  }

  onDelete = () => {
    this.setState({ delConfDisplayed: true })
  }

  onCancelDelete = ev => {
    ev.preventDefault()
    this.setState({ delConfDisplayed: false })
  }

  onConfirmDelete = ev => {
    ev.preventDefault()
    const { deleteThought, thought, history, fetchThoughts } = this.props

    deleteThought(thought.id)
      .then(() => history.push('/thoughts'))
      .then(() => fetchThoughts())
  }

  render = () => {
    const { text, newcategory, classifications, updatedDisplayed, waitDisplayed, delConfDisplayed } = this.state
    const { onChange, onSubmit, onDelete, onRemoveCategory, onAddCategory, onCancelDelete, onConfirmDelete } = this
    const inputDisabled = text.length < 5 || text.length > 100 ? true : false

    return (
      <div className='form'>
        { updatedDisplayed ? <Loading message='Your jot has been updated.' /> : null }
        { waitDisplayed ? <Loading message='Loading...' /> : null }
        { delConfDisplayed ?
          <Confirm
            content='Confirm delete?'
            cancel={ onCancelDelete }
            confirm={ onConfirmDelete } /> :
            null }

        <h3>Edit a thought</h3>
        <Textarea
          label='Thought'
          value={ text }
          onChange={ onChange('text') }
          className={ inputDisabled ? 'red' : null } />

        <label htmlFor='categories'>Categories</label>
        <div className='categories'>
          { classifications && classifications.map(cat => (
              <Button
                key={ cat.id }
                label={ <span>{ cat.label } <i className='im im-x-mark'></i></span> }
                onClick={ onRemoveCategory(cat) }
                className='category remove-category' /> )) }
        </div>

        <label htmlFor='newcategory'>Add categories</label>
        {/* have this autocomplete to existing cats */}
        <input
          value={ newcategory }
          onChange={ onChange('newcategory') } />
        <Button
          label='Add category'
          className='btn btn-blue'
          onClick={ onAddCategory } />

        <Button
          label='Update'
          disabled={ inputDisabled }
          onClick={ onSubmit } />
        <Button
          label='Delete'
          className='btn btn-red'
          onClick={ onDelete } /> 
      </div>
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
