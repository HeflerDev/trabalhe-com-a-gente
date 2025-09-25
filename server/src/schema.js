export const typeDefs = `#graphql
  type BreedWeight {
    imperial: String
    metric: String
  }

  type Breed {
    weight: BreedWeight
    id: String
    name: String
    temperament: String
    origin: String
    country_codes: String
    country_code: String
    life_span: String
    wikipedia_url: String
  }

  type CatImage {
    id: String
    url: String
    width: Int
    height: Int
    breeds: [Breed]
  }

  type Query {
    getCatImages(
      limit: Int = 10,
      page: Int = 0,
      order: String = "RAND",
      has_breeds: Int = 1,
      breed_ids: [String],
      category_ids: [String],
      sub_id: String
    ): [CatImage!]!
  }
`;
