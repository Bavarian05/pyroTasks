import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'

import {Link} from 'react-router'
import {login} from '../actions/authActions'

class LoginForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount(){
    window.localStorage.removeItem('pyroToken')
  }

  onSubmit(loginData){
    this.props.login(loginData)
    .then((response) => {
      if(response.payload.status < 300){
        this.context.router.push('/dashboard')
      }
    })
  }

  render() {
    const {fields:{name, password}, handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <p className="heading">Login</p>
          <div>
            <input type="text" {...name} placeholder='name' className="biginput"/>
            <div className="err-msg">{name.touched ? name.error : ''}</div>
          </div>

          <div>
            <input type="password" {...password} placeholder='password' className="biginput"/>
            <div className="err-msg">{password.touched ? password.error : ''}</div>
          </div>
        <div className="btn-group">
          <button type="submit" className="btn hvr-bounce-to-left">Submit</button>
        </div>

      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if(!values.name) errors.name = 'Please enter a valid name'
  if(!values.password) errors.password = 'Please enter a password'
  return errors
}

export default reduxForm({
  form: "LoginForm",
  fields: ['name', 'password'],
  validate
}, null, {login} )(LoginForm)
