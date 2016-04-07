import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {fetchTask} from '../actions/taskActions'

class TaskDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    if(!this.props.isAuth){
      this.context.router.push('/login')
    }
    this.props.fetchTask(this.props.params.taskid)
  }

  render() {
    if(!this.props.task){
      return <p>Loading</p>
    }
    return (
      <div>
        {console.log('task', JSON.stringify(this.props.task))}
        <h3>{this.props.task.name}</h3>
        <p>Owned by {this.props.task.owner}</p>
      </div>
    )
  }

}


export default connect(
  (state)=>{
    console.log(state);
    return {
      task: state.tasks.task,
      isAuth: state.isAuth
    }
  },
  {
    fetchTask
  }
)(TaskDetail)
