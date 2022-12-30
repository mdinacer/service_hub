import { gql } from '@apollo/client';

export const DELETE_ASSET_MUTATION = gql`
  mutation DeleteAsset($assetId:ID!) {
    deleteAsset(where: {id:$assetId}) {
     id
    }
  }
`;

export const PUBLISH_ASSET_MUTATION = gql`
  mutation ($assetId: ID!) {
    publishAsset(where: { id: $assetId }, to: PUBLISHED) {
      id
      url
    }
  }
`;