import { getImagesFromCatApi } from "../services/catService.js";

export const resolvers = {
  Query: {
    getCatImages: async (_, args) => {
      return await getImagesFromCatApi(args);
    },
  },
};
