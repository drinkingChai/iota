import React from 'react'

export default function PleaseWait () {
  return (
    <div className='floating-message'>
      <div className='floating-message-body'>
        <h3>Please wait...</h3>
        <div className='horiz-loader'></div>
      </div>
    </div>
  )
}
