import React, { Component } from 'react'
import { getBuyersQuery, login } from '../queries/queries'
import { withApollo } from 'react-apollo'
import { graphql } from 'react-apollo'
import { signup, updateprofile } from '../mutation/mutations'
// import cookie from "react-cookies";
// import { Redirect } from "react-router";

class Profile extends Component {
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
  componentDidMount () {
    console.log('Did Mount')
    this.props.client
      .query({
        query: login,
        variables: {
          email: localStorage.getItem('name')
        }
      })
      .then(response => {
        console.log(response.data.login)
        this.setState({
          firstname: response.data.login.firstname,
          lastname: response.data.login.lastname,
          email: response.data.login.email,
          password: response.data.login.password
        })
      })
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
      lastname: e.target.value
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
    this.props.client
      .mutate({
        mutation: updateprofile,
        variables: {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(response => {
        console.log('x' + JSON.stringify(response))
      })
      .catch(err => {
        console.log(err)
      })
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
          <h1>Profile</h1>
          <form onSubmit={this.submitCreate}>
            {redirectVar}
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='firstname'
                value={this.state.firstname}
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
                value={this.state.lastname}
                onChange={this.LastNameChangeHandler}
                placeholder='Last Name'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                readOnly
                type='email'
                className='form-control'
                name='email'
                value={this.state.email}
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
                value={this.state.password}
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
                Update
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

export default withApollo(Profile)
