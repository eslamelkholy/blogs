import { gql } from '@apollo/client';

export const PAGE_VIEW_MUTATION = gql`
  mutation newPostView($newPostViewDto: NewPostViewDto!) {
    newPostView(newPostViewDto: $newPostViewDto) {
      postId
      userId
    }
  }
`;
