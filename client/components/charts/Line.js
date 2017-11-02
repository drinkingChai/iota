import * as d3 from 'd3'
import { responsivefy } from '../../svghelpers'

export default function Line (data, container) {
  // clear...
  d3.select(container).select('svg').remove()

  const margin = { top: 20, right: 20, bottom: 30, left: 30 },
    fullWidth = 300,
    fullHeight = 300,
    width = fullWidth - margin.right - margin.left,
    height = fullHeight - margin.top - margin.bottom

  const svg = d3.select(container)
    .append('svg')
      .attr('width', fullWidth)
      .attr('height', fullHeight)
      .call(responsivefy)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  const tuples = data.map(d => ({
    date: new Date(d.key),
    count: d.thoughts.length
  }))
    
  tuples.sort((a, b) => a.date - b.date)

  const xScale = d3.scaleTime()
    .domain(d3.extent(tuples, d => d.date))
    .range([0, width])

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(4))

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(tuples, d => d.count)])
    .range([height, 0])

  svg
    .append('g')
    .call(d3.axisLeft(yScale).ticks(5))

  const line = d3.line()
    .x(d => xScale(d.date) + 1)
    .y(d => yScale(d.count))

  svg
    .selectAll('.line')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('d', d => line(tuples))
    .style('stroke', '#FF9900')
    .style('stroke-width', 1)
    .style('fill', 'none');
}
