import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../helpers'
import { unlinkThought } from '../store'

function ClusterThoughts ({ thoughts, unlinkThought }) {
  return (
    <div>
      <h3>A cluster of thoughts</h3>
      
      <div className='thought-list linked'>
        { thoughts.map(thought => (
          <div key={ thought.id } className='thought thought-linked'>
            <button className='cluster-link unlink' onClick={ () => unlinkThought(thought) }><i className='im im-unlink'></i></button>
            <div>
              <p>{ thought.text }</p>
            </div>

            <div className='subheader'>
              <span className='date'>{ formatDate(thought.updated) }</span>
              <div className='horiz-buttons'>
                <Link to={ `/thoughts/${thought.id}` }><i className="im im-pencil"></i></Link>
                {/*<button><i className='im im-unlink'></i></button>*/}
                {/*<Link to='/'><i className="im im-share"></i></Link>*/}
                {/* <button><i className="im im-network"></i></button> */}
              </div>
            </div>
          </div>))
        }
      </div>
    </div>
  )
}

//<div className='categories'>
              //{
                //thought.classifications.map(c => c.label).slice(0, 5).map(cat =>
                  //<span key={ cat } className='category'>{ cat }</span> )
              //}
            //</div>

const mapState = ({ thoughts }, ownProps) => ({
  thoughts: thoughts.filter(t => t.clusterId == ownProps.match.params.id)
})

const mapDispatch = { unlinkThought }

export default connect(mapState, mapDispatch)(ClusterThoughts)
