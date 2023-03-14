import React, { useState } from 'react';

import QuestionCard from './components/QuestionCard';
import { fetchQuestion, QuestionState } from './Api';
import { Difficulty } from './Api';

const TOTAL_QUESTION = 10;

export type UserAnswer = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);

  const startGame = async () => {
    setLoading(true);
    setGameOver(false);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);

    try {
      const newQuestions = await fetchQuestion(TOTAL_QUESTION, Difficulty.EASY)
      setQuestions(newQuestions);
      setLoading(false);

    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      const userAnswer = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, userAnswer]);
    }
  }

  const nextQuestion = () => {
    if(number === TOTAL_QUESTION - 1) {
      setGameOver(true);
    } else {
      setNumber(prev => prev + 1);
    }
  }
  
  return (
    <div className='App'>
      <h1>Quiz App</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ? (
        <button onClick={startGame} className='start-btn'>Start</button>
      ) : null}
      {!gameOver && <p className='score'>Score: {score}</p>}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTION}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callBack={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
        <button className='next-btn' onClick={nextQuestion}>Next Question</button>
      ) : null}
    </div>
  );
}

export default App;
