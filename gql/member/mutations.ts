import { gql } from '@apollo/client';

export const CREATE_MEMBER_MUTATION = gql`
 mutation CreateMember($data: MemberCreateInput!) {
    createMember(data:$data){
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


export type MemberCreateInput = {
    //auth0Id: string,
    displayName: string
    email: string,
    firstName?: string,
    lastName?: string,
    mobile: string,
    phone?: string,
    assetId?: string
}

export type MemberUpdateInput = {
    //auth0Id: string,
    displayName: string
    email: string,
    firstName?: string,
    lastName?: string,
    mobile: string,
    phone?: string,
    assetId?: string
}

