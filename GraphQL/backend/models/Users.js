var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  password: String,
  phoneNumber: Number,
  profilePic: String
})

const usermodel = mongoose.model('user', userSchema)
// module.exports = { user: usermodel }
module.exports = usermodel
