import axios from "axios";

class CircleService {
  constructor () {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/circle`
    })
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }
  getAll() {
    return this.api.get('/all').then(({data}) => data).catch(error => console.error(error));
  }
  getMyCircles() {
    return this.api.get('/me').then(({data}) => data).catch(error => console.error(error));
  }
  getCircleAdmins(circleId) {
    return this.api.get(`/admins/${circleId}`).then(({data}) => data).catch(error => console.error(error));
  }
  createCircle(body) {
    return this.api.post(`/create`, body).then(({data}) => data).catch(error => console.error(error));
  }
  removeUser(circleId) {
    return this.api.delete(`/exit/${circleId}`).then(({data}) => data).catch(error => console.error(error));
  }
  join(circleId) {
    return this.api.put(`/join/${circleId}`).then(({data}) => data).catch(error => console.error(error));
  }
}

const circleService = new CircleService();
export default circleService;