import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../helpers'

export default function ClusterCard ({ cluster, clickHandler, selectedPool }) {
  if (!cluster) return <div></div>

  let text = cluster.cluster.name || cluster.nodes[0].text
  text = text.length > 150 ? `${text.slice(0, 150)}...` : text
  
  return (
    <div
      onClick={ clickHandler }
      className={ `thought thought-cluster ${selectedPool.find(item => item.type == 'cluster' && item.id == cluster.cluster.id) ? 'selected' : ''}` }>

      <div>
        <p>{ text }</p>
        {/*<p>{ cluster.cluster.description }</p>*/}
      </div>

      <div className='subheader'>
        <span className='date'>{ formatDate(cluster.cluster.createdAt) }</span>
        <span></span>
        <span>
          <Link
            to={ `/clusters/${cluster.cluster.id}` }><i className='im im-angle-right'></i></Link>
        </span>
      </div>
    </div>
  )
}
