import axios from "axios";

class CategoriesService {
  constructor () {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/categories`
    })
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