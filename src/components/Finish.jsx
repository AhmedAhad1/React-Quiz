import React from "react";

const Finish = ({ totalPoints, points, highScore, dispatch }) => {
  const percentage = Math.ceil((points / totalPoints) * 100);

  let emoji;

  if (points === 100) emoji = "👌";
  if (points >= 80 && percentage < 100) emoji = "😊";
  if (points >= 50 && percentage < 80) emoji = "😉";
  if (points >= 0 && percentage < 50) emoji = "😐";
  if (points === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji} You scored {points} out of {totalPoints} ({percentage}%)
      </p>
      <p className="highscore"> High score {highScore} points</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default Finish;
