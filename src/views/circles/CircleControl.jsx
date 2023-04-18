import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import MainCircle from "./MainCircle";
import AdminCircle from "./AdminCircle";
import userService from "../../services/userService";
import notificationService from "../../services/notificationService";
import "./Circle.css";

const CircleControl = () => {
  const [view, setView] = useState("circles");
  const [gems, setGems] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [gender, setGender] = useState(null);

  const getNotifications = async () => {
    try {
      const response = await notificationService.getNew();
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
      <div className="circle-control">
        <button onClick={() => setView("circles")}>Circles</button>
        <button onClick={() => setView("manageMyOwn")}>Manage my own</button>
      </div>
      {view === "circles" && <MainCircle />}
      {view === "manageMyOwn" && <AdminCircle />}
    </Layout>
  );
};

export default CircleControl;