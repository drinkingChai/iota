import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Nav = () => {
  return (
    <nav>
      <Link to='/jot'>Jot</Link>
      <Link to='/train'>Train</Link>
      <Link to='/stats'>Analyze</Link>
      <Link to='/thoughts'>ThoughtStream</Link>
    </nav>
  )
}

export default connect()(Nav)
