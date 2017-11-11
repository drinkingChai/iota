import React, { Component } from 'react'
import Textbox from '../reusables/Textbox'
import Button from '../reusables/Button'

export default class NameCluster extends Component {
  state = { name: '' }

  componentDidMount = () => {
    this.setState(this.props.cluster)
  }

  componentWillReceiveProps = nextProps => {
    this.setState(nextProps.cluster)
  }

  onChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onClick = () => {
    this.props.onClick(this.state)
  }

  render = () => {
    return (
      <div className='form'>
        <Textbox
          label='Cluster name'
          value={ this.state.name || '' }
          onChange={ this.onChange('name') }
          placeHolder='Name your cluster...' />
        <Button
          label='Save'
          onClick={ this.onClick }
          className='btn' /> 
      </div>
    )
  }
}

