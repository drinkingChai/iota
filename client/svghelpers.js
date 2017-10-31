import * as d3 from 'd3'

export function responsivefy (svg) {
  // accepts d3 selection
  const container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style('width')),
    height = parseInt(svg.style('height')),
    aspect = width / height

  svg.attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRation', 'xMinyMin')
    .call(resize)

  d3.select(window).on('resize', resize)

  function resize () {
    const targetWidth = parseInt(container.style('width'))
    svg.attr('width', targetWidth)
    svg.attr('height', Math.round(targetWidth / aspect))
  }
}
