import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import { signup } from '../mutation/mutations'
// import cookie from "react-cookies";
// import { Redirect } from "react-router";

class SignUp extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      UserCreated: false
    }
    // Bind the handlers to this class
    this.submitCreate = this.submitCreate.bind(this)
    this.FirstNameChangeHandler = this.FirstNameChangeHandler.bind(this)
    this.LastNameChangeHandler = this.LastNameChangeHandler.bind(this)

    this.EmailIDChangeHandler = this.EmailIDChangeHandler.bind(this)
    this.createpasswordChangeHandler = this.createpasswordChangeHandler.bind(
      this
    )
  }
  // Name change handler to update state variable with the text entered by the user
  FirstNameChangeHandler = e => {
    console.log(e.target.value)
    this.setState({
      firstname: e.target.value
    })
  }
  LastNameChangeHandler = e => {
    console.log(e.target.value)
    this.setState({
      lastame: e.target.value
    })
  }
  EmailIDChangeHandler = e => {
    console.log(e.target.value)
    this.setState({
      email: e.target.value
    })
  }
  createpasswordChangeHandler = e => {
    console.log(e.target.value)
    this.setState({
      password: e.target.value
    })
  }
  submitCreate = e => {
    e.preventDefault()
    console.log('Here' + this.state.email)

    // prevent page from refresh

    console.log('here')
    this.props
      .signup({
        variables: {
          firstname: this.state.firstname,
          lastname: this.state.lastame,
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    this.props.history.push('/login')
  }

  render () {
    const UserCreated = this.state.UserCreated
    let redirectVar = null
    console.log(UserCreated)
    /* if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/user" />;
    } */
    return (
      <div>
        <br />
        <div className='container' align='center'>
          <h1>Buyer Sign Up</h1>
          <form onSubmit={this.submitCreate}>
            {redirectVar}
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='firstname'
                onChange={this.FirstNameChangeHandler}
                placeholder='First Name'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='lastname'
                onChange={this.LastNameChangeHandler}
                placeholder='Last Name'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='email'
                className='form-control'
                name='email'
                onChange={this.EmailIDChangeHandler}
                placeholder='EmailID'
                required
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='password'
                className='form-control'
                name='password'
                onChange={this.createpasswordChangeHandler}
                placeholder='createpassword'
                required
              />
            </div>
            <br />
            <div>{UserCreated ? 'Your GrubHub UserID is Created' : ' '} </div>
            <br />
            <div style={{ width: '30%' }}>
              <button className='btn btn-danger' type='submit'>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
{
}

export default graphql(signup, { name: 'signup' })(SignUp)
