import React, { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  const questionBank = {
    HR: [
      "Tell me about yourself.",
      "What are your strengths?",
      "Why should we hire you?",
      "Describe your favorite project."
    ],

    Technical: [
      "What is React?",
      "Explain OOPS concepts.",
      "Difference between SQL and NoSQL?",
      "What is API?"
    ],

    Coding: [
      "Explain binary search.",
      "What is time complexity?",
      "Difference between array and linked list?",
      "Explain recursion."
    ]
  };

  const [category, setCategory] = useState("HR");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (time > 0 && question !== "") {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [time, question]);

  const generateQuestion = () => {
    const questions = questionBank[category];

    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];

    setQuestion(randomQuestion);
    setAnswer("");
    setTime(60);
    setScore(null);
    setFeedback("");
  };

  const submitAnswer = () => {
    const randomScore = Math.floor(Math.random() * 40) + 60;

    setScore(randomScore);

    setAttempts(attempts + 1);

    if (randomScore > bestScore) {
      setBestScore(randomScore);
    }

    if (randomScore >= 90) {
      setFeedback("Excellent answer. Very confident response.");
    } else if (randomScore >= 75) {
      setFeedback("Good answer. Try adding more clarity.");
    } else {
      setFeedback("Needs improvement. Try giving structured answers.");
    }
  };

  return (
    <div className="container">
      <h1>🎯 InterviewAce-AI</h1>

      <div className="category-buttons">
        <button onClick={() => setCategory("HR")}>HR</button>

        <button onClick={() => setCategory("Technical")}>
          Technical
        </button>

        <button onClick={() => setCategory("Coding")}>
          Coding
        </button>
      </div>

      <h3>Selected: {category}</h3>

      <div className="stats">
        <div className="stat-card">
          <h4>Attempts</h4>
          <p>{attempts}</p>
        </div>

        <div className="stat-card">
          <h4>Best Score</h4>
          <p>{bestScore}</p>
        </div>

        <div className="stat-card">
          <h4>Category</h4>
          <p>{category}</p>
        </div>
      </div>

      <button onClick={generateQuestion}>
        Generate Interview Question
      </button>

      {question && (
        <div className="card">
          <h2>{question}</h2>

          <p>⏳ Time Left: {time}s</p>

          <textarea
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button onClick={submitAnswer}>
            Submit Answer
          </button>

          {score && (
            <div className="result">
              <h3>Your Score: {score}/100</h3>
              <p>{feedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
      }
