import React from "react";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import notificationService from "../../services/notificationService";
import circleService from "../../services/circleService";
import categoriesService from "../../services/categoriesService";
import questionService from "../../services/questionService";
import toast from 'react-hot-toast';

const QuestionsSubmit = () => {
  const [gems, setGems] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [circles, setCircles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formFields, setFormFields] = useState({
    selectedCircle: '',
    positiveCategories: [],
    negativeCategories: [],
    emoji: '',
    questionText: '',
  });

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

  const getCategories = async () => {
    try {
      const response = await categoriesService.getAll();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  }

  const getCircles = async () => {
    try {
      const response = await circleService.getMyCircles();
      setCircles(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGems();
    getNotifications();
    getCategories();
    getCircles();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: selectedValues,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await questionService.createQuestion(formFields);
      toast.success('Question submitted successfully!');
      // Reset form
      setFormFields({
        selectedCircle: '',
        selectedCategory: '',
        emoji: '',
        questionText: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="submit-question-container">
      <form onSubmit={handleSubmit}>
        <h2>Submit a Question</h2>

        <label htmlFor="selectedCircle">Circle:</label>
        <select
          id="selectedCircle"
          name="selectedCircle"
          value={formFields.selectedCircle}
          onChange={handleChange}
        >
          <option value="">Select a circle</option>
          {circles.map((circle) => (
            <option key={circle._id} value={circle._id}>
              {circle.name}
            </option>
          ))}
        </select>

        <label htmlFor="positiveCategories">Positive Categories:</label>
        <select
          id="positiveCategories"
          name="positiveCategories"
          multiple
          value={formFields.positiveCategories}
          onChange={handleMultiSelectChange}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="negativeCategories">Negative Categories:</label>
        <select
          id="negativeCategories"
          name="negativeCategories"
          multiple
          value={formFields.negativeCategories}
          onChange={handleMultiSelectChange}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="emoji">Emoji:</label>
        <input
          type="text"
          id="emoji"
          name="emoji"
          value={formFields.emoji}
          onChange={handleChange}
        />

        <label htmlFor="questionText">Question:</label>
        <textarea
          id="questionText"
          name="questionText"
          value={formFields.questionText}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Question</button>
      </form>
    </div>
  )
};

export default QuestionsSubmit;
