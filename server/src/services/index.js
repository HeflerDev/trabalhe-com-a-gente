import axios from "axios";

export const catApiClient = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});

export { getImagesFromCatApi } from "./catService.js";
