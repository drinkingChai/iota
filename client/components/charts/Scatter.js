import * as d3 from 'd3'
import { responsivefy } from '../../svghelpers'

export default function Scatter (data, container, plotOnly) {
  // clear...
  d3.select(container).select('svg').remove()
  console.log(data)

  const margin = { top: 20, right: 20, bottom: 30, left: 50 },
    fullWidth = 300,
    fullHeight = 300,
    width = fullWidth - margin.right - margin.left,
    height = fullHeight - margin.top - margin.bottom,
    parseTime = d3.timeParse('%H:%M:%S'),
    getTime = d => {
      const _d = new Date(d)
      return parseTime(`${_d.getHours()}:${_d.getMinutes()}:${_d.getSeconds()}`)
    },
    allTimes = data.map(d => getTime(d))


  const svg = d3.select(container)
    .append('svg')
      .attr('width', fullWidth)
      .attr('height', fullHeight)
      .call(responsivefy)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => new Date(d)))
    .range([0, width])

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(4))
    .call(thinAxis)

  const yScale = d3.scaleTime()
    .domain(d3.extent(allTimes))
    .range([height, 0])

  svg
    .append('g')
    .call(d3.axisLeft(yScale).ticks(5))
    .call(thinAxis)

  const _data = plotOnly ?
      plotOnly.map(d => ({ date: new Date(d), time: getTime(d) })) :
      data.map(d => ({ date: new Date(d), time: getTime(d) }))

  svg
    .selectAll('.dot')
    .data(_data)
    .enter()
    .append('circle')
      .attr('class', 'dot')
      .attr('r', 5)
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.time))
      .attr('fill', '#9575cd')

  function thinAxis (g) {
    g
      .selectAll('.domain')
      .attr('stroke-width', 0.5)

    g
      .selectAll('.line')
      .attr('stroke-width', 0.5)
  }
}
