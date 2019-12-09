import React, { Component } from 'react'
// import "../../App.css";
import { withApollo } from 'react-apollo'
import { Redirect } from 'react-router'
import { addsection, additem } from '../mutation/mutations'
import { getBuyersQuery, login, menusearch } from '../queries/queries'

class AddItems extends Component {
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
  async componentDidMount () {
    var dumm = []
    await this.props.client
      .query({
        query: login,
        variables: {
          email: localStorage.getItem('name')
        }
      })
      .then(response => {
        console.log(response.data.login.sections)
        let val = response.data.login.sections

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
    if (this.state.addcategory) {
      e.preventDefault()
      console.log('before' + this.state.ITEMLIST)
      var dummy = this.state.ITEMLIST
      var data = {
        Section: this.state.addcategory,
        RestaurantName: localStorage.getItem('RestaurantName')
      }
      console.log('Add Category from GraphQL')
      //   axios
      //     .post(`${ROOT_URL}/addcategory/`, data, {
      //       headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
      //     })
      //     .then(response => {
      //       console.log(response.data)
      //       if (response.data == 'Success') {
      //         dummy.push({ Section: this.state.addcategory, items: [] })
      //         this.setState({ ITEMLIST: dummy })
      //         console.log('aftr' + this.state.ITEMLIST)
      //         // this.state.history.push('/owner/additems')
      //       }
      //     })
      console.log(localStorage.getItem('name'))
      console.log(this.state.addcategory)
      this.props.client
        .mutate({
          mutation: addsection,
          variables: {
            email: localStorage.getItem('name'),
            sectionName: this.state.addcategory
          }
        })
        .then(response => {
          console.log(response.data.addsection)
        })
        .catch(err => {
          console.log(err)
        })
      dummy.push({ Section: this.state.addcategory, items: [] })
      this.setState({ ITEMLIST: dummy })
      console.log('aftr' + this.state.ITEMLIST)
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
                        <h3>CATEGORY:{it.Section}</h3>
                      </td>
                      <td>
                        <button
                          id={it.Section}
                          className='btn btn-danger m-2'
                          onClick={() => this.deleteCategory(it)}
                        >
                          DELETE CATEGORY
                        </button>
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

                        <td>
                          <button
                            id={it.Section + '-' + x.item}
                            className='btn btn-danger m-2'
                            onClick={() =>
                              this.deleteItem(it.Section + '-' + x.item)
                            }
                          >
                              DELETE ITEM
                          </button>
                        </td>
                        <td>
                          <button
                            id={it.Section}
                            className='btn btn-danger m-2'
                            onClick={() => this.updateItem(x, it)}
                          >
                              UPDATE ITEM
                          </button>
                        </td>
                      </tr>
                    ))
                    : null}
                  <tr>
                    <table class='table'>
                      <thead>
                        <tr>
                          <th scope='Restaurant'>ITEMS</th>
                          <th>DESCRIPTION </th>
                          <th>PRICE </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              id='itemname'
                              type='text'
                              onChange={this.handleChange}
                              value={this.state.itemname}
                              required='required'
                            />
                          </td>
                          <td>
                            <input
                              id='description'
                              type='text'
                              value={this.state.description}
                              onChange={this.handleChange}
                              required='required'
                            />
                          </td>
                          <td>
                            <input
                              id='price'
                              type='number'
                              value={this.state.price}
                              onChange={this.handleChange}
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div align='center'>
                      <button
                        id={it.Section}
                        className='btn btn-secondary m-2'
                        onClick={this.addToMenu}
                      >
                        ADD ITEM TO {it.Section}
                      </button>
                    </div>
                  </tr>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    }

    return (
      <div>
        <div class='card text-center'>
          <h1 className='btn-primary m-2'>
            {localStorage.getItem('RestaurantName')} RESTAURANT
          </h1>
        </div>
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
              ADD CATEGORY
            </button>
          </div>
        </form>
        {noitems}
      </div>
    )
  }
}

export default withApollo(AddItems)
