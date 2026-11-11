
import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "Which language is used to build React applications?",
    options: ["Python", "JavaScript", "Java", "C++"],
    answer: "JavaScript",
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useRef", "useState", "useMemo"],
    answer: "useState",
  },
  {
    question: "Which command starts a Vite React application?",
    options: [
      "npm start",
      "npm run dev",
      "npm install",
      "npm build",
    ],
    answer: "npm run dev",
  },
  {
    question: "What is JSX in React?",
    options: [
      "A database",
      "A programming language",
      "A syntax extension for JavaScript",
      "A CSS framework",
    ],
    answer: "A syntax extension for JavaScript",
  },
  {
    question: "Which method is commonly used to display lists in React?",
    options: ["map()", "filter()", "push()", "pop()"],
    answer: "map()",
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (option) => {
    if (selectedAnswer !== "") return;

    setSelectedAnswer(option);

    if (option === question.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="quiz-container">
        <div className="quiz-card result-card">
          <h1>Quiz Completed!</h1>

          <div className="score-circle">
            {score}/{questions.length}
          </div>

          <h2>Your Score</h2>

          <p>
            {score === questions.length
              ? "Excellent! You got all answers correct."
              : "Good attempt! Keep practicing."}
          </p>

          <button onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card">

        <h1>Quiz Game</h1>
        <p className="subtitle">Test Your Knowledge</p>

        <div className="progress-info">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span>Score: {score}</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        <h2 className="question">
          {question.question}
        </h2>

        <div className="options">
          {question.options.map((option, index) => {
            let optionClass = "";

            if (selectedAnswer !== "") {
              if (option === question.answer) {
                optionClass = "correct";
              } else if (option === selectedAnswer) {
                optionClass = "wrong";
              }
            }

            return (
              <button
                key={index}
                className={`option-btn ${optionClass}`}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== ""}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== "" && (
          <p className="feedback">
            {selectedAnswer === question.answer
              ? "Correct Answer!"
              : `Wrong Answer! Correct answer: ${question.answer}`}
          </p>
        )}

        <button
          className="next-btn"
          onClick={handleNext}
          disabled={selectedAnswer === ""}
        >
          {currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>

      </div>
    </div>
  );
}

export default App;
