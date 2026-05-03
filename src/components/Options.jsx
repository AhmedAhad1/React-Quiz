import React from "react";

const Options = ({ question, dispatch, answer }) => {
  const hasAnswerd = answer != null;
  return (
    <div className="options">
      {question.options.map((item, index) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswerd ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          key={item}
          disabled={hasAnswerd}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Options;
