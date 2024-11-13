import { gql } from "graphql-tag"

const NEWSWIRE_LIST_QUERY = gql`
  query Posts($locale: String!, $limit: Int!) {
    posts( locale: $locale, limit: $limit) {
      paging {
        perPage
      }
      results {
        id
        title
        url
        created_formatted
        primary_tags {
          id
        }
        preview_images_parsed {
          newswire_block {
            square
          }
        }
      }
    }
  }
`
export default NEWSWIRE_LIST_QUERY
