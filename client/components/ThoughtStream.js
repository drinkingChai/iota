import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDate } from '../helpers'
import { linkThoughts } from '../store'
import Button from './reusables/Button'

class ThoughtStream extends Component {
  state = {
    selected: [],
    search: ''
  }

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
  let inCluster = []
  let _thoughts = thoughts.filter(t => {
    if (t.clusterId && !inCluster.find(c => c == t.clusterId)) {
      inCluster.push(t.clusterId)
      return t
    } else if (!t.clusterId) return t;
  })
  _thoughts.sort((a, b) => (new Date(b.created) - new Date(a.created)))

  // let _clusters = clusters.reduce((thoughts, cluster) => {
  //   // if cluster has a title, use title
  //   // else show the top entry
  //   if (cluster.length === 1) {
  //     cluster[0].clusterId = cluster.id
  //     return [ ...thoughts, cluster[0] ]
  //   } else {
  //     let cThoughts = cluster.map((thought, i) => {
  //       thought.clusterId = cluster.id
  //       if (i !== 0) thought.hidden = true
  //       return thought
  //     })
  //     return [ ...thoughts, ...cThoughts ]
  //   }
  // }, [])
  
  return {
    thoughts: _thoughts
  }
}

const mapDispatch = { linkThoughts }

export default connect(mapState, mapDispatch)(ThoughtStream)
