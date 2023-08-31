import { gql } from "@apollo/client";

export const GET_DATA = (person: string) => gql`
  query GetData {
    characters(page: 1, filter: { name: "${person}" }) {
      info {
        count
      }
      results {
        name
        type
        id
        image
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;
