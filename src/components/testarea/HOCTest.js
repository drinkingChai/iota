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

const Test2 = ({ paragraph }) => (
  <div>
    <h3>Don't call me names!</h3>
    <p>{ paragraph }</p>
  </div>
)

const composer = (state, fn) => Wrapping => (
  class Wrapper extends Component {
    state = { ...state }

    render = () => {
      return (
        /*
          state coming from ComposeTest
          fn modifies the headline from this.props */
        /*
          paragraph coming from props
          when the composed componenet is called */
        <Wrapping { ...state } { ...fn(this.props) } { ...this.props } />
      )
    }
  }
)

// styles for the components
const styles = {
  red: { color: 'red' },
  blue: { color: 'blue' },
  orange: { color: 'orange' }
}

// fn to create the headline
const headlineMaker = props => ({ headline: `${props.paragraph.slice(0, 5).trim()}...` })

// composed components
const StatefulRed = composer({ style: styles['red'] }, headlineMaker)(Test)
const StatefulBlue = composer({ style: styles['blue'] }, headlineMaker)(Test)
const Presentational = composer({}, headlineMaker)(Test2)

// composed using decorators
@composer({ style: styles['orange'] }, headlineMaker)
class Decorated extends Component {
  render = () => {
    return (
      <div>
        <h3>{ this.props.headline }</h3>
        <p style={ this.props.style }>{ this.props.paragraph }</p>
      </div>
    )
  }
}

export default class HOCTest extends Component {
  render = () => {
    return (
      <div>
        {/* Composed components called */}
        <StatefulRed paragraph={ "This isn't the right shade of red.." }/>
        <StatefulBlue paragraph={ 'I love blue!' }/>
        <Presentational paragraph={ "I'm presentational!" }/>
        <Decorated paragraph={ "I'm pretty!" }/>
      </div>
    )
  }
}