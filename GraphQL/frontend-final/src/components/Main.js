import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import Login from './Login'
import SignUp from './SignUp'
import Profile from './Profile'
import SignUpOwner from './SignUpOwner'
import AddItems from './Additems'
import CentralContent from './CentralContent'
import Search from './Search'
import Navbar from './Navbar'
import OwnerNavbar from './OwnerNavbar'
import OwnerProfile from './OwnerProfile'
import Displayitems from './Displayitems'
// Create a Main Component
class Main extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          {/* Render Different Component based on Route */}
          <Route path='/buyer' component={Navbar} />
          <Route path='/owner' component={OwnerNavbar} />
          <Route path='/' exact component={CentralContent} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/buyer/displayitems' exact component={Displayitems} />
          <Route path='/signupowner' exact component={SignUpOwner} />
          <Route path='/buyer/profile' exact component={Profile} />
          <Route path='/owner/ownerprofile' exact component={OwnerProfile} />
          <Route path='/owner/additems' exact component={AddItems} />
          <Route path='/search' exact component={Search} />
        </div>
      </BrowserRouter>
    )
  }
}
// Export The Main Component
export default Main
