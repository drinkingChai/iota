import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDate } from '../helpers'
import { linkThoughts } from '../store'

class ThoughtStream extends Component {
  constructor() {
    super()
    this.state = { selected: [] }
    this.onToggleSelect = this.onToggleSelect.bind(this)
    this.onCluster = this.onCluster.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onToggleSelect(thought) {
    const { selected } = this.state
    this.setState({
      selected: selected.find(t => t.id == thought.id) ?
        selected.filter(t => t.id != thought.id) :
        [ ...selected, thought ]
    })
  }

  onCluster(ev) {
    this.props.linkThoughts(this.state.selected)
      .then(() => this.setState({ selected: [] }))
  }

  render() {
    const { selected } = this.state
    const { onToggleSelect, onCluster } = this

    return (
      <div>
        <h3>Thought stream here!</h3>

        <div>
          <label htmlFor='search'>Search</label>
          <div className='search'>
            <input name='search' />
            <i className="im im-magnifier"></i>
          </div>
        </div>

        <div className='thought-list'>
          { this.props.thoughts.map(thought => (
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
                      { thought.classifications.map(c => c.label).slice(0, 5).map(cat =>
                          <span key={ cat } className='category remove-category'>{ cat }</span> ) }
                    </div>
                  </div>

                  <div className='subheader'>
                    <span className='date'>{ formatDate(thought.updated) }</span>
                    <div className='horiz-buttons'>
                      <Link to={ `/thoughts/${thought.id}` }><i className="im im-pencil"></i></Link>
                    </div>
                  </div>
                </div> )) }

        </div>

        <div className={ `cluster-button-fixed ${selected.length ? 'active' : '' }` }>
          <button
            onClick={ onCluster }
            className='btn'
            disabled={ selected.length <= 1 ? true : false }>Cluster</button>
        </div>
      </div>
    )
  }
}

const mapState = ({ thoughts }) => {
  let inCluster = []
  let _thoughts = thoughts.filter(t => {
    if (t.clusterId && !inCluster.find(c => c == t.clusterId)) {
      inCluster.push(t.clusterId)
      return t
    } else if (!t.clusterId) return t;
  })
  _thoughts.sort((a, b) => (new Date(b.created) - new Date(a.created)))
  
  return {
    thoughts: _thoughts
  }
}

const mapDispatch = { linkThoughts }

export default connect(mapState, mapDispatch)(ThoughtStream)
