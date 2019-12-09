var mongoose = require('mongoose')
var Schema = mongoose.Schema

var orderSchema = new Schema({
  items: [{ item: String, quantity: String }],
  cart: 'String',
  RestaurantName: { type: String, required: true },
  username: String,
  orderStatus: { type: String, default: 'Placed' }
})
module.exports = mongoose.model('order', orderSchema)
