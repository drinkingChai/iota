import React, { Component } from 'react'
import { connect } from 'react-redux'
import { catFrequency, catFrequencyOverTime } from '../helpers'
import { VictoryPie, VictoryBar, VictoryChart, VictoryStack,
          VictoryArea, VictoryPolarAxis, VictoryLine, VictoryTheme } from 'victory'

/* flatten data on frontend or backend?
 * if on front end, I can manipulate and see relations?
*/

class Analysis extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const pieDataTopFive = catFrequency(this.props.thoughts).slice(0, 5)
    const lineDataTopFive = catFrequencyOverTime(this.props.thoughts).slice(0, 5)

    return (
      <div className='charts'>
        <h3>Analysis</h3>

        <div className='chart-container'>
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

        <div className='chart-container'>
          <VictoryChart
            theme={ VictoryTheme.material } >
            <VictoryBar
              data={ pieDataTopFive }
              x="key"
              y="count" />
          </VictoryChart>
        </div>

        <div className='chart-container'>
          <VictoryChart
            theme={ VictoryTheme.material } >
            <VictoryStack>
            {
              lineDataTopFive.map(data => (
                <VictoryLine
                  key={ lineDataTopFive.indexOf(data) }
                  data={ data.dateMap }
                  x="date"
                  y="count" />
              ))
            }
            </VictoryStack>
          </VictoryChart>
        </div>

      </div>
    )
  }
}

const mapState = ({ thoughts }) => ({ thoughts })

export default connect(mapState)(Analysis)
