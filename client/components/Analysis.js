import React, { Component } from 'react'
import { connect } from 'react-redux'
import { catFrequency, catFrequencyOverTime } from '../helpers'
import { responsivefy } from '../svghelpers'
import * as d3 from 'd3'

/* flatten data on frontend or backend?
 * if on front end, I can manipulate and see relations?
*/

class Analysis extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const data = catFrequencyOverTime(nextProps.thoughts).slice(0, 5)
    const max = d3.max(data, d => d.count)
    const color = d3.scaleLinear()
      .domain([0, 1])
      .range(['#80deea', '#f44336'])

    const width = 300,
      height = 300

    const pack = d3.pack()
      .size([width, height])
      .padding(5)
      (d3.hierarchy({ children: data })
        .sum(d => d.count))

    console.log(pack)

    const svg = d3.select('.pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .call(responsivefy)

    const packNode = svg.selectAll('.pack-node')
      .data(pack.leaves())
      .enter()
      .append('g')
      .attr('class', 'pack-node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)

    packNode
      .append('circle')
      .transition()
      .duration(700)
      .attr('r', d => d.r)
      .style('fill', d => color(d.value / max))

    packNode
      .append('text')
      .attr('font-size', 14)
      .attr('class', 'fade-in')
      .attr('text-anchor', 'middle')
      .attr("dominant-baseline", "central")
      .selectAll('tspan')
      .data(d => d.data.key.split(' '))
      .enter()
      .append('tspan')
        .attr('x', 0)
        .attr('y', (d, i) => i * -14)
        .attr('dy', (d, i, nodes) => nodes.length > 1 ? 14 : 0)
        .text(t => t)
  




      //.call(responsivefy)

    console.log(data)
  }

  render() {
    return (
      <div className='charts'>
        <h3>Analysis</h3>
        
        <div className='chart pie-chart'>
        </div>
        
      </div>
    )
  }
}

const mapState = ({ thoughts }) => ({ thoughts })

export default connect(mapState)(Analysis)
