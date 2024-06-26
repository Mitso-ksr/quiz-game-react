import { useEffect, useState } from "react";
import "./App.scss";
import Score from "./components/Score.tsx";
import Game from "./components/Game.tsx";
import Loader from "./components/FullPageLoader.tsx";
import { useQuiz, Question, QuestionsResponse } from "./QuizContext.tsx";

function App() {
  const { state, dispatch } = useQuiz();
  const [error , setError] = useState("");


  async function fetchQuestion() {
    try {
      dispatch({ type: "setStatus", payload: "fetching" });
      dispatch({type:"setUserAnswer", payload: null})
      const response = await fetch(
        "https://opentdb.com/api.php?amount=1&category=18",
      );
      const data: QuestionsResponse = await response.json();
      if (data.response_code == 0) {
        const question: Question = data.results[0];
        const randomIndex = Math.round(Math.random() * question.incorrect_answers.length)
        question.incorrect_answers.splice(randomIndex, 0, question.correct_answer)
        //set the context with the question
        dispatch({type:'setQuestion', payload: question})
        dispatch({ type: "setStatus", payload: "ready" });
      } else {
        dispatch({ type: "setStatus", payload: "error" });
        setError("Fetching from Open Trivia API failed, Please refresh the page")
      }
    } catch (err:any) {
      setError(err.message)
      dispatch({ type: "setStatus", payload: "error" });
    }
  }

  useEffect(() => {
    if (state.gameStatus === "idle") {
      fetchQuestion();
    }
  })

  return (
    <>
      {state.gameStatus === "fetching" ? (
        <Loader />
      ) : state.gameStatus == "error" ? (
        <h1 style={{
          "textAlign" : 'center'
        }}>Error: {error}</h1>
      ) :  (
        <>
        
          <Score />
          <Game />
        </>
      )
        }
    </>
  );
}

export default App;
