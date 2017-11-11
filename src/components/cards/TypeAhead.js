import React, { Component } from 'react'

export const Label = ({ text, onX }) => {
  return (
    <span><span onClick={ onX }>X</span>{ text }</span>
  )
}

export default class TypeAhead extends Component {
  state = { input: '', selections: [], selected: [], selectionsDisplayed: false }

  componentDidMount = () => {
    this.setState({ selections: this.props.selections })
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ selections: nextProps.selections })
  }

  onChange = () => ev => {
    const { input, selections, selected } = this.state
    let { value } = ev.target
    if (value[value.length - 1] == ',' && input.length) {
      value = value.slice(0, -1)
      this.setState({
        input: '',
        selections: [ ...selections, value ],
        selected: [ ...selected, value ]
      })
    } else {
      this.setState({ input: value })
    }
  }

  onSelect = name => () => {
    this.setState({
      input: '',
      // selectionsDisplayed: false,
      selected: [ ...this.state.selected, name ]
    })
  }

  onDeselect = name => () => {
    this.setState({
      selected: this.state.selected.filter(select => select != name)
    })
  }

  toggleDropdown = () => {
    this.setState({
      selectionsDisplayed: !this.state.selectionsDisplayed
    })
  }

  clear = () => {
    this.setState({ selected: [] })
  }

  render = () => {
    const { input, selected, selectionsDisplayed } = this.state
    let { selections } = this.state
    const { onSelect, onChange, onDeselect, toggleDropdown, clear } = this

    selections = selections
      .filter(select => selected.indexOf(select) == -1)
      .filter(select => select.match(new RegExp(input, 'gi')))

    return (
      <div>
        <div>
          <span>
          {/* added items go here */}
          { selected.map(select => <Label key={ select } text={ select } onX={ onDeselect(select) } />) }
          </span>

          <input value={ input } onChange={ onChange() }/>
          <span onClick={ clear }>X</span>
          <span onClick={ toggleDropdown }>{ selectionsDisplayed ? 'Up' : 'Down' }</span>
        </div>

        { input.length || selectionsDisplayed ?
          <div>
          { /* selections here */}
          { selections.map(select => <div key={ select } onClick={ onSelect(select) }>{ select }</div>) }
          </div> : null
        }
        
      </div>
    )
  }
}