import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'

import {Link} from 'react-router'
import {addTask, fetchTasks} from '../actions/groupActions'

class AddTaskForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(taskAddition){
    this.props.addTask(taskAddition, this.props.params.groupid)
    .then(() => {
      this.context.router.push(`/groups/${this.props.params.groupid}`)
      this.props.fetchTasks(this.props.params.groupid)
    })
  }

  render() {
    const {fields:{task_name, assignees, due_date, owner}, handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-modal">
        <p className="heading">New Task</p>
        <div>
          <input type="text" {...task_name} placeholder='Task Name' className="biginput-invert"/>
          <div className="err-msg">{name.touched ? name.error : ''}</div>
        </div>

        <div>
          <input type="text" {...assignees} placeholder='Assignees' className="biginput-invert"/>
          <div className="err-msg">{assignees.touched ? assignees.error : ''}</div>
        </div>

        <div>
          <input type="text" {...description} placeholder='Description' className="biginput-invert"/>
          <div className="err-msg">{description.touched ? description.error : ''}</div>
        </div>

        <div>
          <input type="date" {...due_date} placeholder='Due Date' className="biginput-invert"/>
          <div className="err-msg">{due_date.touched ? due_date.error : ''}</div>
        </div>

        <div>
          <input type="text" {...owner} placeholder='Owner' className="biginput-invert"/>
          <div className="err-msg">{owner.touched ? owner.error : ''}</div>
        </div>

        <div className="btn-group">
          <button type="submit" className="btn-invert hvr-bounce-to-left-invert">Add Task</button>
        </div>

      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if(!values.task_name) errors.task_name = 'Please enter a task name'
  if(!values.assignees) errors.assignees = 'Please include assignees'
  if(!values.description) errors.description = 'Please include a description'
  if(!values.due_date) errors.due_date = 'Please enter a due date'
  if(!values.owner) errors.owner = 'Please include an owner of the task'

  return errors
}

export default reduxForm({
  form: "AddTaskForm",
  fields: ['task_name', 'assignees', 'description', 'due_date', 'owner'],
  validate
}, null, {addTask, fetchTasks})(AddTaskForm)
