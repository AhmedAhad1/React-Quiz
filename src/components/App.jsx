import { useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Tmain from "./Tmain";
import { useEffect } from "react";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Loader from "./Loader";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Footer from "./Footer";
import { Timer } from "./Timer";

const SECONDS_PER_QUES = 1;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUES,
      };

    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "newQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finish",
        highScore:
          state.highScore > state.points ? state.highScore : state.points,
      };

    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;

  const totalpoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);

  return (
    <>
      <div className="app">
        <Header />
        <Tmain>
          {status === "loading" && <Loader />}
          {status === "ready" && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {status === "error" && <Error />}
          {status === "active" && (
            <>
              <Progress
                numQuestions={numQuestions}
                index={index}
                answer={answer}
                totalpoints={totalpoints}
                points={points}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />

              <Footer>
                <NextButton
                  answer={answer}
                  dispatch={dispatch}
                  index={index}
                  numQuestions={numQuestions}
                />
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
              </Footer>
            </>
          )}

          {status === "finish" && (
            <>
              <Finish
                totalPoints={totalpoints}
                points={points}
                highScore={highScore}
                dispatch={dispatch}
              />
            </>
          )}
        </Tmain>
      </div>
    </>
  );
}

export default App;
