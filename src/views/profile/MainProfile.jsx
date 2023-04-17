import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import userService from "../../services/userService";
import notificationService from "../../services/notificationService";
import toast from 'react-hot-toast';


const MainProfile = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
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
      const response = await notificationService.getNew();
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
      const response = await userService.updateUser(formData);
      if (response.message !== 'success') {
        console.log(response);
        toast.error(`${response.error.response.data.message}`)
      } else {
        setUser({ ...user, ...formData });
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    getUser();
    getNotifications();
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
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              pattern="^\+[0-9]+$"
              title="Phone can only contain numbers and must be preceeded by a + sign"
            />
          </label>
          <label>
          Gender:
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleInputChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleInputChange}
              />
              Other
            </label>
          </div>
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
