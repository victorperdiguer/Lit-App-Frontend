import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Questions from "./Questions.css"
import { RiShuffleFill, RiSkipForwardFill } from "react-icons/ri";
import AnswerButton from "../../components/inputs/AnswerButton";
import questionService from "../../services/questionService";
import axios from 'axios';

const MainQuestions = (props) => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  const getQuestion = async () => {
    try {
      console.log("hola");
      const response = await axios.get("http://localhost:8080/question/single/random");
      console.log("adios");
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
      <h1 className="daily-questions">{}</h1>
      <div className=""></div>
        <AnswerButton/>
        <div className="extra-button-container">
          <button className="shuffle-button extra-answer-button"><RiShuffleFill/></button>
          <button className="skip-button extra-answer-button"><RiSkipForwardFill/></button>
        </div>
    </Layout>
  )
};

export default MainQuestions;
