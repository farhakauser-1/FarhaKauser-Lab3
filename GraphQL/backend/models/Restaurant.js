var mongoose = require('mongoose')
var Schema = mongoose.Schema

console.log('kbjcnd')

var restaurantSchema = new Schema({
  RestaurantName: { type: String, required: true, unique: true },
  username: String,
  email: String,
  password: String,
  phoneNumber: String,
  Cuisine: String,
  Menu: [
    {
      Section: String,
      items: [
        { item: String, cost: Number, count: { type: Number, default: 0 } }
      ]
    }
  ]
})
module.exports = mongoose.model('restaurant', restaurantSchema)
