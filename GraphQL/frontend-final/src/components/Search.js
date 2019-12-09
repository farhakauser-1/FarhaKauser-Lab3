import React, { Component } from 'react'
// import "../../App.css";
// import axios from 'axios'
// import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { withApollo } from 'react-apollo'
// import { ROOT_URL } from '../../URL'
import { menusearch } from '../queries/queries'

class Search extends Component {
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      item: 'Tacos',
      nameOfRestaurant: localStorage.getItem('SelectedRestaurant'),
      ITEMLIST: [],
      total: 0
    }
    // Bind the handlers to this class
    this.calculate = this.calculate.bind(this)
    this.addtocart = this.addtocart.bind(this)
    this.placeorder = this.placeorder.bind(this)
    this.insert = this.insert.bind(this)
  }
  async componentWillUnmount () {
    console.log('leaving')
    localStorage.setItem('cart', JSON.stringify(this.state.ITEMLIST))
  }
  componentDidMount () {
    var x = []
    console.log(this.state.nameOfRestaurant)
    this.props.client
      .query({
        query: menusearch,
        variables: {
          item: this.state.item,
          email: localStorage.getItem('name')
        }
      })
      .then(response => {
        if (response.data.login) {
          console.log(JSON.stringify(response.data.login))
        } else {
          this.setState({ ITEMLIST: response.data.menusearch })
        }
      })
    // axios
    //   .get(`${ROOT_URL}/fetchitems/${this.state.nameOfRestaurant}`, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    //   })
    //   .then(response => {
    //     console.log('Onclick')
    //     console.log(response.data)
    //     this.setState({ ITEMLIST: response.data })
    //     /* var y = response.data.length;
    //     for (let i = 0; i < y; i++) x.push(JSON.stringify(response.data[i])); */
    //   })
    //   .catch(() => {
    //     console.log('Hello')
    //     this.props.history.push('/buyer/login')
    //   })

    console.log('state' + this.state.ITEMLIST)
  }
  calculate = e => {
    console.log(e.target.newVal)
    var arrayMAin = this.state.ITEMLIST
    console.log(arrayMAin)

    var [...x] = e.target.id.split(',')
    console.log(x[0] + 'targetid')
    console.log('In Calculate')
    for (var s in arrayMAin) {
      console.log('In array main' + arrayMAin[s].Section + x[0])
      if (arrayMAin[s].Section == x[0]) {
        var arrayOb = arrayMAin[s].items

        for (var i in arrayOb) {
          if (arrayOb[i].item === x[1]) {
            console.log(arrayOb[i])
            arrayOb[i].count = e.target.value
            console.log('Index found' + i)
            console.log(e.target.value)
          }
          arrayMAin[s].items = arrayOb
        }
      }
    }

    this.setState({ ITEMLIST: arrayMAin })
    /* var index1 = this.state.ITEMLIST.indexOf(
      this.state.ITEMLIST.filter(i => i.itemname === x)
    )
    console.log(index1) */
  }
  addtocart = e => {
    e.preventDefault()
    var arraymain = this.state.ITEMLIST
    let total = 0
    for (var k in arraymain) {
      var arraycalc = arraymain[k].items
      for (let i = 0; i < arraycalc.length; i++) {
        total += arraycalc[i].cost * arraycalc[i].count
      }
    }
    console.log(total)
    this.setState({ total })
    if (this.state.total > 0) {
      this.setState({ enableorder: 'true' })
      console.log(this.state.enableorder)
    } else {
      this.setState({ enableorder: 'false' })
    }
  }
  placeorder = e => {
    e.preventDefault()
    console.log('creating order')
    var test = this.state.ITEMLIST
    var cart = []
    for (var i in test) {
      for (var j in test[i].items) {
        console.log(test[i].items)
        if (test[i].items[j].count > 0) cart.push(test[i].items[j])
      }
    }
    console.log(cart)
    localStorage.setItem('cart', cart)
    const data = {
      username: localStorage.getItem('username'),
      RestaurantName: localStorage.getItem('SelectedRestaurant'),
      cart: JSON.stringify(cart)
    }
    console.log(data)
    // axios
    //   .post(`${ROOT_URL}/createorder/`, data, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    //   })
    //   .then(response => {
    //     console.log(response.data + 'here')
    //     this.props.history.replace('/buyer/orderplaced')
    //   })
    //   .catch(() => {
    //     console.log('Hello')
    //     this.props.history.push('/buyer/login')
    //   })
  }
  insert = e => {
    console.log('leaving')
    localStorage.setItem('cart', JSON.stringify(this.state.ITEMLIST))
    var arraysave = this.state.ITEMLIST
    for (let i = 0; i < arraysave.length; i++) {
      if (arraysave[i].count != 0) {
        let data = {
          orderid: localStorage.getItem('orderid'),
          itemname: arraysave[i].itemname,
          quantity: arraysave[i].count
        }
        // axios
        //   .post(`${ROOT_URL}/insertorder/`, data, {
        //     headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
        //   })
        //   .then(response => {
        //     console.log(i)
        //     console.log(response.data)
        //   })
        //   .catch(() => {
        //     console.log('Hello')
        //     this.props.history.push('/buyer/login')
        //   })
      }
    }
    this.props.history.replace('/buyer/orderplaced')
  }
  render () {
    return (
      <div>
        <form>
          <div class='card text-center'>
            <h1 className='btn-danger m-2'>
              {localStorage.getItem('SelectedRestaurant')} RESTAURANT
            </h1>
          </div>
          <table class='table'>
            {this.state.ITEMLIST.map(sec => (
              <tr>
                <td>{sec.Section}</td>
                <thead>
                  <tr>
                    <th scope='Restaurant'>ITEMS</th>
                    <th>DESCRIPTION </th>
                    <th>PRICE </th>
                    <th>QUANTITY</th>
                    <th>COST</th>
                  </tr>
                </thead>
                <tbody>
                  {sec.items.map(it => (
                    <tr key={it.item}>
                      <td>{it.item}</td>
                      <td>{it.description}</td>
                      <td>{it.cost}</td>
                      <td>
                        <input
                          id={[sec.Section, it.item]}
                          type='number'
                          min='0'
                          max='10'
                          newVal='0'
                          onChange={this.calculate}
                        />
                      </td>
                      <td>{it.count * it.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </tr>
            ))}
          </table>
          <div align='center'>
            <button className='btn btn-success m-2' onClick={this.addtocart}>
              GET AMOUNT FOR ALL ITEMS
            </button>

            <span className='btn  m-2'>AMOUNT PAYABLE: {this.state.total}</span>
          </div>
          <div align='center'>
            <button className='btn btn-danger m-2' onClick={this.placeorder}>
              ADD TO CART
            </button>
          </div>
        </form>
      </div>
    )
  }
}
export default withApollo(Search)
