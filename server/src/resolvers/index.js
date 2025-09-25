import { getImagesFromCatApi } from "../services/catService.js";

export const resolvers = {
  Query: {
    getImages: async (_, args) => {
      return await getImagesFromCatApi(args);
    },
  },
};
