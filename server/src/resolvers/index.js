import {
  getBreedsList,
  getImagesFromCatApi,
  postVoteForCatApi,
} from "../services/catService.js";

export const resolvers = [
  {
    Query: {
      getCatImages: async (_, args) => {
        return await getImagesFromCatApi(args);
      },
      getBreedList: async () => {
        return await getBreedsList();
      },
    },

    Mutation: {
      postVote: async (_, args) => {
        const { image_id, sub_id, value } = args;
        return await postVoteForCatApi(image_id, sub_id, value);
      },
    },
  },
];
