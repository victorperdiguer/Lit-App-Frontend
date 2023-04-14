import axios from "axios";

class UserAnswerService {
  constructor () {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/answer`
    });
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }
  getMyAnswers() {
    return this.api.get(`/me`).then(({data}) => data).catch(error => console.error(error));
  }
  getLastAnswer() {
    return this.api.get('/last').then(({data}) => data).catch(error => console.error(error));
  }
  getTodaysAnswers() {
    return this.api.get('/today').then(({data}) => data).catch(error => console.error(error));
  }
  postAnswer(questionId, body) {
    return this.api.post(`/create/${questionId}`, body).then(({data}) => data).catch(error => console.error(error));
  }
  skipAnswer() {
    return this.api.post(`/skip`).then(({data}) => data).catch(error => console.error(error));
  }
  shuffleAnswer() {
    return this.api.post(`/shuffle`).then(({data}) => data).catch(error => console.error(error));
  }
}

const userAnswerService = new UserAnswerService();
export default userAnswerService;