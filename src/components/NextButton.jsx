import React from "react";

const NextButton = ({ answer, dispatch, index, numQuestions }) => {
  if (answer === null) return;

  return (
    <>
      {index < numQuestions - 1 ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "newQuestion" })}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      )}
    </>
  );
};

export default NextButton;
