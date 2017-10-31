import React, { Component } from 'react'
import { connect } from 'react-redux'
import { catFrequency, catFrequencyOverTime } from '../helpers'
import { responsivefy } from '../svghelpers'
import * as d3 from 'd3'
import Pack from './charts/Pack'

/* flatten data on frontend or backend?
 * if on front end, I can manipulate and see relations?
*/

class Analysis extends Component {
  constructor() {
    super()
    this.state = {
      lineSelect: '',
      packSelect: 'recent'
    }
    this.selectPackView = this.selectPackView.bind(this)
    this.selectLineView = this.selectLineView.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.thoughts.length) Pack(catFrequencyOverTime(this.props.thoughts).slice(0, 5), '.pie-chart')
  }

  componentWillReceiveProps(nextProps) {
    Pack(catFrequencyOverTime(nextProps.thoughts).slice(0, 5), '.pie-chart')
  }

  selectPackView(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
    if (value == 'recent') return Pack(catFrequencyOverTime(this.props.thoughts).slice(0, 5), '.pie-chart')
    return Pack(catFrequencyOverTime(this.props.thoughts), '.pie-chart')
  }

  selectLineView(ev) {
  }

  render() {
    const { packSelect, lineSelect } = this.state
    const { selectPackView, selectLineView } = this

    console.log(this.props.thoughts)

    return (
      <div className='charts'>
        <h3>Analysis</h3>

        <h4>Your topics by popularity</h4>
        <span className='select'>
          <select name='packSelect' value={ packSelect } onChange={ selectPackView }>
            <option value='recent'>Recent</option>
            <option value='all'>All</option>
          </select>
        </span>
        <div className='chart pie-chart'>
        </div>

        <h4>Topics over time</h4>
        <span className='select'>
          <select name='packSelect' value={ lineSelect } onChange={ selectLineView }>
            <option value=''>Recent</option>
            <option value='all'>All</option>
          </select>
        </span>
        <div className='chart line-chart'>
        </div>
      </div>
    )
  }
}

const mapState = ({ thoughts }) => ({ thoughts })

export default connect(mapState)(Analysis)
