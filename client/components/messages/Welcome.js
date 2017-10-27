import React from 'react'
import { withRouter } from 'react-router-dom'

function Welcome ({ text, history }) {
  setTimeout(() => {
    history.push('/jot')
  }, 3000)

  return (
    <div className='welcome'>
      <h2>Welcome! { text || 'User' }</h2>

      <div>
        <div className='loader'></div>
      </div>

      <p>Loading...</p>
    </div>
  )
}

export default withRouter(Welcome)
