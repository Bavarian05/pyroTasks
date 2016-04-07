import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchTasks} from '../actions/groupActions'
import {Link} from 'react-router'
import ReactAnimate from 'react-addons-css-transition-group'

import TaskEntry from './task_entry'
import AddTaskForm from './add_task_form'

class GroupDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    if(!this.props.isAuth){
      this.context.router.push('/login')
    }
    this.props.fetchTasks(this.props.params.groupid)
  }

  renderTasks() {
    if(this.props.tasks.length === 0 || !Array.isArray(this.props.tasks)) return <p className="err-msg">Sorry, there are no tasks in this group</p>
    return this.props.tasks.map((task) => {
      return (
        <TaskEntry task={task} key={task.id}/>
      )
    })
  }

  render() {
    return (
      <div>
        <p className="heading">Tasks</p>
          {this.renderTasks()}
        <ReactAnimate transitionName="showForm" transitionEnterTimeout={640} transitionLeaveTimeout={640}>
          {this.props.children}
        </ReactAnimate>
        <div className="btn-group">
          <Link to={`/groups/${this.props.params.groupid}/createtask`} className="btn hvr-bounce-to-left">Create Task</Link>
        </div>
      </div>
    )
  }

}


export default connect(
  (state)=>{
    return {
      tasks: state.tasks.all,
      isAuth: state.isAuth
    }
  },
  {
    fetchTasks
  }
)(GroupDetail)
