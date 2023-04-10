import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import questionService from "../../services/questionService";
import axios from 'axios';

const MainQuestions = (props) => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  const getQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:8080/question/single/random");
      console.log("hola");
    //   const questionResponse = await questionService.getRandom();
    //   setQuestion(questionResponse);
    //   const answerResponse = await questionService.getAnswerOptionsSimple(questionResponse._id);
    //   setAnswers(answerResponse);
    //   console.log(questionResponse, answerResponse)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getQuestion();
  }, [])
  return (
    <Layout>
      <h1>questions main</h1>
    </Layout>
  )
};

export default MainQuestions;
