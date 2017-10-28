import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDate } from '../helpers'

class ThoughtStream extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
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
          { 
            this.props.thoughts.map(thought => (
              <div key={ thought.id } className={ thought.clusterId ? 'thought thought-cluster' : 'thought' }>
                { thought.clusterId ?
                    <Link
                      to={ `/clusters/${thought.clusterId}` }
                      className='cluster-link'>cluster</Link> : null }
                <div>
                  <p>{ thought.text }</p>
                  {/*<div className='categories'>
                    {
                      thought.classifications.map(c => c.label).slice(0, 5).map(cat =>
                        <span key={ cat } className='category'>{ cat }</span> )
                    }
                  </div>*/}
                </div>

                <div className='subheader'>
                  <span className='date'>{ formatDate(thought.updated) }</span>
                  <div className='horiz-buttons'>
                    <Link to={ `/thoughts/${thought.id}` }><i className="im im-pencil"></i></Link>
                  </div>
                </div>
              </div>
            ))
          }
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
  _thoughts.sort((a, b) => (new Date(b.updated) - new Date(a.updated)))
  
  return {
    thoughts: _thoughts
  }
}

export default connect(mapState)(ThoughtStream)
