import { gql } from '@apollo/client';

export const CREATE_MEMBER_SERVICE_MUTATION = gql`
  mutation createMemberService($auth0Id: String!, $data: ServiceCreateInput!) {
  updateMember(
    where: {auth0Id: $auth0Id}
    data: {services: {create: [{Service: $data}]}}
  ){
    id
    services(last: 1) {
      ... on Service {
        id
        name
      }
    }
  }
}  
`;