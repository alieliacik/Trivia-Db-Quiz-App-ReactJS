import React, { useState } from "react"
import CountUp from "react-countup"
import styled from "styled-components"
import gameFinished from "../../assets/sounds/gameFinished.wav"

const StyledAnswers = styled.li`
  background-color: ${props => props.ans.isSelected && "grey"};
  background-color: ${props => props.ans.isCorrect && "yellow"};
  background-color: ${props => props.ans.isCorrect && props.ans.isSelected && "blue"};
`

const QuizSummary = ({ history, isFinished, score, questions }) => {
  const [toggleSummary, setToggleSummary] = useState(false)

  if (window.performance) {
    if (performance.navigation.type === 1) {
      history.push("/")
      window.location.reload()
    }
  }
  return (
    <div>
      <audio autoPlay src={gameFinished}></audio>
      <h1 className='score'>{isFinished && <CountUp end={score} duration={4} />}</h1>

      {
        <button
          onClick={() => {
            history.push("/")
            window.location.reload()
          }}
        >
          Play Again
        </button>
      }
      <br />
      <button onClick={() => setToggleSummary(prevState => !prevState)}>{toggleSummary ? "Close" : "Show Questions & Answers"} </button>
      {toggleSummary && (
        <div>
          {questions.map(ques => (
            <div key={ques.id}>
              <h3>
                {ques.question
                  .replace(/&amp;/g, "&")
                  .replace(/&#039;/g, "'")
                  .replace(/&shy;/g, " ")
                  .replace(/&quot;/g, '"')}
              </h3>
              <ul>
                {ques.answers.map(ans => (
                  <StyledAnswers ans={ans} key={ans.answer}>
                    {ans.answer
                      .replace(/&amp;/g, "&")
                      .replace(/&#039;/g, "'")
                      .replace(/&shy;/g, " ")
                      .replace(/&quot;/g, '"')}
                  </StyledAnswers>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default QuizSummary
