import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'


import {Link} from 'react-router'


class AuthView extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    if(this.props.isAuth){
      this.context.router.push('/dashboard')
    }
  }

  render() {
    return (
      <div>
        <p className="heading">Pyro Tasks</p>
        <Link to='/signup' className="btn hvr-bounce-to-left">Sign Up</Link><br/>
        <Link to='/login' className="btn hvr-bounce-to-left">Login</Link>
      </div>
    )
  }
}

export default connect(
  (state)=>{
    return {
      isAuth: state.isAuth
    }
  })(AuthView)
