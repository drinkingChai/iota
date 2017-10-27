import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Nav = () => {
  return (
    <div>
      <Link to='/jot'>Jot</Link>
      <Link to='/train'>Train</Link>
      <Link to='/stats'>Analyze</Link>
    </div>
  )
}

export default connect()(Nav)
