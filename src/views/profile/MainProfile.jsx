import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import userService from "../../services/userService";
import notificationService from "../../services/notificationService";


const MainProfile = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    gender: "",
    instagram: "",
    tiktok: "",
    snapchat: "",
    dateOfBirth: "",
    safeMode: ""
  });
  const [gems, setGems] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [user, setUser] = useState(null);

  const getNotifications = async () => {
    try {
      const response = notificationService.getNew();
      response.length !== 0 ? setNotifications(true) : setNotifications(false);
    } catch (error) {
      console.error(error)
    }
  }

  const getUser = async () => {
    try {
      const userResponse = await userService.getMe();
      setGems(userResponse.money);
      setUser(userResponse);
  
      setFormData({
        name: userResponse.name,
        surname: userResponse.surname,
        email: userResponse.email,
        phone: userResponse.phone,
        gender: userResponse.gender,
        instagram: userResponse.instagram,
        tiktok: userResponse.tiktok,
        snapchat: userResponse.snapchat,
        dateOfBirth: userResponse.dateOfBirth ? userResponse.dateOfBirth.slice(0, 10) : '',
        safeMode: userResponse.safeMode,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Update the user using the API
    try {
      await userService.updateUser(formData);
      // Update the user state
      setUser({ ...user, ...formData });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    getNotifications();
    getUser();
  }, [])

  return (
    <Layout gems={gems} notifications={notifications}>
      {user && <div className="user-profile">
        <h1>Profile</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Surname:
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Instagram:
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
            />
          </label>
          <label>
            TikTok:
            <input
              type="text"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Snapchat:
            <input
              type="text"
              name="snapchat"
              value={formData.snapchat}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ""} // use an empty string if dateOfBirth is null
              onChange={handleInputChange}
            />
          </label>
          <label>
            Safe Mode:
            <input
              type="checkbox"
              name="safeMode"
              checked={formData.safeMode}
              onChange={(event) => handleInputChange({ target: { name: event.target.name, value: event.target.checked } })}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>}
    </Layout>
  );
};

export default MainProfile;
