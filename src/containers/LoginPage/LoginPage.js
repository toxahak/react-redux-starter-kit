import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../redux/modules/auth'

class LoginForm extends React.Component {
  static propTypes = {
    login: React.PropTypes.func.isRequired
  };

  handleSubmit (e) {
    e.preventDefault()
    var user = {
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim(),
      remember_me: this.refs.remember_me.value
    }
    this.props.login({user})
  }

  render () {
    return (
      <div className='container'>
        <form className='ui form' onSubmit={(e) => this.handleSubmit(e)}>
          <div className='field'>
            <label>Email</label>
            <input type='email' ref='email' placeholder='Email' />
          </div>
          <div className='field'>
            <label>Password</label>
            <input type='password' ref='password' placeholder='Password' />
          </div>
          <div className='field'>
            <div className='ui checkbox'>
              <input type='checkbox' tabIndex='0' ref='remember_me' className='hidden' />
              <label>Remember me</label>
            </div>
          </div>
          <button className='ui button' type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

export default connect(
  store => store.auth,
  {login}
)(LoginForm)
