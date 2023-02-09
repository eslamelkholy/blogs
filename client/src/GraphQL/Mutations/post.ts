import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
  mutation createPost($createPostInput: CreatePostDto!) {
    createPost(createPostInput: $createPostInput) {
      id
      title
      subTitle
      text
    }
  }
`;
