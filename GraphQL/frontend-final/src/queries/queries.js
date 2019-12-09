import { gql } from 'apollo-boost'

const login = gql`
  query login($email: String) {
    login(email: $email) {
      id
      email
      firstname
      lastname
      isOwner
      password
      restaurant
      cuisine
      sections {
        name
        itemslist {
          item
          cost
          description
        }
      }
      restaurant
    }
  }
`
const menusearch = gql`
  query menusearch($restaurant: String) {
    menusearch(restaurant: $restaurant) {
      id
      email
      firstname
      lastname
      password
      sections {
        name
        itemslist {
          item
          cost
          description
        }
      }
      restaurant
    }
  }
`

const getBuyersQuery = gql`
  {
    buyer(email: $email)
  }
`

export { getBuyersQuery, login, menusearch }
