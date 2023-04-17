import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Questions from "./Questions.css"
import { RiShuffleFill, RiSkipForwardFill } from "react-icons/ri";
import AnswerButton from "../../components/inputs/AnswerButton";
import questionService from "../../services/questionService";
import userAnswerService from "../../services/userAnswerService";
import userService from "../../services/userService";
import notificationService from "../../services/notificationService";
import toast from 'react-hot-toast';
import QuestionsSubmit from "./QuestionsSubmit";
import { CircleLoader } from "react-spinners";

const MainQuestions = (props) => {
  const [dailyQuestionsAnswered, setDailyQuestionsAnswered] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [gems, setGems] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(false);

  const getNotifications = async () => {
    try {
      const response = await notificationService.getNew();
      response.length !== 0 ? setNotifications(true) : setNotifications(false);
    } catch (error) {
      console.error(error)
    }
  }

  const handleDailyQuestionsAnswered = () => {
    getDailyQuestionsAnswered();
    getNotifications();
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
      const response = await userService.getMe();
      if (response.money < 10) {
        toast.error("You need 10 gems for that!");
      } else {
        await userAnswerService.skipAnswer();
        handleDailyQuestionsAnswered();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleShuffle = async (e) => {
    try {
      const response = await userService.getMe();
      if (response.money < 5) {
        toast.error("You need 5 gems for that!");
      } else {
        await userAnswerService.shuffleAnswer();
        getQuestion();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getQuestion = async () => {
    try {
      const userResponse = await userService.getMe();
      setGems(userResponse.money);
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
      const response = await userAnswerService.getTodaysAnswers();
      setDailyQuestionsAnswered(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getQuestion();
    getDailyQuestionsAnswered();
    getNotifications();
  }, [])

  return (
    <Layout gems={gems} notifications={notifications}>
      {dailyQuestionsAnswered <= 10 ? (<div className="main-questions-view">
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
            <button value="shuffle" type="submit" className="shuffle-button extra-answer-button" onClick={handleShuffle}><RiShuffleFill/></button>
            <button value="skip" type="submit" className="skip-button extra-answer-button" onClick={handleSkip}><RiSkipForwardFill/></button>
        </div>
      </div>) : <QuestionsSubmit />}
    </Layout>
  )
};

export default MainQuestions;
