import React from 'react'

export default function Loading ({ message }) {
  return (
    <div className='floating-message'>
      <div className='floating-message-body'>
        <h3>{ message }</h3>
        <div className='horiz-loader'></div>
      </div>
    </div>
  )
}
