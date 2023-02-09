import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query userSearch($pageOptionDto: PageOptionsDto!, $email: String!) {
    userSearch(pageOptionDto: $pageOptionDto, email: $email) {
      entities {
        id
        email
        name
      }
    }
  }
`;
