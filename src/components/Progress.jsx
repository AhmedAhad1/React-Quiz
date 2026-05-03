import React from "react";

const Progress = ({ numQuestions, index, answer, totalpoints, points }) => {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer != null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{totalpoints}
      </p>
    </header>
  );
};

export default Progress;
