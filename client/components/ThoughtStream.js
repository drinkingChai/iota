import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../helpers'

class ThoughtStream extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <h3>Thought stream here!</h3>
        <div className='thought-list'>
          { 
            this.props.thoughts.map(thought => (
              <div key={ thought.id } className='thought'>
                <div>
                  <p>{ thought.text }</p>
                  <div className='categories'>
                    {
                      thought.classifications.map(c => c.label).slice(0, 5).map(cat =>
                        <span key={ cat } className='category'>{ cat }</span> )
                    }
                  </div>
                </div>

                <div className='subheader'>
                  <span className='date'>{ formatDate(thought.created) }</span>
                  <div className='horiz-buttons'>
                    <button><i className="im im-edit"></i></button>
                    <button><i className="im im-network"></i></button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapState = ({ thoughts }) => ({ thoughts })

export default connect(mapState)(ThoughtStream)