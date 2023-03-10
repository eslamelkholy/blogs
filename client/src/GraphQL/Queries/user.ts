import { gql } from '@apollo/client';

export const GET_USER_EMAIL = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      name
      email
      role
    }
  }
`;
