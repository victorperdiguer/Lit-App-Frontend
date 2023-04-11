import axios from "axios";

class QuestionService {
  constructor () {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/question`
    })
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });    
  }
  getRandom() {
    return this.api.get('/single/random').then(({data}) => data).catch(error => console.error(error));
  }
  getQuestionByID(questionId) {
    return this.api.get(`/single/${questionId}`).then(({data}) => data).catch(error => console.error(error));
  }
  createQuestion(body) {
    return this.api.post('/create', body).then(({data}) => data).catch(error => console.error(error));
  }
  validateQuestion(questionId, body) {
    return this.api.patch(`/validate/${questionId}`, body).then(({data}) => data).catch(error => console.error(error));
  }
  getAnswerOptionsSimple(questionId) {
    return this.api.get(`/answer-options-simple/${questionId}`).then(({data}) => data).catch(error => console.error(error));
  }
  getAnswerOptionsComplex(questionId) {
    return this.api.get(`/answer-options-complex/${questionId}`).then(({data}) => data).catch(error => console.error(error));
  }
}

const questionService = new QuestionService();
export default questionService;