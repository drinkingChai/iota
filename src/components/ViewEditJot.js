import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateThought, removeCategory,
  addCategory, deleteThought, fetchThoughts } from '../store'
import Loading from './messages/Loading'
import Confirm from './messages/Confirm'
import Textbox from './reusables/Textbox'
import Textarea from './reusables/Textarea'
import Button from './reusables/Button'
import TypeAhead from './cards/TypeAhead'

class ViewEditJot extends Component {
  state = {
    text: '', newcategories: [], categories: '',
    updatedDisplayed: false, waitDisplayed: false, delConfDisplayed: false
  }

  componentDidMount = () => {
    if (!this.props.thought) return
    const { text } = this.props.thought
    this.setState({ text })
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.thought) return
    const { text } = nextProps.thought
    this.setState({ text })
  }

  onChange = name => ev =>
    this.setState({ [name]: ev.target.value })

  onSubmit = () => {
    this.setState({ updatedDisplayed: true })
    this.props.updateThought(this.props.match.params.id, this.state)
      .then(() => {
        this.setState({ updatedDisplayed: false })
      })
  }

  onRemoveCategory = category => ev => {
    this.props.removeCategory(this.props.thought, category)
  }

  onAddCategory = () => {
    this.setState({ waitDisplayed: true })
    setTimeout(() => {
      Promise.all(this.state.newcategories.map(label =>
        this.props.addCategory(this.props.thought, { label: label.trim() })
      ))
      .then(() => this.setState({ newcategories: [], waitDisplayed: false }))
    }, 500)
    
  }

  setCollection = (collection) => {
    this.setState({ newcategories: collection })
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
    const { text, newcategories, updatedDisplayed, waitDisplayed, delConfDisplayed } = this.state
    const { onChange, onSubmit, onDelete, onRemoveCategory, onAddCategory, onCancelDelete, onConfirmDelete, setCollection } = this
    const { thought, categories } = this.props
    const inputDisabled = text.length < 5 ? true : false

    // console.log(categories)

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
          { thought && thought.categories && thought.categories.map(cat => (
              <Button
                key={ cat.id }
                label={ <span>{ cat.label } <i className='im im-x-mark'></i></span> }
                onClick={ onRemoveCategory(cat) }
                className='category remove-category' /> )) }
        </div>

        <label htmlFor='newcategory'>Add categories</label>
        <TypeAhead
          selections={ categories }
          check={ newcategories }
          onUpdate={ setCollection } />
        <div className='btn-group'>
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
      </div>
    )
  }
}

const mapState = ({ thoughts, categories }, ownProps) => {
  let _categories = categories.map(category => category.label)
  _categories.sort()
  
  return {
    thought: thoughts.find(t => t.id == ownProps.match.params.id),
    categories: _categories
  }
}
const mapDispatch = {
  updateThought,
  removeCategory,
  addCategory,
  deleteThought,
  fetchThoughts
}

export default connect(mapState, mapDispatch)(ViewEditJot)
