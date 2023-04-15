import React from "react";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import notificationService from "../../services/notificationService";
import StoreOption from "../../components/visual/StoreOptions";
import toast from "react-hot-toast";

const MainStore = () => {
  const [gems, setGems] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [gender, setGender] = useState(null);

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

  const getGender = async () => {
    try {
      const userResponse = await userService.getMe();
      setGender(userResponse.gender);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGems();
    getGender();
    getNotifications();
  }, [])

  const handlePayment = () => {
    toast.loading('We cannot process payments at this time. Try again later.', {
      duration: 5000
    })
  }

  return (
    <Layout gems={gems} notifications={notifications}>
      <h1>main store</h1>
      <div className="store">
        <StoreOption amount={50} price={"3.99 €"} size="small" onClick={handlePayment}>Flexx</StoreOption>
        <StoreOption amount={250} price={"3.49 €"} size="medium" onClick={handlePayment}>Bling Bling</StoreOption>
        <StoreOption amount={1000} price={"4.99 €"} size="big" onClick={handlePayment}>{gender === 'male' ? 'King' : gender === 'female' ? 'Queen' : 'Royal'} Cash</StoreOption>
      </div>
    </Layout>
  )
};

export default MainStore;
