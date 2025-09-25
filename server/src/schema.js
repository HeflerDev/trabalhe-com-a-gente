export const typeDefs = `#graphql
  type CatImage {
    id: String
    url: String
    width: Int
    height: Int
  }

  type Query {
    getImages(
      limit: Int = 10,
      page: Int = 0,
      order: String = "RAND",
      has_breeds: Int = 0,
      breed_ids: [String],
      category_ids: [String],
      sub_id: String
    ): [CatImage!]!
  }
`;
