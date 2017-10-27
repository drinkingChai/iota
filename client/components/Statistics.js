import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VictoryPie, VictoryBar, VictoryChart,
          VictoryArea, VictoryPolarAxis, VictoryTheme } from 'victory'

/* flatten data on frontend or backend?
 * if on front end, I can manipulate and see relations?
*/

const catFrequency = thoughts => {
  const frequencyCount = {}
  thoughts.forEach(thought => {
    thought.classifications.forEach(c => {
      const mapData = frequencyCount[c.label] ? frequencyCount[c.label] : []
      mapData.push(thought)
      frequencyCount[c.label] = mapData
    })
  })

  const frequencyMap = Object.keys(frequencyCount).map(key => ({ key, count: frequencyCount[key].length }))
  frequencyMap.sort((a, b) => b.count - a.count)
  return frequencyMap
}

class Statistics extends Component {
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
