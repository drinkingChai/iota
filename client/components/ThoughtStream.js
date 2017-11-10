import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDate } from '../helpers'
import { linkThoughts } from '../store'
import Button from './reusables/Button'

const ClusterCard = ({ cluster }) => {
  if (!cluster) return <div></div>
  
  return (
    <div
      className='thought thought-cluster' >
      {/* className={ `thought thought-cluster ${selected.find(t=> t.id == thought.id) ? 'selected' : ''}` }>
      onClick={ () => onToggleSelect(thought) } */}

      <Link
        to={ `/clusters/${cluster.cluster.id}` }
        className='cluster-link'>cluster</Link>

      <div>
        <p>{ cluster.cluster.name || cluster.nodes[0].text }</p>
        <p>{ cluster.cluster.description }</p>
      </div>

      <div className='subheader'>
        <span className='date'>{ formatDate(cluster.cluster.createdAt) }</span>
        <div className='horiz-buttons'>
        </div>
      </div>
    </div>
  )
}

const ThoughtCard = ({ thought, clickHandler, selectedPool }) => {
  // make this better by having it take a class instead of selectedPool
  // const ThoughtCard = ({ thought, className, clickHandler })
  // apply className from parent based on selected
  if (!thought) return <div></div>

  return (
    <div
      key={ thought.id } 
      onClick={ () => clickHandler(thought) }
      className={
        `${thought.clusterId ? 'thought thought-cluster' : 'thought'}
        ${selectedPool.find(t=> t.id == thought.id) ? 'selected' : ''}`
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
    </div>
  )
}


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
    // link in order of selected
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
    let { thoughts, clusters } = this.props

    if (search.length) {
      thoughts = thoughts.filter(thought => {
        // flatten
        const flatten = `${thought.text} ${thought.categories.reduce((s, c) => (`${s} ${c.label}`), '')}`
        const regex = new RegExp(search.split(' ').join('|'), 'gi')
        if (regex.exec(flatten)) return thought
      })
    }

    let clusterRendered = []

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
        {
          thoughts.reduce((cards, thought) => {
            if (thought.clusterId) {
              if (clusterRendered.indexOf(thought.clusterId) == -1) {
                clusterRendered.push(thought.clusterId)
              } else {
                return cards
              }
            }

            return thought.clusterId ?
            [ ...cards, <ClusterCard
              key={ thought.id }
              cluster={ clusters.find(c => c.cluster.id == thought.clusterId) }/> ] :
            [ ...cards, <ThoughtCard
              key={ thought.id }
              thought={ thought }
              clickHandler={ onToggleSelect }
              selectedPool={ selected } /> ]
          }, [])
        }
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
