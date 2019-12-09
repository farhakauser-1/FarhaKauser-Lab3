import React, { Component } from 'react'
// import "../../App.css";
import { withApollo } from 'react-apollo'
import { Redirect } from 'react-router'
import { addsection, additem } from '../mutation/mutations'
import { getBuyersQuery, login, menusearch } from '../queries/queries'

class Displayitems extends Component {
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      nameOfRestaurant: localStorage.getItem('RestaurantName'),
      ITEMLIST: [],
      price: '',
      description: '',
      itemname: '',
      addcategory: ''
    }
    this.addToMenu = this.addToMenu.bind(this)
    this.addcategory = this.addcategory.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.updateItem = this.updateItem.bind(this)
  }
  componentDidMount () {}
  async func () {
    var dumm = []
    await this.props.client
      .query({
        query: menusearch,
        variables: {
          restaurant: this.state.addcategory
        }
      })
      .then(response => {
        if (response.data.menusearch != null) {
          console.log(response.data.menusearch)
          let val = response.data.menusearch.sections
          for (let i = 0; i < val.length; i++) {
            var obj = {
              Section: '',
              items: []
            }
            obj.Section = val[i].name
            for (let j = 0; j < val[i].itemslist.length; j++) {
              var obj2 = {
                item: val[i].itemslist[j].item,
                cost: val[i].itemslist[j].cost
              }
              obj.items.push(obj2)
            }
            dumm.push(obj)
          }
        }
      })
    console.log('dumm')
    console.log(dumm)
    this.setState({ ITEMLIST: dumm })
  }
  addToMenu = e => {
    if (this.state.itemname && this.state.description && this.state.price) {
      e.preventDefault()
      console.log(e.target.id)
      var dummy = this.state.ITEMLIST
      console.log('Before' + JSON.stringify(dummy))
      console.log('Proper' + dummy)
      dummy.forEach(iteration => {
        console.log(iteration)
        if (iteration.Section == e.target.id) {
          var data = { item: this.state.itemname, cost: this.state.price }

          iteration.items.push(data)
        }
        console.log('After' + JSON.stringify(dummy))
      })
      this.setState({ ITEMLIST: dummy })
      var data = {
        Section: e.target.id,
        RestaurantName: localStorage.getItem('RestaurantName'),
        Menu: this.state.ITEMLIST,
        item: this.state.itemname,
        cost: this.state.price
      }
      console.log(data)
      //   axios
      //     .post(`${ROOT_URL}/additems/`, data, {
      //       headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
      //     })
      //     .then(response => {
      //       console.log('Onclick')
      //       console.log(dummy)
      //       console.log(response.data)
      //       if (response.data == 'Success') {
      //         // dummy.push(data)
      //         // this.setState({ ITEMLIST: dummy })
      //         console.log(dummy)
      //       }
      //     })
      //     .catch(() => {
      //       console.log('Hello')
      //       this.props.history.push('/owner/ownerlogin')
      //     })
      //   this.setState({ itemname: '' })
      //   this.setState({ description: '' })
      //   this.setState({ price: '' })
      // }
      console.log(localStorage.getItem('name'))
      console.log(this.state.addcategory)
      this.props.client
        .mutate({
          mutation: additem,
          variables: {
            email: localStorage.getItem('name'),
            sectionName: e.target.id,
            itemName: this.state.itemname,
            itemDescription: this.state.description,
            itemPrice: this.state.price
          }
        })
        .then(response => {
          console.log(response.data.additem)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  addcategory = e => {
    console.log('here')
    if (this.state.addcategory) {
      e.preventDefault()

      this.func()
    }
  }

  updateItem (x, it) {
    localStorage.setItem('updateitem', JSON.stringify(x))
    localStorage.setItem('updatecategory', it.Section)
    this.props.history.push('/owner/updateitem')
  }
  deleteCategory (it) {
    console.log(it)
    var array = this.state.ITEMLIST
    console.log('Before Deletetion' + JSON.stringify(this.state.ITEMLIST))
    for (var i in array) {
      console.log('yo')
      if (array[i].Section == it.Section) array.splice(i, 1)
    }
    console.log(array)
    this.setState({ ITEMLIST: array })
    var data = {
      newmenu: this.state.ITEMLIST,
      RestaurantName: localStorage.getItem('RestaurantName')
    }
    console.log(data)
    // axios
    //   .post(`${ROOT_URL}/deleteitems/`, data, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    //   })
    //   .then(response => {
    //     console.log('Deleted')
    //     console.log(response.data)
    //   })
  }
  deleteItem (it) {
    var deleteable = it.split('-')
    console.log('Section and item' + deleteable)
    var array = this.state.ITEMLIST // make a separate copy of the array
    console.log(this.setState.ITEMLIST)
    for (var i in array) {
      if (array[i].Section === deleteable[0]) {
        console.log('Index found' + i)
        console.log(array[i]) // got section
        for (var j in array[i].items) {
          if (array[i].items[j].item == deleteable[1]) {
            console.log('In second loop' + array[i].items[j].item)
            break
          }
        }
        array[i].items.splice(j, 1)
        this.setState({ ITEMLIST: array })
        console.log(this.setState.ITEMLIST)
        {
          var data = {
            newmenu: this.state.ITEMLIST,
            RestaurantName: localStorage.getItem('RestaurantName'),
            item: deleteable[1]
          }
          console.log(data)
          //   axios.post(`${ROOT_URL}/deleteitems/`, data).then(response => {
          //     console.log('Deleted')
          //     console.log(response.data)
          //   })
        }
      }
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  render () {
    let redirectVar = null
    let noitems = null
    /* if (!cookie.load('owner')) {
      console.log('checking redirection')
      redirectVar = <Redirect to='/owner/ownerlogin' />
    } */
    var arr = this.state.ITEMLIST
    console.log('length' + arr.length)
    arr.forEach(x => {
      console.log(x.Section)
    })

    setTimeout(function () {
      console.log('Going to check length')
    }, 2000)
    if (arr.length === 0) {
      noitems = null
    } else {
      if (this.state && this.state.ITEMLIST) {
        noitems = (
          <table class='table'>
            <tbody>
              {this.state.ITEMLIST.map(it => (
                <tr key={it.Section}>
                  <thead>
                    <th>
                      <td>
                        <h3>SECTION NAME:{it.Section}</h3>
                      </td>
                    </th>
                    <tr>
                      <th scope='Restaurant'>ITEMS</th>

                      <th>PRICE </th>
                    </tr>
                    {it.items ? it.items.length : 0}
                  </thead>
                  {it.items
                    ? it.items.map(x => (
                      <tr>
                        <td>{x.item}</td>

                        <td>{x.cost}</td>
                      </tr>
                    ))
                    : null}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    }

    return (
      <div>
        <form>
          <div align='left'>
            <input
              id='addcategory'
              type='text'
              value={this.state.addcategory}
              onChange={this.handleChange}
              required
            />

            <button
              id='addcategory'
              className='btn btn-secondary m-2'
              onClick={this.addcategory}
            >
              SEARCH
            </button>
          </div>
        </form>
        <div class='card text-center'>
          <h1 className='btn-primary m-2'>
            {localStorage.getItem('RestaurantName')} ALL RESTAURANT ITEMS
          </h1>
        </div>

        {noitems}
      </div>
    )
  }
}

export default withApollo(Displayitems)
