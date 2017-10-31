import React, { Component } from 'react'
import { connect } from 'react-redux'
import { catFrequency, catFrequencyOverTime } from '../helpers'
import { responsivefy } from '../svghelpers'
import * as d3 from 'd3'

/* flatten data on frontend or backend?
 * if on front end, I can manipulate and see relations?
*/

function drawBars (data, container, yExtent, bandData) {
  const margin = { top: 10, right: 10, bottom: 30, left: 30 }
  const fullWidth = 675
  const fullHeight = 300
  const width = fullWidth - margin.right - margin.left
  const height = fullHeight - margin.top - margin.bottom

  // axis scales
  const yScale = d3.scaleLinear()
    .domain(yExtent)
    .range([height, 0])
  const yAxis = d3.axisLeft(yScale).ticks(yExtent.length)

  const xScale = d3.scaleBand()
    .domain(bandData)
    .range([0, width])
  const xAxis = d3.axisBottom(xScale).ticks(data.length)

  // container
  const svg = d3.select(container)
    .append('svg')
      .attr('height', fullHeight) // total height and width
      .attr('width', fullWidth)
      .call(responsivefy)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // bars
  const bar = svg.selectAll('g')
    .data(data)
    .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0, ${i * 33})`)

  bar.append('rect')
    .style('width', d => d.count * 70)
    .attr('class', 'svg-bar')
    .on('mouseover', function (d, i, elements) {
      d3.select(this).style('transform', 'scaleX(2)')
      d3.selectAll(elements)
        .filter(':not(:hover)')
        .style('fill-opacity', 0.5)
    })
    .on('mouseout', function (d, i, elements) {
      d3.select(this).style('transform', 'scaleX(1)')
      d3.selectAll(elements)
        .style('fill-opacity', 1)
    })
  
  // axes
  svg.call(yAxis)
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

  //bar.append('text')
    ////.text(d => d.key)
    //.attr('y', 20)
    //.attr('x', 10)

  return svg
}

class Analysis extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const lineDataTopFive = catFrequencyOverTime(nextProps.thoughts).slice(0, 5)
    const yExtent = d3.extent(lineDataTopFive, d => d.count)
    const bandData = lineDataTopFive.map(d => d.key)
    drawBars(lineDataTopFive, '.bar-chart', yExtent, bandData)
  }

  render() {
    const pieDataTopFive = catFrequency(this.props.thoughts).slice(0, 5)
    const lineDataTopFive = catFrequencyOverTime(this.props.thoughts).slice(0, 5)

    return (
      <div className='charts'>
        <h3>Analysis</h3>
        
        <div className='chart bar-chart'>
        </div>
        
      </div>
    )
  }
}

const mapState = ({ thoughts }) => ({ thoughts })

export default connect(mapState)(Analysis)
