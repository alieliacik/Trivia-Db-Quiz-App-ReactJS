import React from "react"
import { faBook, faGlobeAmericas, faHourglassStart, faLaptopCode, faFilm, faVolleyballBall, faBug, faEgg, faBalanceScale, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styled, { keyframes, css } from "styled-components"
import ping from "../../assets/sounds/coin.wav"

const buttonAnimation = keyframes`
  0% {outline: 3px solid black;outline-color:  rgba(39, 60, 117,1.0);}
  45% {outline: 8px solid black;outline-color:  rgba(39, 60, 117,1.0);}
  100% {outline: 6px solid black;outline-color:  rgba(39, 60, 117,1.0);}
`

const StyledHomePage = styled.main`
  color: red;

  .optionHeader {
    font-size: 1.8rem;
    color: rgba(53, 59, 72, 1);
    width: 95%;
    text-align: center;
    border-bottom: 2px solid rgba(53, 59, 72, 1);
    line-height: 0.1rem;
    margin: 2rem auto;

    & > span {
      background: white;
      padding: 0 1rem;
      border: 2px solid rgba(53, 59, 72, 1);
    }
  }

  & > div {
    text-align: center;
  }

  & > div > button {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    padding: 1rem 0;
    margin: 1rem;
    border: 1px solid rgba(39, 60, 117, 1);
    box-shadow: 0 0.6rem 1.2rem rgba(39, 60, 117, 0.6);
    font-family: "Fredoka One", cursive;
    font-size: 1.3rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: white;
      background-color: rgba(39, 60, 117, 1);
    }

    &:focus {
      outline: none;
    }

    & > svg {
      font-size: 3.2rem;
      margin-bottom: 1.4rem;
    }
  }

  .userInformation {
    display: inline-block;
    width: 60%;
    height: 5rem;
    text-align: left;
    padding: 1.3rem;
    color: black;
    background-color: white;
    letter-spacing: 1px;
    box-shadow: 0 0.4rem 0.8rem rgba(53, 59, 72, 0.4);
    font-size: 1.9rem;
    font-weight: bold;

    & > svg {
      color: rgba(39, 60, 117, 1);
      margin-right: 1rem;
      cursor: pointer;
    }
  }

  .inputForm {
    text-align: center;
    padding: 3rem;
    position: relative;
  }

  .input {
    width: 60%;
    display: inline-block;
    height: 5rem;
    padding: 1.3rem;
    margin-left: 2rem;
    border: none;
    box-shadow: 0 0.4rem 0.8rem rgba(53, 59, 72, 0.3);
    font-family: inherit;
    font-size: 1.6rem;
    &:focus {
      outline: none;
    }
  }

  .input:placeholder-shown + .inputLabel {
    top: 41%;
    visibility: hidden;
    opacity: 0;
  }

  .inputLabel {
    position: absolute;
    top: 10%;
    left: 16%;
    font-size: 1.6rem;
    color: black;
    visibility: visible;
    opacity: 1;
    transition: all 0.2s;
  }

  .inputButton {
    height: 5rem;
    border: none;
    color: white;
    background-color: rgba(39, 60, 117, 1);
    clip-path: polygon(100% 0, 100% 38%, 100% 150%, 0 100%, 26% 0);
    box-shadow: 0 0.4rem 0.8rem rgba(53, 59, 72, 0.3);
    padding: 1.3rem 2rem 1.3rem 4rem;
    transform: translateX(-4rem);
    letter-spacing: 2px;
    font-size: 1.7rem;
    font-family: inherit;
    cursor: pointer;
  }

  .quizStartContent {
    height: 60vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: rgba(25, 42, 86, 1);
    font-size: 2.5rem;

    .quizStartCountDown {
      font-size: 20rem;
      font-weight: bold;
      margin-top: 2rem;
    }
    .quizStartReady {
      font-size: 5rem;
      font-weight: bold;
      margin-top: 8rem;
    }
  }
`

const CategoryButton = styled.button`
  color: ${({ category, categoryNum }) => (category === categoryNum ? "white" : "rgba(25, 42, 86, 1)")};
  background-color: ${({ category, categoryNum }) => (category === categoryNum ? "rgba(39, 60, 117,1.0)" : "rgba(251, 197, 49,1.0)")};
  animation: ${({ category, categoryNum }) =>
    category === categoryNum &&
    css`
      ${buttonAnimation} .3s linear
    `};
  animation-fill-mode: forwards;
`

const DifficultyButton = styled.button`
  color: ${({ difficulty, difficultyLevel }) => (difficulty === difficultyLevel ? "white" : "rgba(25, 42, 86, 1)")};
  background-color: ${({ difficulty, difficultyLevel }) => (difficulty === difficultyLevel ? "rgba(39, 60, 117,1.0)" : "rgba(251, 197, 49,1.0)")};
  animation: ${({ difficulty, difficultyLevel }) =>
    difficulty === difficultyLevel &&
    css`
      ${buttonAnimation} .3s linear
    `};
  animation-fill-mode: forwards;
`

const HomePage = ({
  inputSubmitHandler,
  inputChangeHandler,
  history,
  name,
  quizStartCountDown,
  categorySelectHandler,
  difficultySelectHandler,
  category,
  difficulty,
  storedName,
  renameHandler,
  sound,
  isFinished
}) => {
  let inputArea = (
    <div className='inputForm'>
      <input id='name' className='input' type='text' placeholder='Name' autoComplete='off' onChange={e => inputChangeHandler(e)} />
      <label htmlFor='name' className='inputLabel'>
        Name
      </label>
      <button className='inputButton'>START</button>
    </div>
  )
  if (storedName) {
    inputArea = (
      <div className='inputForm'>
        <span className='userInformation'>
          <FontAwesomeIcon icon={faPencilAlt} onClick={renameHandler} />
          {storedName}
        </span>
        <button className='inputButton'>START</button>
      </div>
    )
  }

  let homePageContent = null
  if (quizStartCountDown >= 5 && isFinished === false) {
    homePageContent = (
      <>
        <h2 className='optionHeader'>
          <span>CATEGORIES</span>
        </h2>
        <div className='categoryButtons'>
          <CategoryButton category={category} categoryNum={9} onClick={() => categorySelectHandler(9)}>
            <FontAwesomeIcon icon={faGlobeAmericas} /> General
          </CategoryButton>
          <CategoryButton category={category} categoryNum={23} onClick={() => categorySelectHandler(23)}>
            <FontAwesomeIcon icon={faHourglassStart} /> History
          </CategoryButton>
          <CategoryButton category={category} categoryNum={18} onClick={() => categorySelectHandler(18)}>
            <FontAwesomeIcon icon={faLaptopCode} /> Computer
          </CategoryButton>
          <CategoryButton category={category} categoryNum={11} onClick={() => categorySelectHandler(11)}>
            <FontAwesomeIcon icon={faFilm} /> Film
          </CategoryButton>
          <CategoryButton category={category} categoryNum={10} onClick={() => categorySelectHandler(10)}>
            <FontAwesomeIcon icon={faBook} /> Books
          </CategoryButton>
          <CategoryButton category={category} categoryNum={21} onClick={() => categorySelectHandler(21)}>
            <FontAwesomeIcon icon={faVolleyballBall} /> Sports
          </CategoryButton>
        </div>
        <h2 className='optionHeader'>
          <span>DIFFICULTY</span>
        </h2>
        <div className='difficultyButtons'>
          <DifficultyButton difficulty={difficulty} difficultyLevel={"easy"} onClick={() => difficultySelectHandler("easy")}>
            <FontAwesomeIcon icon={faEgg} /> Easy
          </DifficultyButton>
          <DifficultyButton difficulty={difficulty} difficultyLevel={"medium"} onClick={() => difficultySelectHandler("medium")}>
            <FontAwesomeIcon icon={faBalanceScale} /> Medium
          </DifficultyButton>
          <DifficultyButton difficulty={difficulty} difficultyLevel={"hard"} onClick={() => difficultySelectHandler("hard")}>
            <FontAwesomeIcon icon={faBug} /> Hard
          </DifficultyButton>
        </div>
        <form onSubmit={event => inputSubmitHandler(event, history)}>{inputArea}</form>
      </>
    )
  }

  let quizStartContent = null
  if (quizStartCountDown < 5 && isFinished === false) {
    quizStartContent = (
      <div className='quizStartContent'>
        {sound && quizStartCountDown >= -1 && <audio autoPlay src={ping}></audio>}
        <h1 className='quizStartHeader'>Good Luck {storedName ? storedName : name}!</h1>
        <p className='quizStartCountDown'>{quizStartCountDown >= 0 && quizStartCountDown}</p>
        <p className='quizStartReady'>{quizStartCountDown < 0 && "Ready!"}</p>
      </div>
    )
  }

  return (
    <StyledHomePage>
      {homePageContent}
      {quizStartContent}
    </StyledHomePage>
  )
}

export default HomePage
