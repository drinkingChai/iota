import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


export default class DraggableTest extends Component {
  state = { items: [
    { id: 1, content: 'what' },
    { id: 2, content: 'the hell is this' }
  ]}

  onDragEnd = (result) => {
    if (!result.destination) return

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    })
  }

  render = () => {
    return (
      <DragDropContext
        onDragEnd={ this.onDragEnd }>

      {/* insanity API */}
        <Droppable droppableId="droppable-1" type="PERSON">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
            >
              { this.state.items.map(item => (<Draggable draggableId={ item.id } key={ item.id } type="PERSON">
                {(provided, snapshot) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      style={provided.draggableStyle}
                      {...provided.dragHandleProps}
                    >
                      <h4>{ item.content }</h4>
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

      </DragDropContext>
    )
  }
}
