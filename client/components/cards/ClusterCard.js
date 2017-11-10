import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../helpers'

export default function ClusterCard ({ cluster, clickHandler, selectedPool }) {
  if (!cluster) return <div></div>
  
  return (
    <div
      onClick={ clickHandler }
      className={ `thought thought-cluster ${selectedPool.find(item => item.type == 'cluster' && item.id == cluster.cluster.id) ? 'selected' : ''}` }>

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
