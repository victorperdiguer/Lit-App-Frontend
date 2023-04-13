import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Questions from "./Questions.css"
import { RiShuffleFill, RiSkipForwardFill } from "react-icons/ri";
import AnswerButton from "../../components/inputs/AnswerButton";
import questionService from "../../services/questionService";
import userAnswerService from "../../services/userAnswerService";
import userService from "../../services/userService";

const MainQuestions = (props) => {
  const [dailyQuestionsAnswered, setDailyQuestionsAnswered] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleDailyQuestionsAnswered = () => {
    getDailyQuestionsAnswered();
    getQuestion();
  }

  const handleAnswer = async (e) => {
    const userAnswered = e.target.value;
    const usersIgnored = answers.map(user => user._id).filter(id => id !== userAnswered);
    try {
      const response = await userAnswerService.postAnswer(question[0]._id, {userAnswered: userAnswered, usersIgnored: usersIgnored});
    } catch (error) {
      console.error(error);
    }
    handleDailyQuestionsAnswered();
  }

  const handleSkip = async (e) => {
    try {
      await userAnswerService.skipAnswer();
    } catch (error) {
      console.error(error);
    }
    handleDailyQuestionsAnswered();
  }

  const handleShuffle = async (e) => {
    try {
      await userAnswerService.shuffleAnswer();
    } catch (error) {
      console.error(error);
    }
    getQuestion();
  }

  const getQuestion = async () => {
    try {
      const questionResponse = await questionService.getRandom();
      setQuestion(questionResponse);
      const answerResponse = await questionService.getAnswerOptionsSimple(questionResponse[0]._id);
      setAnswers(answerResponse.users);
    } catch (error) {
      console.error(error);
    }
  }

  const getDailyQuestionsAnswered = async () => {
    try {
      const response = await userService.getMe();
      console.log(response);
      setDailyQuestionsAnswered(response.dailyQuestionsAnswered);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getQuestion();
    getDailyQuestionsAnswered();
  }, [])

  return (
    <Layout>
      <h1>questions main</h1>
      <h3 className="daily-questions">{dailyQuestionsAnswered}/10</h3>
      <h2 className="question">{question ? question[0].question : null}</h2>
      {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            value={answer._id}
            name={answer.name}
            surname={answer.surname}
            gender={answer.gender}
            onClick={handleAnswer}
          />
      ))}
      <div className="extra-button-container">
          <button value="skip" type="submit" className="shuffle-button extra-answer-button" onClick={handleSkip}><RiShuffleFill/></button>
          <button value="shuffle" type="submit" className="skip-button extra-answer-button" onClick={handleShuffle}><RiSkipForwardFill/></button>
      </div>
    </Layout>
  )
};

export default MainQuestions;
