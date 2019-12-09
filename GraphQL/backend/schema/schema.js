const graphql = require('graphql')
const _ = require('lodash')
var restaurant = require('../models/Restaurant')
var menu = require('../models/Menu')
var orders = require('../models/Orders')
var usermodel = require('../models/Users')

var mongoose = require('../mongoose.js')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLEmail,
  GraphQLNonNull
} = graphql
const x = 'Email'
const item = 'Restaurant'
// dummy data

var buyers = [
  {
    id: '1',
    email: 'test@gmail.com',
    firstname: 'Farha',
    lastname: 'Kauser',
    password: 'password',
    isOwner: true,
    restaurant: 'Oioio',
    cuisine: 'Indo-Western',
    sections: [
      {
        id: '1',
        name: 'Section1',
        itemslist: [
          {
            id: '1',
            item: 'Item 1',
            description: 'Item description',
            cost: '10'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    email: 'test1@gmail.com',
    firstname: 'Jayasurya',
    lastname: 'Pinaki',
    password: 'password',
    isOwner: false
  }
]

const ItemType = new GraphQLObjectType({
  name: 'Items',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    item: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    cost: {
      type: GraphQLString
    }
  })
})
const SectionType = new GraphQLObjectType({
  name: 'Section',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    itemslist: {
      type: new GraphQLList(ItemType)
    }
  })
})

const BuyerType = new GraphQLObjectType({
  name: 'Buyer',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    password: { type: GraphQLString },
    isOwner: { type: GraphQLBoolean },
    restaurant: { type: GraphQLString },
    cuisine: { type: GraphQLString },
    sections: { type: new GraphQLList(SectionType) }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    login: {
      type: BuyerType,
      args: { email: { type: GraphQLString } },
      resolve (parent, args) {
        console.log('email:' + args.email)
        console.log('password:ab4f63f9ac6515257588')
        return _.find(buyers, { email: args.email })
      }
    },
    menusearch: {
      type: BuyerType,
      args: { restaurant: { type: GraphQLString } },
      resolve (parent, args) {
        console.log('restaurant:' + args.restaurant)
        console.log('password:ab4f63f9ac6515257588')
        return _.find(buyers, { restaurant: args.restaurant })
      }
    },
    buyers: {
      type: new GraphQLList(BuyerType),
      resolve (parent, args) {
        return buyers
      }
    }
  }
})

