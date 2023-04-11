import axios from "axios";

class UserService {
  constructor () {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/user`
    });
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }
  getMe() {
    return this.api.get('/').then(({data}) => data).catch(error => console.error(error));
  }
  editMyProfile(body) {
    return this.api.patch('/edit', body).then(({data}) => data).catch(error => console.error(error));
  }
}

const userService = new UserService();
export default userService;