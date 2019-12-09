var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = Promise
mongoose.connect(
  'mongodb+srv://mongoadmin:mongopassword@cluster0-9ddwi.mongodb.net/GrubHub?retryWrites=true&w=majority',
  { useNewUrlParser: true, poolSize: 100, useUnifiedTopology: true },
  err => {
    if (err) throw err
    console.log('mongoose server running')
  }
)
module.exports = { mongoose }
