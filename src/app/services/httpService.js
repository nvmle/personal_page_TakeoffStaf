import axios from "axios";

const baseHttpUrl = "http://localhost:3003/";

const http = axios.create({
  baseURL: baseHttpUrl,
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
