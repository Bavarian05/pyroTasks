import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import ReactAnimate from 'react-addons-css-transition-group'


import {Link} from 'react-router'
import {createGroup} from '../actions/dashboardActions'
import {fetchGroups} from '../actions/dashboardActions'

class CreateGroupForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(createGroupData){
    this.props.createGroup(createGroupData)
    .then(() => {
      this.context.router.push('/dashboard')
      this.props.fetchGroups()
    })
  }

  render() {
    const {fields:{group_name, members}, handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-modal">
        <p className="heading">New Group</p>
        <div>
          <input type="text" {...group_name} placeholder='Name' className="biginput-invert"/>
          <div className="err-msg">{group_name.touched ? group_name.error : ''}</div>
        </div>

        {/*<div>
          <input type="text" {...members} placeholder='Members'/>
          <div>{members.touched ? members.error : ''}</div>
        </div>*/}
        <div className="btn-group">
          <button type="submit" className="btn-invert hvr-bounce-to-left-invert">Create</button>
        </div>

      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if(!values.group_name) errors.group_name = 'Please enter a group name'
  // if(!values.members) errors.members = 'Please include members'
  return errors
}

export default reduxForm({
  form: "CreateGroupForm",
  fields: ['group_name', 'members'],
  validate
}, null, {createGroup, fetchGroups} )(CreateGroupForm)
