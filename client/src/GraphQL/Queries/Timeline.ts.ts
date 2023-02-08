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
        created_at
      }
      pagination {
        pageCount
        itemCount
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_ADMIN_POSTS = gql`
  query GetProfilePosts($pageOptionDto: PageOptionsDto!, $userId: String!) {
    GetProfilePosts(pageOptionDto: $pageOptionDto, userId: $userId) {
      entities {
        id
        title
        subTitle
        text
        segmentType
        postStatus
        created_at
        totalPostViews
      }
      pagination {
        pageCount
        itemCount
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
