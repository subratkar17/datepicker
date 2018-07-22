import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props)
    // Set local state for editing boolean - try to put in app.js?
    this.state = {
      editing: false
    }
  }

  // Will put task on the screen depending on editing mode
  renderTasks() {
    // Formatting for prop passing - shortening
    const { name, isComplete } = this.props;

    const taskStyle = {
      cursor: 'pointer',
      fontWeight: 'bold',
      color: isComplete ? 'green' : 'red'
    }

    // if is editing - show text input box
    if (this.state.editing) {
      return (
        <div key={name}>
          <form onSubmit={this.handleSave.bind(this)}>
            <input name={name} type="text" defaultValue={name} ref="editInput" className="form-control"/>
          </form>
        </div>
      )
    }

    // if not editing - just show text
    return (
      <div key={name} style={taskStyle} onClick={this.handleToggleComplete.bind(this)}>
        {name}
      </div>
      
    )
  }

  // Will put buttons on screen depending on editing mode
  renderButtons() {
    // if editing - show these buttons (Cancel, Delete, Save)
    if (this.state.editing) {
      return (
        <div>
        <br />
          <button className='btn btn-primary' onClick={this.handleToggleEdit.bind(this)}>Cancel</button>
          <button className='btn btn-warning' onClick={this.handleDelete.bind(this)}>Delete</button>
          <button className='btn btn-danger' onClick={this.handleSave.bind(this)}>Save</button>
          <br/>
        </div>
      )
    }

    // if not editing - only show Edit button
    return (
      <div>
      <br/>
        <button className="btn btn-success " onClick={this.handleToggleEdit.bind(this)}>Edit</button>
      </div>
    )
  }

  // Overall output to screen
  render() {
    return (
      <div>
        {this.renderTasks()}
        {this.renderButtons()}
      </div> 
    )
  }

  //Change title colour on click
  handleToggleComplete() {
    const taskToToggle = this.props;
    this.props.toggleTask(taskToToggle);
  }

  // Will trigger deleteTask() in app.js
  handleDelete() {
    const taskToDelete = this.props.name;
    this.props.deleteTask(taskToDelete);
    // need to re-toggle edit when deleting to stop editmode being applied to next in line
    this.handleToggleEdit();
  }

  // Will trigger saveTask() in app.js
  handleSave(event) {
    event.preventDefault();

    const oldTask = this.props.name;
    const newTask = this.refs.editInput.value;    
    this.props.saveTask(oldTask, newTask);

    // Set editing mode back to false
    this.setState({editing: false});
  }

  // Triggers edit locally
  handleToggleEdit() {
    this.setState(prevState => ({ editing: !prevState.editing}));
  }
}

export default ListItem;