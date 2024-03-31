import React, { useState, useEffect } from 'react';
import styles from "../../userDash.module.css";

interface Option {
  optionText: string;
  isTrue: boolean;
}

interface QuestionTest {
  questionText: string;
  options: Option[];
  points: number;
  nameTech: string;
}

const DisplayTest: React.FC = () => {
  const [totalTime, setTotalTime] = useState(60);
  const [questions, setQuestions] = useState<QuestionTest[]>([
    {
      questionText: 'What is the capital of France What is the capital of France What is the capital of France ?',
      options: [
        { optionText: 'Paris', isTrue: true },
        { optionText: 'London', isTrue: false },
        { optionText: 'Berlin', isTrue: false },
        { optionText: 'Rome', isTrue: false },
      ],
      points: 3,
      nameTech: 'front-end',
    },
    {
      questionText: 'Which country is known for its tulips?',
      options: [
        { optionText: 'Netlands', isTrue: true },
        { optionText: 'Japan', isTrue: false },
        { optionText: 'Mexico', isTrue: false },
        { optionText: 'Australia', isTrue: false },
      ],
      points: 3,
      nameTech: 'front-end',
    },
    // Add more questions here
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          setShowResult(true);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    shuffleAnswers();
  }, [currentQuestionIndex]);

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const shuffleAnswers = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const allAnswers = currentQuestion.options.map((option) => option.optionText);
    const shuffled = allAnswers.sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = answer;
      return updatedAnswers;
    });
  };

  const score =
    (userAnswers.filter(
      (answer, index) => answer === questions[index].options.find((option) => option.isTrue)?.optionText
    ).length /
      questions.length) *
    100;

  const currentQuestion = questions[currentQuestionIndex];
  const canAnswer = true;

  if (showResult) {
    return (
      <div
        className={styles.containerResultDisplayTest}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      >
        <h2 className={styles.titleResultDisplayTest}>Quiz Result</h2>
        <div className={styles.boxResultDisplayTest}>
          <p className={styles.resultDisplayTest}>Your score: {score.toFixed(2)}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.containerDisplayTest}>
      <h1 className={styles.nameTechDisplayTest}>{currentQuestion.nameTech}</h1>
      <div className={styles.boxDisplayTest}>
        <p>
          {currentQuestionIndex + 1}-{currentQuestion.questionText}
        </p>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {shuffledAnswers.map((answer: string, index: number) => {
            const isChecked = userAnswers[currentQuestionIndex] === answer;
            return (
              <li key={answer} className={styles.optionDisplayTest}>
                <label>
                  <input
                    type="checkbox"
                    value={answer}
                    checked={isChecked}
                    onChange={(e) => handleAnswer(e.target.value)}
                    disabled={!canAnswer}
                  />
                  <span className={styles.checkboxCustom}>{answer}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <div className={styles.buttonDisplayTest}>
          <p>
            Q{currentQuestionIndex + 1}/{questions.length}
          </p>
          {currentQuestionIndex < questions.length - 1 && (
            <button onClick={handleNext}>Next</button>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <button style={{ width: '22%' }} onClick={handleShowResult}>
              Show Result
            </button>
          )}
        </div>
      </div>
      <div className={styles.timerDisplayTest}>
        <p>Time Remaining: {remainingTime} seconds</p>
      </div>
    </div>
  );
};

export default DisplayTest;
