import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDate } from '../helpers'
import { linkThoughts } from '../store'
import Button from './reusables/Button'

const ClusterCard = ({ thought }) => (
  <div>
    Stuff
  </div>
)


class ThoughtStream extends Component {
  state = { selected: [], search: '' }

  componentDidMount = () => {
    window.scrollTo(0, 0)
  }

  onToggleSelect = thought => {
    const { selected } = this.state
    this.setState({
      selected: selected.find(t => t.id == thought.id) ?
        selected.filter(t => t.id != thought.id) :
        [ ...selected, thought ]
    })
  }

  onCluster = ev => {
    this.props.linkThoughts(this.state.selected)
      .then(() => this.setState({ selected: [] }))
  }

  onSearch = ev => {
    const { value } = ev.target
    this.setState({ search: value })
  }

  render = () => {
    const { selected, search } = this.state
    const { onToggleSelect, onCluster, onSearch } = this
    let { thoughts } = this.props

    if (search.length) {
      thoughts = thoughts.filter(thought => {
        // flatten
        const flatten = `${thought.text} ${thought.categories.reduce((s, c) => (`${s} ${c.label}`), '')}`
        const regex = new RegExp(search.split(' ').join('|'), 'gi')
        if (regex.exec(flatten)) return thought
      })
    }

    return (
      <div>
        <h3>Thought stream</h3>

        <div>
          <label htmlFor='search'>Search</label>
          <div className='search'>
            <input name='search' value={ search } onChange={ onSearch }/>
            <i className="im im-magnifier"></i>
          </div>
        </div>

        <div className='thought-list'>
          { thoughts.map(thought => (
              <div
                key={ thought.id } 
                onClick={ () => onToggleSelect(thought) }
                className={
                  `${thought.clusterId ? 'thought thought-cluster' : 'thought'}
                  ${selected.find(t=> t.id == thought.id) ? 'selected' : ''}`
                }>
                  { thought.clusterId ?
                    <Link
                      to={ `/clusters/${thought.clusterId}` }
                      className='cluster-link'>cluster</Link> : null }

                  <div>
                    <p>{ thought.text }</p>
                    <div className='categories'>
                      { thought.categories.map(c => c.label).slice(0, 5).map(cat =>
                          <span key={ cat } className='category remove-category'>{ cat }</span> ) }
                    </div>
                  </div>

                  <div className='subheader'>
                    <span className='date'>{ formatDate(thought.updatedAt) }</span>
                    <div className='horiz-buttons'>
                      <Link to={ `/thoughts/${thought.id}` }><i className="im im-pencil"></i></Link>
                    </div>
                  </div>
                </div> )) }

        </div>

        <div className={ `cluster-button-fixed ${selected.length ? 'active' : '' }` }>
          <Button
            label='Cluster'
            onClick={ onCluster }
            disabled={ selected.length <= 1 ? true : false } />
        </div>
      </div>
    )
  }
}

const mapState = ({ thoughts, clusters }) => {
  return {
    thoughts,
    clusters
  }
}

const mapDispatch = { linkThoughts }

export default connect(mapState, mapDispatch)(ThoughtStream)
