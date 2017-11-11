import React, { Component } from 'react'

export default class Textbox extends Component {
  state = {
    placeHolder: '',
    focused: false,
    styles: {
      // some styles here
      // can be expanded more via css
      span: { display: 'grid', gridGap: '10px' },
      placeHolder: { color: '#BDBDBD' }
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
      style,
      className,
      value } = this.props

    const {
      placeHolder,
      focused,
      styles } = this.state

    const {
      onChange,
      onBlur,
      onFocus } = this

    return (
      <span style={ styles.span }>
        { label ? <label>{ label }</label> : null }
        <input
          autoFocus={ focused }
          disabled={ disabled }
          value={ !focused && !value ? placeHolder : value }
          type={ !focused && !value ? 'text' : type }
          style={ !focused && !value ? styles.placeHolder : style }
          className={ className }
          onChange={ onChange }
          onFocus={ onFocus }
          onBlur={ onBlur }
        />
      </span>
    )
  }
}