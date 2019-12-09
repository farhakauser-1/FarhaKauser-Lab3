var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Messaging = new Schema({
  orderid: { type: String, required: true },
  Messages: { type: Array }
})
module.exports = mongoose.model('Messaging', Messaging)
