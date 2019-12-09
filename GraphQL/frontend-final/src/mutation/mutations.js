import { gql } from 'apollo-boost'

const signup = gql`
  mutation signup(
    $firstname: String
    $lastname: String
    $email: String
    $password: String
  ) {
    signup(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      firstname
      lastname
    }
  }
`
const signupowner = gql`
  mutation signupowner(
    $firstname: String
    $lastname: String
    $email: String
    $password: String
    $restaurant: String
    $cuisine: String
  ) {
    signupowner(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      restaurant: $restaurant
      cuisine: $cuisine
    ) {
      firstname
      lastname
      restaurant
      cuisine
      isOwner
    }
  }
`
const addsection = gql`
  mutation addsection($email: String, $sectionName: String) {
    addsection(email: $email, sectionName: $sectionName) {
      sections {
        name
      }
    }
  }
`
const additem = gql`
  mutation additem(
    $email: String
    $sectionName: String
    $itemName: String
    $itemDescription: String
    $itemPrice: String
  ) {
    additem(
      email: $email
      sectionName: $sectionName
      itemName: $itemName
      itemDescription: $itemDescription
      itemPrice: $itemPrice
    ) {
      sections {
        name
        itemslist {
          item
          cost
        }
      }
    }
  }
`
const updateprofile = gql`
  mutation updateprofile(
    $firstname: String
    $lastname: String
    $email: String
    $password: String
  ) {
    updateprofile(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      firstname
      lastname
      email
      password
    }
  }
`

export { signup, updateprofile, signupowner, addsection, additem }
