import React, { useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions, setQuestions] = useState(quiz);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing' or 'finished'
  
  // Find the current question object
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  function handleQuestionAnswered(isCorrect) {
    // Update score if answer was correct
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question or end game
    if (currentQuestionId < questions.length) {
      setCurrentQuestionId(currentQuestionId + 1);
    } else {
      setGameStatus("finished");
    }
  }

  function restartGame() {
    setCurrentQuestionId(1);
    setScore(0);
    setGameStatus("playing");
  }

  return (
    <main>
      <section>
        {gameStatus === "finished" ? (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}/{questions.length}</h2>
            <button onClick={restartGame}>Play Again</button>
          </>
        ) : currentQuestion ? (
          <>
            <div className="progress">
              Question {currentQuestionId} of {questions.length} | Score: {score}
            </div>
            <Question
              question={currentQuestion}
              onAnswered={handleQuestionAnswered}
              key={currentQuestionId} // Important for resetting timer
            />
          </>
        ) : (
          <div>Loading questions...</div>
        )}
      </section>
    </main>
  );
}

export default App;
