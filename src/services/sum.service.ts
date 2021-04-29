import { get, put, post, remove, patch } from "./http.service";

const SumService = {
  getResults: () => get(`calculate/sum`, { apiVersion: "" }),
  calculateSum: (body: Object) => post(`calculate/sum`, body, { apiVersion: "" }),
};
export default SumService;
