import React, { Component } from 'react'

export default class Button extends Component {
  state = {
    styles: {
    }
  }

  onClick = ev => {
    ev.preventDefault()
    this.props.onClick ? this.props.onClick() : null
  }

  render = () => {
    const {
      label,
      disabled,
      className } = this.props

    const { styles } = this.state
    const { onClick } = this

    return (
      <span>
        <button
          disabled={ disabled }
          style={ styles.button }
          className={ className || 'btn' }
          onClick={ onClick }>{ label }</button>
      </span>
    )
  }
}