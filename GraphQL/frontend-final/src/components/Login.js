import React, { Component } from 'react'
import '../App.css'

// import { Redirect } from 'react-router'
import { graphql, compose } from 'react-apollo'
import { getBuyersQuery, login } from '../queries/queries'
import { withApollo } from 'react-apollo'
// Define a Login Component
class Login extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      username: '',
      password: '',
      authFlag: false,
      isInvalid: false
    }
    // Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount () {
    this.setState({
      authFlag: false
    })
  }
  // username change handler to update state variable with the text entered by the user
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    })
  }
  // password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    })
  }
  // submit Login handler to send a request to the node backend
  submitLogin = e => {
    if (this.state.username && this.state.password) {
      var headers = new Headers()
      // prevent page from refresh
      e.preventDefault()

      console.log(this.props)

      this.props.client
        .query({
          query: login,
          variables: {
            email: this.state.username
          }
        })
        .then(response => {
          if (response.data.login) {
            console.log(JSON.stringify(response.data.login))
            if (this.state.password == response.data.login.password) {
              localStorage.setItem('auth', true)
              console.log('yes')
              localStorage.setItem('userid', response.data.login.id)

              if (response.data.login.isOwner == true) {
                this.props.history.push('/owner')
              } else this.props.history.push('/buyer')
            } else {
              this.setState({ isInvalid: 'true' })
            }
          } else {
            this.setState({ isInvalid: 'true' })
          }
        })
    }
  }
  render () {
    // redirect based on successful login
    let redirectVar = null
    const isAuth = this.state.authFlag
    const isInvalid = this.state.isInvalid
    console.log(isAuth)

    // if (cookie.load('cookie')) {
    //   console.log('checking redirection')
    //   console.log(cookie.load('cookie'))
    //   redirectVar = <Redirect to='/buyer/restorder' />
    // }

    return (
      <div>
        {redirectVar}
        <div class='container'>
          <div class='login-form' align='center'>
            <div class='main-div'>
              <div class='panel'>
                <h2>Login using your GRUBHUB user account</h2>
                <div>{!isInvalid ? '' : 'Invalid'}</div>
              </div>
              <form>
                <div class='form-group ' align='center'>
                  <input
                    onChange={this.usernameChangeHandler}
                    type='email'
                    class='form-control'
                    name='username'
                    placeholder='Username'
                    required='required'
                  />
                </div>
                <div class='form-group'>
                  <input
                    onChange={this.passwordChangeHandler}
                    type='password'
                    class='form-control'
                    name='password'
                    placeholder='Password'
                    required='required'
                  />
                </div>
                <button
                  type='submit'
                  onClick={this.submitLogin}
                  class='btn btn-primary'
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// export Login Component
// export default compose(graphql(getBuyersQuery, { name: 'getBuyersQuery' }))(
//   Login
// )

export default withApollo(Login)
