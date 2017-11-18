import React, { Component } from 'react'
import Textarea from '../reusables/Textarea'

export default class TestTextbox extends Component {
  state = { text: '' }

  onChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  render() {
    return (
      <div className='form'>
        <Textarea
          value={ this.state.text }
          onChange={ this.onChange('text') } />
      </div>
    )
  }
}