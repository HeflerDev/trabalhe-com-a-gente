import {
  getImagesFromCatApi,
  postVoteForCatApi,
} from "../services/catService.js";

export const resolvers = [
  {
    Query: {
      getCatImages: async (_, args) => {
        return await getImagesFromCatApi(args);
      },
    },

    Mutation: {
      postVote: async (args) => {
        return await postVoteForCatApi(args);
      },
    },
  },
];
