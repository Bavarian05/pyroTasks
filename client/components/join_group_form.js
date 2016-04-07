import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'

import {Link} from 'react-router'
import {joinGroup} from '../actions/dashboardActions'
import {fetchGroups} from '../actions/dashboardActions'

class JoinGroupForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(joinGroupData){
    this.props.joinGroup(joinGroupData)
    .then(() => {
      this.context.router.push(`/groups/${joinGroupData.group_id}`)
      this.props.fetchGroups()
    })
  }

  render() {
    const {fields:{group_id}, handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-modal">
        <p className="heading">Join Group</p>
        <div>
          <input type="text" {...group_id} placeholder='Group #' className="biginput-invert"/>
          <div className="err-msg">{group_id.touched ? group_id.error : ''}</div>
        </div>
        <div className="btn-group">
          <button type="submit" className="btn-invert hvr-bounce-to-left-invert">Join</button>
        </div>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if(!values.group_id) errors.group_id = 'Please enter a group id'
  return errors
}

export default reduxForm({
  form: "JoinGroupForm",
  fields: ['group_id'],
  validate
}, null, {joinGroup, fetchGroups} )(JoinGroupForm)
