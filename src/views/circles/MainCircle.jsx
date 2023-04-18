import React from "react";
import {useState, useEffect} from 'react';
import userService from "../../services/userService";
import notificationService from "../../services/notificationService";
import circleService from "../../services/circleService";
import toast from 'react-hot-toast';
import CircleForm from "../../components/circles/CircleForm";
import CircleList from "../../components/circles/CircleList";
import "./Circle.css";
import CircleQuestionCard from "../../components/circles/CircleQuestionCard";

const ExploreCircles = (props) => {
  const [gems, setGems] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [circleName, setCircleName] = useState("");
  const [existingCircles, setExistingCircles] = useState([]);
  const [userCircles, setUserCircles] = useState([]);
  //circle list and searchbar
  const [searchValue, setSearchValue] = useState("");
  const [displayMode, setDisplayMode] = useState("all");
  const [filteredCircles, setFilteredCircles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getCircles = async () => {
    try {
      const allCircles = await circleService.getAll();
      const myCircles = await circleService.getMyCircles();
      setExistingCircles(allCircles);
      setUserCircles(myCircles);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGems();
    getNotifications();
    getCircles();
  }, [])

  useEffect(() => {
    const filterCircles = () => {
      let circlesToFilter = [];
  
      switch (displayMode) {
        case "all":
          circlesToFilter = existingCircles;
          break;
        case "myCircles":
          circlesToFilter = userCircles;
          break;
        case "otherCircles":
          circlesToFilter = existingCircles.filter(
            (circle) => !userCircles.some((userCircle) => userCircle._id === circle._id)
          );
          break;
        default:
          break;
      }
  
      const filtered = circlesToFilter.filter((circle) =>
        circle.name.toLowerCase().includes(searchValue.toLowerCase())
      );
  
      setFilteredCircles(filtered);
    };
  
    filterCircles();
  }, [existingCircles, userCircles, searchValue, displayMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingCircles.some(circle => circle.name.toLowerCase() === circleName.toLowerCase())) {
      toast.error('A circle with this name already exists. Please choose a different name.');
      return;
    }
    try {
      const response = await circleService.createCircle({name: circleName});
      toast.success('Your circle was created successfully!')
      setCircleName(""); // Reset the input field
      getCircles();
    } catch (error) {
      console.error(error);
      toast.loading('Something bad happened - please try again later!')
    }
  };

  const handleJoinQuit = async (circleId, action) => {
    try {
      if (action === "join") {
        await circleService.join(circleId);
        toast.success("You joined the circle successfully!");
        // Update userCircles state
        setUserCircles([...userCircles, existingCircles.find((circle) => circle._id === circleId)]);
      } else if (action === "quit") {
        await circleService.removeUser(circleId);
        toast.success("You left the circle successfully!");
        // Update userCircles state
        setUserCircles(userCircles.filter((circle) => circle._id !== circleId));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update your circle membership. Please try again.");
    }
  };

  return (
    <div className="circle-main">
      <h1>Create a circle</h1>
      <CircleForm handleSubmit={handleSubmit} circleName={circleName} setCircleName={setCircleName} />
      <h1>Find other circles</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search circles"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)}>
          <option value="all">All Circles</option>
          <option value="myCircles">My Circles</option>
          <option value="otherCircles">Other Circles</option>
        </select>
      </div>
      <CircleList filteredCircles={filteredCircles} userCircles={userCircles} handleJoinQuit={handleJoinQuit} />
    </div>
  )
};

export default ExploreCircles;