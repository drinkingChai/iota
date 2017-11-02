import React, { Component } from 'react'
import { connect } from 'react-redux'
import { thoughtsOverTime, catFrequencyOverTime } from '../helpers'
import { responsivefy } from '../svghelpers'
import * as d3 from 'd3'
import Pack from './charts/Pack'
import Line from './charts/Line'
import Scatter from './charts/Scatter'

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
    this.selectScatterView = this.selectScatterView.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.thoughts.length) {
      Pack(catFrequencyOverTime(this.props.thoughts).slice(0, 5), '.pie-chart')
      Scatter(thoughtsOverTime(this.props.thoughts), '.scatter-chart')
    }
  }

  componentWillReceiveProps(nextProps) {
    Pack(catFrequencyOverTime(nextProps.thoughts).slice(0, 5), '.pie-chart')
    Scatter(thoughtsOverTime(nextProps.thoughts), '.scatter-chart')
  }

  selectPackView(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
    if (value == 'recent') return Pack(catFrequencyOverTime(this.props.thoughts).slice(0, 5), '.pie-chart')
    return Pack(catFrequencyOverTime(this.props.thoughts), '.pie-chart')
  }

  selectScatterView(ev) {
    const { name, value } = ev.target
    const { thoughts } = this.props

    this.setState({ [name]: value })

    let filtered = value !== 'All' ? thoughts.filter(thought => (
      thought.classifications.find(c => c.label == value)
    )) : thoughts
    Scatter(thoughtsOverTime(thoughts), '.scatter-chart', thoughtsOverTime(filtered))
  }

  render() {
    const { packSelect, lineSelect } = this.state
    const { selectPackView, selectScatterView } = this
    let { thoughts, topics } = this.props

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
          <select name='lineSelect' value={ lineSelect } onChange={ selectScatterView }>
            <option>All</option>
            { topics && topics.map(topic => (
              <option key={ topic.id }>{ topic.label }</option>)) }
          </select>
        </span>
        <span className='select'>
          <select>
            <option>From -/-/- to -/-/-</option>
          </select>
        </span>
        <div className='chart scatter-chart'>
        </div>
      </div>
    )
  }
}

const mapState = ({ thoughts }) => ({
  thoughts,
  topics: thoughts.reduce((_topics, thought) => {
    thought.classifications.forEach(c => {
      if (!_topics.find(t => t.label == c.label)) _topics.push(c)
    })
    return _topics
  }, [])
})

export default connect(mapState)(Analysis)
