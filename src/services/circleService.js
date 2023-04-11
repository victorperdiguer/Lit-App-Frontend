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
  getMyCircles() {
    return this.api.get('/').then(({data}) => data).catch(error => console.error(error));
  }
  getCircleAdmins(circleId) {
    return this.api.get(`/admins/${circleId}`, body).then(({data}) => data).catch(error => console.error(error));
  }
  createCircle(body) {
    return this.api.post(`/create`, body).then(({data}) => data).catch(error => console.error(error));
  }
  deleteUserFromCircle(circleId) {
    return this.api.delete(`/exit/${circleId}`).then(({data}) => data).catch(error => console.error(error));
  }
  joinCircle(circleId) {
    return this.api.put(`/join/${circleId}`).then(({data}) => data).catch(error => console.error(error));
  }
}

const circleService = new CircleService();
export default circleService;