import React from "react"
import styled from "styled-components"
import jokerUsed from "../../../assets/sounds/joker.wav"
import gameStarted from "../../../assets/sounds/gameStarted.wav"

const Container = styled.main`
  margin: 3rem;
  text-align: center;
  .score {
    font-size: 3rem;
  }
`
const StyledQuestion = styled.h2`
  color: blue;
`
const Answer = styled.li`
  color: blue;
  background-color: ${({ ans }) => (ans.isCorrect ? "gray" : "lightblue")};
  border: ${({ ans }) => (ans.isSelected ? "2px solid black" : "none")};
`
const Question = ({
  ques,
  nextQuestion,
  prevQuestion,
  selectAnswerHandler,
  finishQuiz,
  isFinished,
  remainedTime,
  name,
  deleteTwoWrongAnswersHandler,
  wrongAnswersDeleted,
  hintHandler,
  hintCount,
  correctAnswerHandler,
  correctAnswerSelected,
  categoryName,
  difficulty,
  sound,
  history
}) => {
  return (
    <Container>
      <audio autoPlay src={gameStarted}></audio>
      {sound && remainedTime <= 59 && <audio autoPlay src={jokerUsed}></audio>}

      <h2>{name}</h2>
      <p>{categoryName}</p>
      <p>{difficulty}</p>
      <button onClick={() => deleteTwoWrongAnswersHandler(ques.id)} disabled={ques.answers.length < 2 || wrongAnswersDeleted}>
        Delete 2 wrong option
      </button>
      <button onClick={() => hintHandler(ques.id)} disabled={ques.answers.length < 2 || hintCount < 1}>
        Delete one wrong option
      </button>
      <button onClick={() => correctAnswerHandler(ques.id)} disabled={correctAnswerSelected}>
        Choose Correnct Answer
      </button>
      <br />
      <span className='remainedTime'>{remainedTime}</span>

      <StyledQuestion>
        {ques.question
          .replace(/&amp;/g, "&")
          .replace(/&#039;/g, "'")
          .replace(/&shy;/g, " ")
          .replace(/&quot;/g, '"')}
      </StyledQuestion>
      <ul>
        {ques.answers.map(ans => (
          <Answer key={ans.answer} ans={ans} onClick={() => selectAnswerHandler(ques.id, ans.id)}>
            {ans.answer
              .replace(/&amp;/g, "&")
              .replace(/&#039;/g, "'")
              .replace(/&shy;/g, " ")
              .replace(/&quot;/g, '"')}
          </Answer>
        ))}
      </ul>

      <button onClick={prevQuestion}>Previous</button>
      <button onClick={nextQuestion}>Next</button>
      <button onClick={() => finishQuiz(history)}>Finish</button>
    </Container>
  )
}

export default Question
