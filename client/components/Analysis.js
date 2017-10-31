import React, { Component } from 'react'
import { connect } from 'react-redux'
import { catFrequency, catFrequencyOverTime } from '../helpers'
import { responsivefy } from '../svghelpers'
import * as d3 from 'd3'

/* flatten data on frontend or backend?
 * if on front end, I can manipulate and see relations?
*/

function drawBars (data, container) {
  const margin = { top: 10, right: 10, bottom: 90, left: 30 }
  const fullWidth = 675
  const fullHeight = 300
  const width = fullWidth - margin.right - margin.left
  const height = fullHeight - margin.top - margin.bottom

  const yMax = d3.max(data, d => d.count)
  const bandData = data.map(d => d.key)
  
  // axis scales
  const yScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([height, 0])
  const yAxis = d3.axisLeft(yScale).ticks(yMax)

  const xScale = d3.scaleBand()
    .padding(0.1)
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

  // axes
  svg.call(yAxis)
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('transform', 'rotate(-45)')

  // bars
  const bar = svg.selectAll('rect')
    .data(data)
    .enter()
      .append('rect')
      .transition()
      .attr('x', d => xScale(d.key))
      .attr('y', d => yScale(d.count))
      .attr('width', d => xScale.bandwidth())
      .attr('height', d => height - yScale(d.count))
      .attr('class', 'svg-bar')

  //bar.append('rect')
    //.style('width', d => d.count * 70)
    //.on('mouseover', function (d, i, elements) {
      //d3.select(this).style('transform', 'scaleX(2)')
      //d3.selectAll(elements)
        //.filter(':not(:hover)')
        //.style('fill-opacity', 0.5)
    //})
    //.on('mouseout', function (d, i, elements) {
      //d3.select(this).style('transform', 'scaleX(1)')
      //d3.selectAll(elements)
        //.style('fill-opacity', 1)
    //})
  
  
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
    const data = catFrequencyOverTime(nextProps.thoughts).slice(0, 5)
    drawBars(data, '.bar-chart')
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
