import { gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export { GET_REPOSITORIES, ME };