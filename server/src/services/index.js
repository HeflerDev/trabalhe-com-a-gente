import axios from "axios";

axios.defaults.baseURL = "https://api.thecatapi.com/v1";

export { getImagesFromCatApi } from "./cat.api.js";
