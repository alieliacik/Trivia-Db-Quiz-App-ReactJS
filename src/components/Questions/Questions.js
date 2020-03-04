import React from "react"
import styled from "styled-components"
import jokerUsed from "../../assets/sounds/joker.wav"
import gameStarted from "../../assets/sounds/gameStarted.wav"
import { faPooStorm, faLightbulb, faClipboardCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StyledQuestions = styled.section`
  padding: 0 3rem;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1.3rem;

  .questionsHeader {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.7rem;

    &::after {
      content: "";
      position: absolute;
      display: block;
      top: -1rem;
      left: 0;
      width: ${({ remainedTime }) => remainedTime && `${remainedTime}%`};
      height: 5px;
      background-color: ${({ remainedTime }) => (remainedTime > 15 ? "rgba(47, 54, 64, 1)" : "rgba(194, 54, 22, 1)")};
      transition: all 0.2s;
    }

    .questionInformations {
      font-size: 1.3rem;
      letter-spacing: 0.5px;
    }

    .remainedTime {
      font-size: 2.7rem;
      transition: all 0.2s;
      width: 5rem;
      transform: ${({ remainedTime }) => (remainedTime > 15 ? "none" : "scale(1.8) translateX(0.3rem)")};
      color: ${({ remainedTime }) => (remainedTime > 15 ? "black" : "rgba(194, 54, 22,1.0)")};
    }

    .questionJokers {
      display: flex;

      & > button {
        width: 8rem;
        padding: 0.6rem 0;
        border-radius: 5px;
        margin: 0 0.3rem;
        color: white;
        background-color: rgba(194, 54, 22, 1);
        border: none;
        font-family: inherit;
        cursor: pointer;
        transition: all 0.1s;

        &:hover {
          transform: translateY(-1px);
        }

        &:active {
          transform: translateY(-0.5px);
        }
        &:focus {
          outline: none;
        }
        &:disabled {
          opacity: 0.4;
          transform: none;
        }
        & > svg {
          margin-right: 0.2rem;
        }
      }
      .hint {
        position: relative;
        text-align: left;
        padding-left: 1rem;
      }

      .hintCount {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0.3rem;
        right: 0.3rem;
        font-size: 1.2rem;
        display: inline-block;
        text-align: center;
        width: 1.5rem;
        height: 1.5rem;
        padding-top: 0.1rem;
        border-radius: 50%;
        color: rgba(194, 54, 22, 1);
        background-color: rgba(251, 197, 49, 1);
        font-weight: bold;
      }
    }
  }

  .questionContent {
    .question {
      font-size: 2.3rem;
      font-weight: 500;
    }

    .answer {
      position: relative;
      list-style-type: none;
      color: white;
      background-color: rgba(72, 126, 176, 1);
      padding: 1.5rem;
      width: 70%;
      margin: 1rem auto;
      border-radius: 3px;
      border: 1px solid rgba(25, 42, 86, 1);
      cursor: pointer;
      z-index: 1;
      transition: all 0.3s;

      &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 5px;
        z-index: -1;
        background-color: rgba(25, 42, 86, 1);
        transform: scaleY(0);
        transition: transform 0.2s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s;
      }
    }
    .answer:hover::before {
      transform: scaleY(1);
      width: 100%;
    }
  }

  .questionButtons {
    margin-top: auto;
    display: flex;
    justify-content: center;

    & > button {
      width: 15rem;
      padding: 0.8rem;
      margin: 0.8rem;
      font-size: 1.6rem;
      font-family: inherit;
      color: rgba(47, 54, 64, 1);
      font-weight: bold;
      background-color: rgba(251, 197, 49, 1);
      border: 2px solid rgba(47, 54, 64, 1);
      box-shadow: 0 0.75rem 1.5rem rgba(47, 54, 64, 1);
      border-radius: 3px;
      cursor: pointer;
      transition: transform 0.2s, background-color 0.1s;

      &:hover {
        transform: translateY(-3px);
        background-color: rgba(251, 197, 49, 0.8);
      }

      &:active {
        transform: translateY(-1px);
        box-shadow: 0 0.5rem 1rem rgba(47, 54, 64, 1);
        background-color: rgba(251, 197, 49, 0.6);
      }

      &:focus {
        outline: none;
      }

      &:disabled {
        opacity: 0.5;
        transform: none;
      }
    }
  }
`

const Question = ({
  ques,
  nextQuestion,
  prevQuestion,
  selectAnswerHandler,
  finishQuiz,
  remainedTime,
  name,
  deleteTwoWrongAnswersHandler,
  wrongAnswersDeleted,
  hintHandler,
  hintCount,
  correctAnswerHandler,
  correctAnswerSelected,
  sound,
  history,
  currentQuestion
}) => {
  if (window.performance) {
    if (performance.navigation.type === 1) {
      history.push("/")
      window.location.reload()
    }
  }
  return (
    <StyledQuestions remainedTime={remainedTime * 1.666666666}>
      <audio autoPlay src={gameStarted}></audio>
      {sound && remainedTime <= 59 && <audio autoPlay src={jokerUsed}></audio>}
      <div className='questionsHeader'>
        <div className='remainedTime'>{remainedTime}</div>

        <div className='questionInformations'>
          <div className='questionCategory'>Category: {ques.category.includes(":") ? ques.category.split(":")[1] : ques.category}</div>
          <div className='questionsDifficulty'>Difficulty: {ques.difficulty.toUpperCase().slice(0, 1) + ques.difficulty.slice(1)}</div>
        </div>
        <div className='questionJokers'>
          <button className='fiftyfifty' onClick={() => deleteTwoWrongAnswersHandler(ques.id)} disabled={ques.answers.length < 2 || wrongAnswersDeleted}>
            <FontAwesomeIcon icon={faPooStorm} /> 50%
          </button>
          <button className='hint' onClick={() => hintHandler(ques.id)} disabled={ques.answers.length < 2 || hintCount < 1}>
            <FontAwesomeIcon icon={faLightbulb} /> Hint <span className='hintCount'>{hintCount}</span>
          </button>
          <button className='selectCorrectAnswer' onClick={() => correctAnswerHandler(ques.id)} disabled={correctAnswerSelected}>
            <FontAwesomeIcon icon={faClipboardCheck} /> Correct
          </button>
        </div>
      </div>
      <div className='questionContent'>
        <div className='question'>
          {ques.question
            .replace(/&amp;/g, "&")
            .replace(/&#039;/g, "'")
            .replace(/&shy;/g, " ")
            .replace(/&quot;/g, '"')}
        </div>
        <div className='answers'>
          <ul>
            {ques.answers.map(ans => (
              <li className='answer' key={ans.answer} ans={ans} onClick={() => selectAnswerHandler(ques.id, ans.id)}>
                {ans.answer
                  .replace(/&amp;/g, "&")
                  .replace(/&#039;/g, "'")
                  .replace(/&shy;/g, " ")
                  .replace(/&quot;/g, '"')}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='questionButtons'>
        <button onClick={prevQuestion} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={nextQuestion} disabled={currentQuestion === 9}>
          Next
        </button>
        <button onClick={() => finishQuiz(history)}>Finish</button>
      </div>
    </StyledQuestions>
  )
}

export default Question
