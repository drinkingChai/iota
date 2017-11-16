import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../helpers'
import { unlinkThought, updateCluster, move } from '../store'
import Button from './reusables/Button'
import DraggableCard from './cards/DraggableCard'
import DroppableContainer from './containers/DroppableContainer'
import NameCluster from './cards/NameCluster'

function ClusterThoughts ({ cluster, unlink, update, moveThought }) {
  if (!cluster) return <div></div>

  return (
    <div>
      <h3>A cluster of thoughts</h3>
      {/* name your cluster here */}

      <NameCluster
        cluster={ cluster }
        onClick={ (info) => update(info) }/>

      <DroppableContainer
        items={ cluster.thoughts.map((thought, i) => (
          <DraggableCard
            clickHandler={ () => unlink(thought, thoughts) }
            key={ thought.id }
            thought={ thought } />
          ))}
        onDrop={ moveThought }
      />

      <div className='cluster-categories'>
        <h3>Categories in this cluster</h3>
        <br/>
        <div className='categories'>
          { cluster.categories.map(category =>
              <span key={ category.id } className='category'>{ category.label }</span> ) }
        </div>
      </div>
    </div>
  )
}


const mapState = ({ thoughts, clusters }, ownProps) => {
  const cluster = clusters.find(c => c.cluster.id == ownProps.match.params.id)
  if (cluster) {
    cluster.thoughts = cluster.nodes.map(node => thoughts.find(thought => thought.id == node.id))
    cluster.categories = cluster.thoughts.reduce((allCategories, thought) => {
      return [ ...allCategories, ...thought.categories.filter(category => allCategories.indexOf(category) == -1) ]
    }, [])
  }

  return {
    cluster: cluster
  }
}

const mapDispatch = (dispatch, ownProps) => ({ 
  unlink(thought, thoughts) {
    dispatch(unlinkThought(thought))
      .then(() => {
        if (thoughts.length <= 2) ownProps.history.push('/thoughts')
      })
  },
  update(info) {
    dispatch(updateCluster(ownProps.match.params.id, info))
  },
  moveThought(movingId, behindId) {
    dispatch(move(ownProps.match.params.id, movingId, behindId))
  }
})

export default connect(mapState, mapDispatch)(ClusterThoughts)
