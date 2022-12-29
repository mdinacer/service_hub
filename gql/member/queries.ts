import { gql } from '@apollo/client';

export const FETCH_MEMBER_QUERY = gql`
 query GetMember($auth0Id: String!) {
    member(where:{auth0Id:$auth0Id}){
        displayName
        email
        firstName
        id
        lastName
        picture{
            id
            handle,
            url
        }
    }
 }
`;


