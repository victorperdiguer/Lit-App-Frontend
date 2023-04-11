import axios from "axios";

class CategoriesService {
  constructor () {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/categories`
    });
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }
  getAll() {
    return this.api.get('/').then(({data}) => data).catch(error => console.error(error));
  }
  createCategory(body) {
    return this.api.post('/create', body).then(({data}) => data).catch(error => console.error(error));
  }
}

const categoriesService = new CategoriesService();
export default categoriesService;