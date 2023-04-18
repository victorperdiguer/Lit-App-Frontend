import React from "react";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import notificationService from "../../services/notificationService";
import NotificationCard from "../../components/visual/NotificationCard";
import "./MainNotifications.css";

const MainNotifications = (props) => {
  const [gems, setGems] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [notificationCards, setNotificationCards] = useState([])

  const getNotifications = async () => {
    try {
      const response = await notificationService.getNew();
      response.length !== 0 ? setNotifications(true) : setNotifications(false);
      console.log(notifications);
    } catch (error) {
      console.error(error)
    }
  }

  const getNotificationCards = async () => {
    try {
      const response = await notificationService.getLast2Days();
      console.log(response);
      setNotificationCards(response);
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
      {notificationCards && notificationCards.length != 0 ? (<div className="notifications-view">
        {notificationCards.map((notification, index) => {
          return (
            <NotificationCard
              key={index}
              notificationId={notification._id}
              statusRevealed={notification.statusRevealed}
              statusRead={notification.statusRead}
              senderName={notification.sender.name}
              senderSurname={notification.sender.surname}
              senderGender={notification.sender.gender}
              dateISO={notification.createdAt}
              questionId={notification.action.questionId}
              />
          )
        })}
      </div>) : <img src="https://media.tenor.com/RZz6d7d4DAoAAAAC/desert-tumble-weed.gif" className="tumbling-weed"/>}
    </Layout>
  )
};

export default MainNotifications;