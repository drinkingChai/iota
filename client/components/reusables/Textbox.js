import React, { Component } from 'react'

export default class Textbox extends Component {
  state = {
    placeHolder: '',
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
    this.props.onChange(ev)
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
      type,
      className,
      value } = this.props

    const {
      placeHolder,
      focused,
      style } = this.state

    const {
      onChange,
      onBlur,
      onFocus } = this

    return (
      <span style={ style.span }>
        { label ? <label>{ label }</label> : null }
        <input
          className={ className || '' }
          autoFocus={ focused }
          disabled={ disabled }
          value={ !focused && !value ? placeHolder : value }
          type={ !focused && !value ? 'text' : type }
          onChange={ onChange }
          onFocus={ onFocus }
          onBlur={ onBlur }
        />
      </span>
    )
  }
}