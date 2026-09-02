import React, { useState } from 'react';
import { TRIVIA_QUESTIONS } from '../../data/quizQuestions';

export default function SystemsQuiz({ onToast }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = TRIVIA_QUESTIONS[qIdx];

  function handleSelect(idx) {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    if (idx === currentQ.ans) {
      setScore(s => s + 1);
      onToast(`✓ Correct! ${currentQ.exp}`);
    } else {
      onToast(`✗ Incorrect. ${currentQ.exp}`);
    }
  }

  function handleNext() {
    if (qIdx < TRIVIA_QUESTIONS.length - 1) {
      setQIdx(q => q + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  }

  function handleRestart() {
    setQIdx(0);
    setScore(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setIsFinished(false);
  }

  return (
    <div className="arcade-game-view active">
      <div className="trivia-container">
        {!isFinished ? (
          <>
            <div className="trivia-header">
              <span className="trivia-progress">Question {qIdx + 1} of {TRIVIA_QUESTIONS.length}</span>
              <span className="trivia-score">Score: {score} / {TRIVIA_QUESTIONS.length}</span>
            </div>
            <h3 className="trivia-question">{currentQ.q}</h3>
            <div className="trivia-options">
              {currentQ.opts.map((opt, idx) => {
                let btnClass = 'trivia-opt';
                if (isAnswered) {
                  if (idx === currentQ.ans) btnClass += ' correct';
                  else if (idx === selectedIdx) btnClass += ' incorrect';
                }
                return (
                  <button 
                    key={idx}
                    className={btnClass}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <button className="btn-primary" onClick={handleNext} style={{ marginTop: '1.2rem' }}>
                {qIdx === TRIVIA_QUESTIONS.length - 1 ? '🎉 Finish Quiz' : 'Next Question →'}
              </button>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h3 className="trivia-question">🏆 Quiz Completed! You scored {score} out of {TRIVIA_QUESTIONS.length}!</h3>
            <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: '1.4rem' }}>
              Great job exploring MySQL, ERD architecture, and Systems Analysis fundamentals.
            </p>
            <button className="btn-primary" onClick={handleRestart} style={{ margin: '0 auto' }}>
              🔄 Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
