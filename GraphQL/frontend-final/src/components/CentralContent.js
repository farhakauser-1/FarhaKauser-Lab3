import React, { Component } from 'react'
// import '../../App.css'

import { readdirSync } from 'fs'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'

// import { ROOT_URL } from '../../URL'

class CentralContent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  itemsearch = e => {
    this.setState({ searchtext: e.target.value })
    console.log(this.state.searchtext)
  }
  search = e => {}
  componentDidMount () {}

  render () {
    return (
      <div class='jumbotron'>
        <div class='jumbotron'>
          <h1 class='display-4'>{}</h1>

          <div class='lead m-4' align='center'>
            <span styles='color:blue'>{this.state.text}</span>
            <br />
            <a href='/signup' type='button' class='btn btn-dark m-2'>
              Restaurant Owner SignUP
            </a>
            <a href='/signupowner' type='button' class='btn btn-dark m-2'>
              Buyer SignUp
            </a>
            <a href='login' type='button' class='btn btn-dark m-2'>
              Login
            </a>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default CentralContent
