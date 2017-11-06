import React, { Component } from 'react'

export default class Select extends Component {
  state = {
    focused: false,
    style: {
      span: {
        display: 'grid',
        gridGap: '10px'
      }
    }
  }

  componentDidMount = () => {
    Object.assign(this.state, this.props)
    this.setState(this.state)
  }

  onChange = ev => {
    this.props.onChange && this.props.onChange(ev)
  }

  onFocus = ev => {
    this.setState({ focused: true })
  }

  onBlur = ev => {
    this.setState({ focused: false })
  }

  render = () => {
    const { 
      label,
      disabled,
      options,
      defaultValue,
      value } = this.props

    const {
      style,
      focused } = this.state

    const { onChange } = this

    return (
      <span className='select'>
        { label ? <label>{ label }</label> : null }
        <select
          disabled={ disabled }
          value={ value }
          onChange={ onChange }>
            {
              defaultValue ?
                <option value={ defaultValue ? defaultValue.value : options[0].value }>
                  { defaultValue ? defaultValue.label : options[0].label }
                </option> : null
            }

            { options && options.map(opt => 
              <option
                key={ opt.value }
                value={ opt.value }>{ opt.label }</option> )}
        </select>
      </span>
    )
  }
}