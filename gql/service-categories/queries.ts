import { gql } from '@apollo/client';

export const FETCH_CATEGORIES_QUERY = gql`
  query FetchCategories {
    categories {
    id
    name
    types {
      ... on ServiceType {
        id
        name
      }
    }
  }
}
`;