import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const navigate = useNavigate();

  // Questions array
  const questions = [
    {
      question: "Which of the following is a popular back-end framework for Node.js?",
      options: ["Laravel", "Express.js", "Flask", "Ruby on Rails"],
      correctAnswer: "Express.js", // Correct answer
    },
    {
      question: "Which of the following is NOT a front-end technology?",
      options: ["JavaScript", "HTML", "Node.js", "CSS"],
      correctAnswer: "Node.js", // Correct answer
    },
    {
      question: "Which of the following is a backend framework?",
      options: ["Django", "BootStrap", "React", "Angular"],
      correctAnswer: "Django", // Correct answer
    },
  ];

  // State to store user-selected answers
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle answer changes
  const handleAnswerChange = (questionIndex, selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  // Function to handle quiz submission
  const handleSubmit = () => {
    let allCorrect = true;
    // Check if all answers are correct
    questions.forEach((question, index) => {
      if (answers[index] !== question.correctAnswer) {
        allCorrect = false;
      }
    });

    // Correct Answer Check
    if (allCorrect) {
      setErrorMessage(""); // Clear any previous error messages
      alert("All answers are correct! Moving to the next page.");
      navigate('/welcome');
    } else {
      // Error if answers are incorrect 
      setErrorMessage("Some answers are incorrect. Please try again.");
    }
  };

  return (
    <div>
      <h1>Take Quiz to Qualify</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          handleSubmit(); 
        }}
      >
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p>{question.question}</p>
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={option}
                  checked={answers[questionIndex] === option}
                  onChange={() => handleAnswerChange(questionIndex, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default QuizPage;
