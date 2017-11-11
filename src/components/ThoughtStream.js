import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDate } from '../helpers'
import { linkThoughts } from '../store'
import Button from './reusables/Button'
import ThoughtCard from './cards/ThoughtCard'
import ClusterCard from './cards/ClusterCard'


class ThoughtStream extends Component {
  state = { selected: [], search: '' }

  componentDidMount = () => {
    window.scrollTo(0, 0)
  }

  onToggleSelect = (type, id) => {
    const { selected } = this.state
    const item = { type, id }
    this.setState({
      selected:
        selected.find(i => i.type == item.type && i.id == item.id) ?
          selected.filter(i => i.type != item.type && i.id != item.id) :
          [ ...selected, item ]
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

    console.log(this.state);

    return (
      <div className='thought-stream'>
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
            let clusterId
            if (thought.clusterId) {
              clusterId = thought.clusterId
              if (clusterRendered.indexOf(clusterId) == -1) {
                clusterRendered.push(clusterId)
              } else {
                return cards
              }
            }

            return thought.clusterId ?
            [ ...cards, <ClusterCard
              key={ thought.id }
              cluster={ clusters.find(c => c.cluster.id == clusterId) }
              clickHandler={ () => onToggleSelect('cluster', clusterId) }
              selectedPool={ selected } /> ] :
            [ ...cards, <ThoughtCard
              key={ thought.id }
              thought={ thought }
              clickHandler={ () => onToggleSelect('thought', thought.id) }
              selectedPool={ selected } /> ]
          }, [])
        }
        </div>

        <div className={ `cluster-button-fixed ${selected.length ? 'active' : '' }` }>
          <div className='btn-group'>
            <Button
              label='Cluster'
              onClick={ onCluster }
              disabled={ selected.length <= 1 ? true : false } />
          </div>
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
