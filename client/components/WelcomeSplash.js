import React from 'react'
import { Link } from 'react-router-dom'

export default function WelcomeSplash () {
  return (
    <div className='welcome'>
      <h2>Jot</h2>
      <h3>Learn about yourself</h3>
      <br/>
      <Link to='/login' className='btn'>Login</Link>
    </div>
  )
}
