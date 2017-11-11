import React from 'react'

export default function Welcome ({ text }) {
  return (
    <div className='welcome floating-message'>
      <div className='floating-message-body'>
      <h2>Logging in...</h2>

        <div className='circle-loader-container'>
          <div className='circle-loader'></div>
        </div>

        <p>Loading...</p>
      </div>
    </div>
  )
}
