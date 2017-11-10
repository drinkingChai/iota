import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../helpers'
import { unlinkThought } from '../store'
import Button from './reusables/Button'

function ClusterThoughts ({ thoughts, categories, unlink }) {
  return (
    <div>
      <h3>A cluster of thoughts</h3>
      {/* name your cluster here */}
      
      <div className='thought-list linked'>
        { thoughts.map(thought => (
          <div key={ thought.id } className='thought thought-linked'>
            <button className='cluster-link unlink' onClick={ () => unlink(thought, thoughts) }><i className='im im-unlink'></i></button>
            <div>
              <p>{ thought.text }</p>
            </div>

            <div className='subheader'>
              <span className='date'>{ formatDate(thought.createdAt) }</span>
              <div className='horiz-buttons'>
                <Button
                  label={ <i className="im im-angle-up"></i> }
                  className='btn btn-clear'
                  onClick={ () => console.log('going up') } />
                <Button
                  label={ <i className="im im-angle-down"></i> }
                  className='btn btn-clear'
                  onClick={ () => console.log('going down') } />
                <Link to={ `/thoughts/${thought.id}` }><i className="im im-pencil"></i></Link>
              </div>
            </div>
          </div>)) }
      </div>
      <div className='cluster-categories'>
        <h3>Categories in this cluster</h3>
        <br/>
        <div className='categories'>
          { categories.map(cat =>
              <span key={ cat } className='category'>{ cat }</span> ) }
        </div>
      </div>
    </div>
  )
}


const mapState = ({ thoughts, clusters }, ownProps) => {
  const filteredThoughts = thoughts.filter(t => t.clusterId == ownProps.match.params.id)
  const cluster = clusters.find(c => c.cluster.id == ownProps.match.params.id)

  return {
    thoughts: cluster && cluster.nodes || [],
    categories: filteredThoughts.reduce((allCats, t) => {
      const newCats = t.categories.map(c => c.label).slice(0, 5).filter(c => allCats.indexOf(c) == -1)
      return allCats.concat(newCats)
    }, [])
  }
}

const mapDispatch = (dispatch, ownProps) => ({ 
  unlink(thought, thoughts) {
    dispatch(unlinkThought(thought))
      .then(() => {
        if (thoughts.length <= 2) ownProps.history.push('/thoughts')
      })
  }
})

export default connect(mapState, mapDispatch)(ClusterThoughts)
