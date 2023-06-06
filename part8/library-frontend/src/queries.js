import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment  BookDetails on Book {
    author
    title
    published
    id
    genres
  }
`

export const ALL_AUTHORS = gql`
  query  {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      title
      published
      id
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($author: String!, $published: Int!, $genres: [String!]!, $title: String!) {
    addBook(author: $author, published: $published, genres: $genres, title: $title) {
      title,
      author
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const BooksWithGenre = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const GET_USER = gql`
  query Me {
    me {
      favoriteGenre
      username
    }
  }
`

export const BOOK_ADDED = gql`
  subscription Subscription {
    bookAdded {
     ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
