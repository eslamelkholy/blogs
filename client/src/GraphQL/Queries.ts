import { gql } from '@apollo/client';

export const GET_USER_POSTS = gql`
  query GetUserPosts($pageOptionDto: PageOptionsDto!, $userId: String!) {
    GetUserPosts(pageOptionDto: $pageOptionDto, userId: $userId) {
      entities {
        id
        title
        subTitle
        text
        segmentType
        postStatus
      }
    }
  }
`;
