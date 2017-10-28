import React from 'react'
import { Link } from 'react-router-dom'

export default function JotSubmit () {
  return (
    <div className='floating-message'>
      <div className='floating-message-body'>
        <h3>Thought has been recorded!</h3>
        <div className='horiz-loader'></div>
      </div>
    </div>
  )
}
