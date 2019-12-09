var mongoose = require('mongoose')
var Schema = mongoose.Schema

var menuSchema = new Schema({
  item: { type: String, required: true },
  cost: 'Number',
  RestaurantName: 'String',
  count: { type: Number, default: 0 }
})
module.exports = mongoose.model('menu', menuSchema)
