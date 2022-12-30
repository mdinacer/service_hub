import { gql } from '@apollo/client';

export const CREATE_MEMBER_MUTATION = gql`
  mutation CreateMember($data: MemberCreateInput!) {
    createMember(data: $data) {
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

export const UPDATE_MEMBER_MUTATION = gql`
  mutation UpdateMember($auth0Id:String!,$data:MemberUpdateInput!) {
    updateMember(where:{auth0Id:$auth0Id} ,data: $data) {
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

export type MemberCreateInput = {
  displayName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  mobile: string;
  phone?: string;
  assetId?: string;
};

export type MemberUpdateInput = {
  displayName: string;
  firstName?: string;
  lastName?: string;
  mobile: string;
  phone?: string;
  assetId?: string;
};
