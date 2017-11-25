import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../helpers'

export default class ThoughtCard extends Component {
  state = { isExpanded: false, isLong: false }

  componentDidMount = () => {
    if (this.props.thought.text.length > 150) this.setState({ isLong: true })
  }

  handleExpand = ev => {
    if (!this.state.isLong) return
    ev.stopPropagation()
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  render = () => {
    const { thought } = this.props
    const { handleExpand } = this
    const { isExpanded, isLong } = this.state

    thought.shortened = isLong && !isExpanded ? `${thought.text.slice(0, 100)}...` : thought.text

    return (
      <div className='thought-card'>
        <div>
          <p>{ thought.shortened || thought.text }</p>
          <div className='categories'>
            { thought.categories.map(c => c.label).slice(0, 5).map(cat =>
                <span key={ cat } className='category remove-category'>{ cat }</span> ) }
          </div>
        </div>

        <div className='subheader'>
          <span className='date'>{ formatDate(thought.updatedAt) }</span>
          <span onClick={ handleExpand }>
          { isLong ?
              isExpanded ?
              <i className='im im-angle-up'></i> :
              <i className='im im-angle-down'></i> : null }
          </span>
          <span>
            <Link to={ `/thoughts/${thought.id}` }><i className="im im-pencil"></i></Link>
          </span>
        </div>
      </div>
    )
  }
}
