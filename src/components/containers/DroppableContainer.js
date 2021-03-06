import React, { Component } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


export default class DroppableContainer extends Component {
  state = { items: [] }

  componentDidMount = () => {
    this.setState(this.props)
  }

  componentWillReceiveProps = nextProps => {
    this.setState(nextProps)
  }

  onDragEnd = (result) => {
    if (!result.destination) return

    const sourceIdx = result.source.index,
      destIdx = result.destination.index,
      sourceItemId = this.state.items[sourceIdx].props.thought.id,
      destItemId = this.state.items[sourceIdx > destIdx && destIdx != 0 ? destIdx - 1 : destIdx].props.thought.id

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    })

    this.props.onDrop(sourceItemId, !result.destination.index ? null : destItemId)
  }

  render = () => {
    return (
      <DragDropContext
        onDragEnd={ this.onDragEnd }>

        <Droppable droppableId="droppable-1" type="THOUGHTCARD">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              { this.state.items.map(item => item) }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
