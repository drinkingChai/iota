import React from 'react'

export default function FullScreenMessage ({ text }) {
  return (
    <div className='welcome floating-message'>
      <div className='floating-message-body'>
      <h2>{ text }</h2>

        <div className='circle-loader-container'>
          <div className='circle-loader'></div>
        </div>

        <p>Loading...</p>
      </div>
    </div>
  )
}
