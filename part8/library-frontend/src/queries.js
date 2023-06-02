import { gql } from "@apollo/client";

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
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($author: String!, $published: Int!, $genres: [String!]!, $title: String!) {
    addBook(author: $author, published: $published, genres: $genres, title: $title) {
      title,
      author
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