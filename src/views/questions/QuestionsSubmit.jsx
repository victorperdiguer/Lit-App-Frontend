import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Questions from "./Questions.css"
import questionService from "../../services/questionService";
import userService from "../../services/userService";
import toast from 'react-hot-toast';

const QuestionsSubmit = (props) => {
  const [gems, setGems] = useState(null);
  const handleGems = async () => {
    try {
      const userResponse = await userService.getMe();
      setGems(userResponse.money);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout gems={gems}>

    </Layout>
  )
};

export default QuestionsSubmit;
