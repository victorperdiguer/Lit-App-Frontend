import axios from "axios";

class NotificationService {
  constructor () {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/notification`
    })
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });    
  }
  getLast2Days() {
    return this.api.get('/').then(({data}) => data).catch(error => console.error(error));
  }
  getNew() {
    return this.api.get('/new').then(({data}) => data).catch(error => console.error(error));
  }
  markAsRead(body) {
    return this.api.post('/update', body).then(({data}) => data).catch(error => console.error(error));
  }
}

const notificationService = new NotificationService();
export default notificationService;