var count = 10
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: BuyerType,
      args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve (parent, args) {
        console.log(args)
        let buyer = {
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
          isOwner: false
        }
        buyers.push(buyer)
        return buyer
        usermodel.findOne({ email: msg.EmailID }, function (err, doc) {
          if (err) {
            console.log('error')
          } else {
            console.log(doc)
            if (doc) {
              console.log('exists')
              callback(null, 'user exists')
            } else {
              var p = bcrypt.hashSync(
                args.password,
                bcrypt.genSaltSync(8),
                null
              )
              var myobj = new usermodel({
                username: args.Name,
                password: p,
                email: args.EmailID
              })
              myobj.save().then(
                doc => {
                  console.log(' Added User successfully.', doc)
                  // res.end('Your GrubHub UserID is Created')
                  callback(null, 'Your GrubHub UserID is Created')
                },
                err => {
                  console.log('Unable to add User', err)
                  callback(err, null)
                }
              )
            }
          }
        })
      }
    },
    signupowner: {
      type: BuyerType,
      args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        restaurant: { type: GraphQLString },
        cuisine: { type: GraphQLString }
      },
      resolve (parent, args) {
        console.log(args)
        let buyer = {
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
          restaurant: args.restaurant,
          cuisine: args.cuisine,
          isOwner: true,
          sections: []
        }
        buyers.push(buyer)
        return buyer
        rest.findOne({ email: msg.EmailID }, function (err, doc) {
          if (err) {
            console.log('error')
          } else {
            console.log(doc)
            if (doc) {
              console.log('exists')
              callback(null, 'user exists')
            } else {
              var p = bcrypt.hashSync(
                args.password,
                bcrypt.genSaltSync(8),
                null
              )
              var myobj = new rest({
                username: args.RestaurantName,
                password: p,
                email: args.EmailID,
                RestaurantName: msg.RestaurantName
              })
              myobj.save().then(
                doc => {
                  console.log(' Added User successfully.', doc)
                  // res.end('Your GrubHub UserID is Created')
                  callback(null, 'Your GrubHub UserID is Created')
                },
                err => {
                  console.log('Unable to add User', err)
                  callback(err, null)
                }
              )
            }
          }
        })
      }
    },
    addsection: {
      type: BuyerType,
      args: {
        email: {
          type: GraphQLString
        },
        sectionName: {
          type: GraphQLString
        }
      },
      resolve (parent, args) {
        console.log(args)
        let index = 0

        let index1
        console.log('here')
        let isAdded = false
        newSection = {}
        let newbuyer = {}
        for (index in buyers) {
          if (buyers[index].email == args.email) {
            // newSection['id'] = sectionCount++
            console.log(args.email)
            console.log(args.sectionName)
            newSection['name'] = args.sectionName
            newSection['itemslist'] = []
            buyers[index].sections.push(newSection)
            console.log(buyers[index])
            isAdded = true
            index1 = index
            newbuyer = buyers[index]
            break
          }
        }
        return buyers[index1]
      }
    },
    additem: {
      type: BuyerType,
      args: {
        email: {
          type: GraphQLString
        },
        sectionName: {
          type: GraphQLString
        },
        itemName: {
          type: GraphQLString
        },
        itemDescription: {
          type: GraphQLString
        },
        itemPrice: {
          type: GraphQLString
        }
      },
      resolve (parent, args) {
        console.log('add items' + JSON.stringify(args))
        let index

        let index1, index2

        let isAdded = false
        newItem = {}
        console.log('Add items')
        if (x == item) {
          restaurant.findOne({ RestaurantName: msg.RestaurantName }, function (
            err,
            rest
          ) {
            if (err) {
              console.log('error')
              callback(err, null)
            } else {
              rest.Menu.push({ Section: msg.Section })
              rest.save().then(
                doc => {
                  console.log(' Deleted successfully.', doc)
                },
                err => {
                  console.log('Unable to delete', err)
                }
              )
              // res.send('Success')
              callback(null, 'Success')
            }
          })
        }
        for (index in buyers) {
          console.log(buyers[index].email + 'OOOO')
          if (buyers[index].email == args.email) {
            for (index1 in buyers[index].sections) {
              if (buyers[index].sections[index1].name == args.sectionName) {
                newItem = {
                  item: args.itemName,
                  description: args.itemDescription,
                  cost: args.itemPrice
                }
                index2 = index
                buyers[index].sections[index1].itemslist.push(newItem)
              }
            }
            isAdded = true
            break
          }
        }
        return buyers[index2]
        if (x == item) {
          restaurant.findOne(
            { RestaurantName: req.params.RestaurantName },
            function (err, rest) {
              if (err) {
                console.log('error')
              } else {
                if (rest.Menu.length > 0) {
                  console.log(rest.Menu.length)
                  return res.send(rest.Menu)
                } else {
                  res.send('No Such item')
                  console.log('No Such item')
                }
              }
            }
          )
        }
      }
    },

    updateprofile: {
      type: BuyerType,
      args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve (parent, args) {
        console.log(args)
        let buyer = {
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          password: args.password
        }
        let i = 0
        for (i = 0; i < buyers.length; i++) {
          if (buyer.email == buyers[i].email) {
            buyers[i].firstname = buyer.firstname
            buyers[i].lastname = buyer.lastname
            buyers[i].password = buyer.password
            break
          }
        }
        let x = buyers[i]
        return x
        usermodel.findOne({ email: args.email }, function (err, doc) {
          if (err) {
            console.log('error')
          } else {
            doc.username = msg.Name
            doc.email = msg.EmailID
            doc.password = msg.password
            doc.phoneNumber = msg.Phone

            doc.save().then(
              updateddoc => {
                console.log('User details Updated successfully.', updateddoc)
                return doc
              },
              err => {
                console.log('Unable to save user details.', err)
                return err
              }
            )
          }
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
