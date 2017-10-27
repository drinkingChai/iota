import React, { Component } from 'react'
import { connect } from 'react-redux'

class ThoughtStream extends Component {
  render() {
    return (
      <div>
        <h3>Thought stream here!</h3>
        <ul>
          { 
            this.props.thoughts.map(thought => (
              <li key={ thought.id }>
                <p>{ thought.text }</p>
                <br/>
                <p>{ thought.classifications.map(c => c.label).slice(0, 5).join(',') }</p>
                <hr/>
                <button>Edit</button>
                <button>Classify</button>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapState = ({ thoughts }) => ({ thoughts })

export default connect(mapState)(ThoughtStream)
