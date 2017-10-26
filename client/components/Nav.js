import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Nav = () => {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/jot'>Write</Link>
      <Link to='/train'>Train</Link>
    </div>
  )
}

export default connect()(Nav)
