import React, { Component } from 'react'

// hoc test
class Test extends Component {
  render = () => {
    return (
      <div>
        <h3 style={ this.props.style }>{ this.props.headline }</h3>
        <p>{ this.props.paragraph }</p>
      </div>
    )
  }
}

const composer = (state, fn) => Wrapping => (
  class wrapper extends Component {
    state = { ...state }

    render = () => {
      return (
        /*
          state coming from ComposeTest
          storing the headline */
        /*
          paragraph coming from props
          when the composed componenet is called */
        <Wrapping { ...state } { ...fn(this.props) } { ...this.props } />
      )
    }
  }
)

const styles = {
  red: { color: 'red' },
  blue: { color: 'blue' }
}

const headlineMaker = props => ({ headline: `${props.paragraph.slice(0, 5)}...` })

const ComposedTestRed = composer({ style: styles['red'] }, headlineMaker)(Test)
const ComposedTestBlue = composer({ style: styles['blue'] }, headlineMaker)(Test)

export default class HOCTest extends Component {
  render = () => {
    return (
      <div>
        <ComposedTestRed paragraph={ 'hello world!' }/>
        <ComposedTestBlue paragraph={ 'welcome to new york!' }/>
      </div>
    )
  }
}