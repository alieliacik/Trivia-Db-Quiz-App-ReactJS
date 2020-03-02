import React from "react"
import CountUp from "react-countup"

import gameFinished from "../../assets/sounds/gameFinished.wav"
const QuizSummary = ({ history, isFinished, score }) => {
  return (
    <div>
      <audio autoPlay src={gameFinished}></audio>
      <h1 className='score'>{isFinished && <CountUp end={score} duration={4} />}</h1>

      {
        <button
          onClick={() => {
            history.push("/home-page")
            window.location.reload()
          }}
        >
          Play Again
        </button>
      }
    </div>
  )
}

export default QuizSummary
