import axios from "axios";

export const catApiClient = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key": process.env.CAT_API_KEY,
  },
});

export { getImagesFromCatApi } from "./catService.js";
