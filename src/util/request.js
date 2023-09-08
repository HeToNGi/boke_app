import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const getFrontendTechnologyCatalog = () => {
  return axios.get('/frontend_technology_catalog');
}
const getFrontendTechnologyContentForKey = (key) => {
  return axios.get(`/frontend_content/${key}`);
}
export {
  getFrontendTechnologyCatalog,
  getFrontendTechnologyContentForKey,
};
