import { gql } from '@apollo/client';

export const GET_POST_DETAILS = gql`
  query GetPost($postId: String!) {
    GetPost(postId: $postId) {
      id
      title
      subTitle
      text
      segmentType
      postStatus
      created_at
    }
  }
`;
