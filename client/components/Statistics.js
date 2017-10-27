import React, { Component } from 'react'
import { connect } from 'react-redux'
import { catFrequency } from '../helpers'
import { VictoryPie, VictoryBar, VictoryChart,
          VictoryArea, VictoryPolarAxis, VictoryTheme } from 'victory'

/* flatten data on frontend or backend?
 * if on front end, I can manipulate and see relations?
*/

class Statistics extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    console.log(catFrequency(this.props.thoughts))
    const pieDataTopFive = catFrequency(this.props.thoughts).slice(0, 5)
    return (
      <div className='charts'>
        <VictoryChart
          polar
          theme={ VictoryTheme.material } >
          <VictoryArea
            data={ pieDataTopFive }
            x="key"
            y="count" />
          <VictoryPolarAxis labelPlacement='perpendicular' />
        </VictoryChart>
      </div>
    )
  }
}

const mapState = ({ thoughts }) => ({ thoughts })

export default connect(mapState)(Statistics)
