import Axios from "axios";

export const axios_base = Axios.create({
  baseURL: "http://localhost:6969/api/",
});
