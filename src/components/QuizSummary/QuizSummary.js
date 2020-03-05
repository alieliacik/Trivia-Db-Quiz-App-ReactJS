import React, { useState } from "react"
import CountUp from "react-countup"
import styled from "styled-components"
import gameFinished from "../../assets/sounds/gameFinished.wav"
import { faSyncAlt, faChevronDown, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StyledQuizSummary = styled.section`
  .score {
    text-align: center;

    font-size: 20rem;
    color: rgba(194, 54, 22, 1);

    & > span:not(:first-child) {
      font-size: 2rem;
      margin-left: -5rem;
    }
  }
  .summaryButtons {
    text-align: center;

    .summaryButton {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 1rem 1rem;
      width: 15rem;
      font-family: inherit;
      font-size: 1.6rem;
      letter-spacing: 1px;
      margin: 0 1rem;
      color: white;
      background-color: rgba(25, 42, 86, 1);
      border: none;
      box-shadow: 0 0.5rem 1rem rgba(25, 42, 86, 1);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.8;
      }

      &:focus {
        outline: none;
      }
    }

    .summaryIcons {
      margin-right: 1rem;
      font-size: 2rem;
      transition: all 0.6s;
    }
  }
  .summaryButton:hover .summaryIcons {
    transform: rotate(360deg);
    @media (max-width: 43.75em) {
      transform: rotate(180deg);
    }
  }

  .questionsSumamry {
    text-align: left;
    padding: 2rem;
  }

  .questionSummary {
    font-size: 2rem;
    padding-top: 0.6rem;
    border-top: 2px solid rgba(25, 42, 86, 1);

    &:not(:first-child) {
      margin-bottom: 1rem;
    }
  }

  .questionSummaryHeader {
    font-size: 2rem;
  }

  .stats {
    width: 24rem;
    font-size: 1.6rem;
    margin: 1rem auto;
    & > p {
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      border-bottom: 1px solid rgba(47, 54, 64, 0.5);
    }
  }
`
const AnswerSummary = styled.li`
  display: flex;
  justify-content: space-between;
  list-style: none;
  font-size: 1.6rem;
  margin-left: 2.3rem;
  padding: 0.7rem 1rem;
  width: 40rem;
  background-color: ${props => (props.ans.isSelected ? (props.ans.isCorrect ? "rgba(251, 197, 49,1.0)" : "rgba(194, 54, 22,1.0)") : props.ans.isCorrect && "rgba(25, 42, 86,1.0)")};
  color: ${props => (props.ans.isSelected ? (props.ans.isCorrect ? "black" : "white") : props.ans.isCorrect && "white")};

  &:last-child {
    margin-bottom: 1rem;
  }
`

const QuizSummary = ({ history, isFinished, score, questions, wrongAnswersDeleted, correctAnswerSelected, hintCount }) => {
  const [toggleStats, setToggleStats] = useState(false)

  if (window.performance) {
    if (performance.navigation.type === 1) {
      history.push("/")
      window.location.reload()
    }
  }

  let answeredQuestions = null
  const answerChecker = [...questions].map(ques => ques.answers.map(ans => ans.isSelected && answeredQuestions++))

  const toggleStatsHandler = () => {
    setToggleStats(prevStats => !prevStats)
  }

  const homePagePushHandler = () => {
    history.push("/")
    window.location.reload()
  }

  let stats = null
  if (toggleStats) {
    stats = (
      <div className='questionsSumamry'>
        <div className='stats'>
          <p>
            <span>Correct Answer:</span> <span>{score / 10}</span>
          </p>
          <p>
            <span>Wrong Answer:</span> <span>{10 - score / 10 - (10 - answeredQuestions)}</span>
          </p>
          <p>
            <span>Unanswered Questions:</span> <span>{10 - answeredQuestions}</span>
          </p>
          <p>
            <span>'Two' Lifeline:</span> <span>{wrongAnswersDeleted ? "1" : "-"}</span>
          </p>
          <p>
            <span>Hint Lifeline:</span> <span>{3 - hintCount === 0 ? "-" : 3 - hintCount}</span>
          </p>
          <p>
            <span>Correct Answer Lifeline:</span> <span>{correctAnswerSelected ? "1" : "-"}</span>
          </p>
        </div>
        <h1 className='questionSummaryHeader'>Questions</h1>
        {questions.map(ques => (
          <React.Fragment key={ques.id}>
            <h3 className='questionSummary'>
              {ques.id + 1}-){" "}
              {ques.question
                .replace(/&amp;/g, "&")
                .replace(/&#039;/g, "'")
                .replace(/&shy;/g, " ")
                .replace(/&quot;/g, '"')}
            </h3>
            <ul>
              {ques.answers.map(
                ans =>
                  (ans.isSelected || ans.isCorrect) && (
                    <AnswerSummary ans={ans} key={ans.answer}>
                      {ans.answer
                        .replace(/&amp;/g, "&")
                        .replace(/&#039;/g, "'")
                        .replace(/&shy;/g, " ")
                        .replace(/&quot;/g, '"')}
                      {ans.isSelected ? ans.isCorrect ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} /> : ans.isCorrect && <FontAwesomeIcon icon={faCheck} />}
                    </AnswerSummary>
                  )
              )}
            </ul>
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <StyledQuizSummary toggleStats={toggleStats}>
      <audio autoPlay src={gameFinished}></audio>
      <h1 className='score'>
        {isFinished && <CountUp end={score} duration={4} />} <span>/100</span>
      </h1>

      <div className='summaryButtons'>
        <button className='summaryButton' onClick={toggleStatsHandler}>
          <FontAwesomeIcon className='summaryIcons' icon={faChevronDown} /> Stats
        </button>
        <button className='summaryButton' onClick={homePagePushHandler}>
          <FontAwesomeIcon className='summaryIcons' icon={faSyncAlt} /> Play Again
        </button>
      </div>
      {stats}
    </StyledQuizSummary>
  )
}

export default QuizSummary
