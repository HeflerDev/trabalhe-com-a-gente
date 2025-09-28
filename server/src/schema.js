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

type Image {
  id: ID!
  url: String!
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
    getBreedList: [Breeds!]!
  }

  type Vote {
    message: String
    id: Int
    image_id: String
    sub_id: String
    value: Int
    country_code: String
  }


  type Weight {
    imperial: String
    metric: String
  }

  type Breeds {
    weight: Weight
    id: String
    name: String
    cfa_url: String
    vetstreet_url: String
    vcahospitals_url: String
    temperament: String
    origin: String
    country_codes: String
    country_code: String
    description: String
    life_span: String
    indoor: Int
    lap: Int
    alt_names: String
    adaptability: Int
    affection_level: Int
    child_friendly: Int
    dog_friendly: Int
    energy_level: Int
    grooming: Int
    health_issues: Int
    intelligence: Int
    shedding_level: Int
    social_needs: Int
    stranger_friendly: Int
    vocalisation: Int
    experimental: Int
    hairless: Int
    natural: Int
    rare: Int
    rex: Int
    suppressed_tail: Int
    short_legs: Int
    wikipedia_url: String
    hypoallergenic: Int
    reference_image_id: String
  }

  type BreedList {
    breeds: [Breeds]
  }

  type Mutation {
    postVote(image_id: String!, sub_id: String, value: Int!): Vote
  }
`;
