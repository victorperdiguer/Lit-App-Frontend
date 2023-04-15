import React from "react";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import notificationService from "../../services/notificationService";
import NotificationCard from "../../components/visual/NotificationCard";

const MainNotifications = (props) => {
  const [gems, setGems] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await notificationService.getLast2Days();
      console.log(response);
      setNotifications(response);
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
      {notifications && <div className="notifications-view">
        {notifications.map((notification, index) => {
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
      </div>}
    </Layout>
  )
};

export default MainNotifications;