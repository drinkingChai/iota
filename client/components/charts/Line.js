import * as d3 from 'd3'
import { responsivefy } from '../../svghelpers'

export default function Line (data, container) {
  // clear...
  d3.select(container).select('svg').remove()

  console.log(data)

  //const max = d3.max(data, d => d.count),
    //color = d3.scaleLinear()
      //.domain([0, 1])
      //.range(['#80deea', '#f44336'])

  //var colors = d3.scaleOrdinal(d3.schemeCategory10)
    //.domain(d3.range(data.length));

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

  data.forEach(d => {
    d.date = new Date(d.key)
    d.count = d.thoughts.length
  })

  const today = new Date()
  const xScale = d3.scaleTime()
    .domain([
      data.length <= 1 ? new Date(today.setDate((today.getDate() - 1))) : d3.min(data, d => d.date),
      d3.max(data, d => d.date)
    ])
    .range([0, width])

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(4))

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height, 0])

  svg
    .append('g')
    .call(d3.axisLeft(yScale).ticks(5))

  const line = d3.line()
    .x(d => xScale(d.date))
    .x(d => yScale(d.thoughts.count))

  svg
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
      .attr('d', d => line(d))

  console.log(data)
}
