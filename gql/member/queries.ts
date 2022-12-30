import { gql } from '@apollo/client';

export const FETCH_MEMBER_QUERY = gql`
  query GetMember($auth0Id: String!) {
    member(where: { auth0Id: $auth0Id }) {
      description
      displayName
      email
      firstName
      id
      lastName
      phone
      picture {
        id
        handle
        url
      }
    }
  }
`;
