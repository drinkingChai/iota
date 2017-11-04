import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function Welcome ({ text, history }) {
  setTimeout(() => {
    history.push('/jot')
  }, 1500)

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

const mapState = ({ user }) => ({ text: user.email })
export default withRouter(connect(mapState)(Welcome))
