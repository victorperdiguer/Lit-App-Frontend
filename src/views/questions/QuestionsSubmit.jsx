import React from "react";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import notificationService from "../../services/notificationService";

const QuestionsSubmit = () => {
  const [gems, setGems] = useState(null);
  const [notifications, setNotifications] = useState(null);

  const getNotifications = async () => {
    try {
      const response = notificationService.getNew();
      response.length !== 0 ? setNotifications(true) : setNotifications(false);
    } catch (error) {
      console.error(error)
    }
  }

  const getGems = async () => {
    try {
      const userResponse = await userService.getMe();
      setGems(userResponse.money);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGems();
    getNotifications();
  }, [])

  return (
    <Layout gems={gems} notifications={notifications}>

    </Layout>
  )
};

export default QuestionsSubmit;
