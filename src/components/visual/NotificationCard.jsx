import React from "react"
import { useState, useEffect } from "react";
import {AiFillFire, AiOutlineFire} from 'react-icons/ai'
import {GiGems} from 'react-icons/gi';
import userService from "../../services/userService";
import questionService from "../../services/questionService";
import notificationService from "../../services/notificationService";
import toast from 'react-hot-toast';

const NotificationCard = (props) => {
  const {notificationId, statusRevealed, statusRead, senderName, senderSurname, senderGender, dateISO, questionId} = props;
  const [hiddenNotification, setHiddenNotification] = useState(true);
  const [question, setQuestion] = useState(null);
  const [reveal, setReveal] = useState(statusRevealed);
  const [read, setRead] = useState(statusRead);

  const toggleHiddenNotification = async () => {
    setHiddenNotification(prev => !prev);
    setRead(true);
    try {
      await notificationService.markAsRead([notificationId]);
    } catch (error) {
      console.error(error);
    }
  };

  const getQuestion = async () => {
    try {
      const responseQuestion = await questionService.getQuestionByID(questionId);
      setQuestion(responseQuestion);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getQuestion();
  }, [])

  const handlePayment = async (event) => {
    event.stopPropagation();
    try {
      const response = await userService.getMe();
      if (response.money < 25) {
        toast.error("You need 25 gems for that!");
      } else {
        await notificationService.reveal(notificationId);
        setReveal(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function formatDate(dateString) {
    const givenDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
  
    // Reset time components to make comparison only based on date
    givenDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
  
    if (givenDate.getTime() === today.getTime()) {
      return "Today";
    } else if (givenDate.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      return "Long time ago";
    }
  }

  const date = formatDate(dateISO);

  return (
    <div className="notification-card" onClick={toggleHiddenNotification}>
      <div className="icon-and-timestamp">
        {read ? <AiOutlineFire className={`color-${senderGender} notification-icon-fire`} /> : <AiFillFire className={`color-${senderGender} notification-icon-fire`}/>}
        <h4 className="notification-card-date">{date}</h4>
      </div>
      <h2>{reveal ? `${senderName} ${senderSurname[0]}` : 'Somebody'} answered a question about you!</h2>
      <div className="notification-discover-what">
        {/* <button className="notification-show-more" >Show more</button> */}
        {!reveal ? (<button className="notification-discover-what-button" onClick={(event) => handlePayment(event)}>Reveal for 25 <GiGems/></button>) : null}
      </div>
      {!hiddenNotification && (
        <div className="hidden-notification">
          <p><span>{question && question.emoji}</span>{question && question.question}</p>
        </div>
      )}
    </div>
  )
};

export default NotificationCard;
