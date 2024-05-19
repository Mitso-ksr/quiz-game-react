import { useEffect } from "react";
import "./App.scss";
import Score from "./components/Score.tsx";
import Game from "./components/Game.tsx";
import Loader from "./components/FullPageLoader.tsx";
import { useQuiz, Question, QuestionsResponse } from "./QuizContext.tsx";

function App() {
  const { state, dispatch } = useQuiz();
  console.log(state);

  async function fetchQuestion() {
    try {
      dispatch({ type: "setStatus", payload: "fetching" });
      const response = await fetch(
        "https://opentdb.com/api.php?amount=1&category=18",
      );
      const data: QuestionsResponse = await response.json();
      if (data.response_code == 0) {
        const question: Question = data.results[0];
        console.log(question);
        dispatch({ type: "setStatus", payload: "ready" });
      } else {
        dispatch({ type: "setStatus", payload: "error" });
      }
    } catch (err) {
      console.log("error in fetchquestion:", err);
      dispatch({ type: "setStatus", payload: "error" });
    }
  }

  useEffect(() => {
    if (state.gameStatus === "idle") {
      fetchQuestion();
    }
  }, []);

  return (
    <>
      {state.gameStatus === "fetching" ? (
        <Loader />
      ) : state.gameStatus == "error" ? (
        <h4>Error...</h4>
      ) : state.gameStatus == "ready" ? (
        <>
          <Score />
          <Game />
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
