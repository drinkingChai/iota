import * as d3 from 'd3'
import { responsivefy } from '../../svghelpers'

export default function Scatter (data, container) {
  // clear...
  d3.select(container).select('svg').remove()
  console.log(data)

  const margin = { top: 20, right: 20, bottom: 30, left: 50 },
    fullWidth = 300,
    fullHeight = 300,
    width = fullWidth - margin.right - margin.left,
    height = fullHeight - margin.top - margin.bottom,
    parseTime = d3.timeParse('%H:%M:%S')
    // allTimes = data.reduce((all, d) => [ ...all, ...d.times ]).map(t => parseTime(t))


  const svg = d3.select(container)
    .append('svg')
      .attr('width', fullWidth)
      .attr('height', fullHeight)
      .call(responsivefy)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // const xScale = d3.scaleTime()
  //   .domain(d3.extent(data, d => new Date(d.date)))
  //   .range([0, width])

  // svg
  //   .append('g')
  //   .attr('transform', `translate(0, ${height})`)
  //   .call(d3.axisBottom(xScale).ticks(4))
  //   .call(thinAxis)

  // // flatten
  // const yScale = d3.scaleTime()
  //   .domain(d3.extent(allTimes))
  //   .range([height, 0])

  // svg
  //   .append('g')
  //   .call(d3.axisLeft(yScale).ticks(5))
  //   .call(thinAxis)

  // // const xMap = d => ,
  // //   yMap = d => 2
  
  // svg
  //   .selectAll('.dot')
  //   .data(data)
  //   .enter()
  //   .append('circle')
  //     .attr('class', 'dot')
  //     .attr('r', 3.5)   

  // function thinAxis (g) {
  //   g
  //     .selectAll('.domain')
  //     .attr('stroke-width', 0.5)

  //   g
  //     .selectAll('.line')
  //     .attr('stroke-width', 0.5)
  // }
}
