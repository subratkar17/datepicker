import React from 'react';
import ListItem from './list-item';

class ListBody extends React.Component {

  displayTasks() {
    const props = this.props 

    return this.props.tasks.map((task, index) =>
      <div well well-sm>
      <ListItem key={index} {...task} {...props}   />
      </div>
    );
  }

  render() {
    return (
      <div >
        {this.displayTasks()}
      </div>
    )
  }
}

export default ListBody;