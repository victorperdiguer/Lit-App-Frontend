import React from "react"
import MainQuestions from "../views/questions/MainQuestions";
import MainQuestionsDailyDone from "../views/questions/MainQuestionsDailyDone";
import userService from "../services/userService";
import { useEffect, useState } from "react";
import userAnswerService from "../services/userAnswerService";

const DailyQuestionsCheck = () => {
  const [dailyQuestions, setDailyQuestions] = useState(null)
  const checkDailyQuestionsDone = async () => {
    try {
      const todaysAnsweredQuestionsResponse = userAnswerService.getTodaysAnswers();
      console.log(todaysAnsweredQuestionsResponse)
      setDailyQuestions(todaysAnsweredQuestionsResponse);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkDailyQuestionsDone();
  }, [])

  return (
    <div className="main-question-wrapper">
      {dailyQuestions < 7 ? <MainQuestions/> : <MainQuestionsDailyDone/>}
    </div>
  )
};

export default DailyQuestionsCheck;
