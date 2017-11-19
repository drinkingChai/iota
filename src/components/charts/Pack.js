import * as d3 from 'd3'
import { responsivefy } from '../../svghelpers'

export default function Pack (data, container) {
  // clear...
  d3.select(container).select('svg').remove()

  if (!data.length) return

  const max = d3.max(data, d => d.count),
    color = d3.scaleLinear()
      .domain([0, 1])
      .range(['#80deea', '#f44336'])

  var colors = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(d3.range(data.length));

  const margin = { top: 20, right: 20, bottom: 20, left: 20 },
    fullWidth = 300,
    fullHeight = 300,
    width = fullWidth - margin.right - margin.left,
    height = fullHeight - margin.top - margin.bottom

  const pack = d3.pack()
    .size([width, height])
    .padding(1.5)
    (d3.hierarchy({ children: data })
      .sum(d => d.count))

  console.log(pack)

  const svg = d3.select(container)
    .append('svg')
    .attr('width', fullWidth)
    .attr('height', fullHeight)
    .call(responsivefy)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const packNode = svg.selectAll('.pack-node')
    .data(pack.leaves())
    .enter()
    .append('g')
    .attr('class', 'pack-node')
    .attr('transform', d => `translate(${d.x}, ${d.y})`)
    .on('click', function (d, i, nodes) {
      if (d3.selectAll('.pack-node.active').nodes().length) {
        const active = d3.select('.pack-node.active')
          .classed('active', false)

        active
          .select('text')
          .transition()
          .duration(500)
          .style('opacity', 1)

        active
          .select('text.active')
          .remove()

        return d3.selectAll(nodes)
          .transition()
          .duration(300)
          .style('opacity', 1)
          .attr('transform', d => `translate(${d.x}, ${d.y})`)
          .select('circle')
            .transition()
            .duration(500)
            .attr('r', d => d.r)
      }

      d3.select(this)
        .select('text')
        .style('opacity', 0)

      d3.selectAll(nodes)
        .filter(n => n != d)
        .transition()
        .duration(300)
        .style('opacity', 0)
        .select('circle')
          .transition()
          .duration(300)
          .attr('r', 0)

      d3.select(this)
        .classed('active', true)
        .transition()
        .duration(300)
        .attr('transform', d => `translate(${width / 2}, ${height / 2})`)
        .select('circle')
          .transition()
          .duration(500)
          .attr('r', d => width / 2)
      
      setTimeout(() => {
        d3.select(this)
          .append('text')
          .classed('active', true)
          .selectAll('tspan')
          .data(d => [d.data.key, d.value])
          .enter()
          .append('tspan')
            .attr('x', 0)
            .attr('y', (d, i) => i * 25)
            .attr('dy', (d, i, nodes) => nodes.length > 1 ? -7 * (nodes.length - 1) : 0)
            .text(t => t)
      }, 750)

    })

  packNode
    .append('circle')
    .transition()
    .duration(700)
    .attr('r', d => d.r)
    .style('fill', (d, i, nodes) => colors(d.value / nodes.length))

  packNode
    .append('text')
    .attr('class', 'fade-in')
    .attr("dominant-baseline", "central")
    .selectAll('tspan')
    .data(d => d.data.key.split(' '))
    .enter()
    .append('tspan')
      .attr('x', 0)
      .attr('y', (d, i) => i * 14)
      .attr('dy', (d, i, nodes) => nodes.length > 1 ? -7 * (nodes.length - 1) : 0)
      .text(t => t)
}
