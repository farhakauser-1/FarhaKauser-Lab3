'use strict'
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var mongoose = require('../Mongoose')
var usermodel = require('../models/Users')
var ownermodel = require('../models/Restaurant')
const secret = 'secret'

module.exports = function (passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
  }

  console.log('New hdljshdbfe' + JSON.stringify(opts.jwtFromRequest))
  console.log('In passport')

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, callback) {
      console.log(jwt_payload)
      var type = jwt_payload.type
      var modeltype
      if (type == 'buyer') modeltype = usermodel
      else modeltype = ownermodel
      console.log(modeltype)
      modeltype.findOne(
        {
          username: jwt_payload.username
        },
        (err, res) => {
          if (res) {
            console.log('result' + res)
            var user = res
            delete user.password
            console.log('match' + res)
            callback(null, user)
          } else {
            console.log('no match')
            callback(err, false)
          }
        }
      )
    })
  )
}
