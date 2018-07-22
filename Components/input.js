import React from "react"; 

class Input extends React.Component {
  constructor() {
    super();

    this.state = {
      error: null
    };
  }

  render() {
    return (
      <form
        ref={input => {
          this.taskInput = input;
        }}
        onSubmit={this.handleCreate.bind(this)}
      >
      <div className='row'>
        <div className='col-sm-4'>
        <input placeholder="Enter task name" className='form-control ' />
        </div>
        <div className='col-sm-4'>

        <button type="submit" className='btn btn-primary'>Add task</button>
        </div>
        <div className='col-sm-4'>

        </div>

      </div>
      
        {this.renderError()}
      </form>
    );
  }
  validateInput(taskName) {
    if (!taskName) {
      return "*No task entered";
    } else if (
      this.props.taskList.find(
        todo => todo.name.toLowerCase() === taskName.toLowerCase()
      )
    ) {
      return "*Task already exists";
    } else {
      return null;
    }
  }

  handleCreate(event) {
    event.preventDefault();

    const newTask = this.taskInput[0].value;
    const validateInput = this.validateInput(newTask);

    if (validateInput) {
      this.setState({ error: validateInput });
      return;
    }

    this.setState({ error: null });

    if (newTask) {
      this.props.createTask(newTask);
      this.taskInput.reset();
    }
  }

  renderError() {
    if (!this.state.error) {
      return null;
    }
    return <div style={{ color: "red" }}>{this.state.error}</div>;
  }
}

export default Input;
