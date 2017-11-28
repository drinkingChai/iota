import React, { Component } from 'react'

export default class Textarea extends Component {
  state = {
    placeHolder: '',
    focused: false,
    styles: {
      span: {
        display: 'flex',
        flexDirection: 'column'
      },
      label: {
        marginBottom: '10px'
      },
      placeHolder: {
        color: '#BDBDBD'
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
      autoFocus,
      style,
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
        { label ? <label style={ styles.label }>{ label }</label> : null }
        <textarea
          rows='15'
          className={ className || '' }
          autoFocus={ autoFocus }
          disabled={ disabled }
          value={ !focused && !value ? placeHolder : value }
          type={ !focused && !value ? 'text' : type }
          style={ !focused && !value ? styles.placeHolder : style }
          onChange={ onChange }
          onFocus={ onFocus }
          onBlur={ onBlur } ></textarea>
      </span>
    )
  }
}