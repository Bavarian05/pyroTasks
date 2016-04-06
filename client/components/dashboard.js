import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchGroups} from '../actions/dashboardActions'
import {Link} from 'react-router'
import ReactAnimate from 'react-addons-css-transition-group'


import GroupEntry from './group_entry'

class Dashboard extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    if(!this.props.isAuth){
      this.context.router.push('/login')
    }
    this.props.fetchGroups()
  }

  renderGroups() {
    if(this.props.groups.length === 0 || !Array.isArray(this.props.groups)) return (<p>You are not in any groups yet.</p>)
    else if(this.props.groups.length !== 0 && Array.isArray(this.props.groups)){
      return this.props.groups.map((group) => {
        return (
          <GroupEntry group={group} key={group.id}/>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <p className="heading">Groups</p>
        {this.renderGroups()}
        <ReactAnimate transitionName="showForm" transitionEnterTimeout={640} transitionLeaveTimeout={640}>
          {this.props.children}
        </ReactAnimate>
        <div className="btn-group">
          <Link to='/dashboard/creategroup' className="btn hvr-bounce-to-left">Create Group</Link><br/>
          <Link to='/dashboard/joingroup' className="btn hvr-bounce-to-left">Join Group</Link>
        </div>
        <Link to='/login' className="btn hvr-bounce-to-left">Logout</Link>
      </div>
    )
  }

}


export default connect(
  (state)=>{
    return {
      groups: state.groups.all,
      isAuth: state.isAuth
    }
  },
  {
    fetchGroups
  }
)(Dashboard)
