import React from "react"
import styled from "styled-components"
import ping from "../../assets/sounds/coin.wav"

const CategoryButton = styled.button`
  border: ${({ category, categoryNum }) => category === categoryNum && "3px solid black"};
`

const DifficultyButton = styled.button`
  border: ${({ difficulty, difficultyLevel }) => difficulty === difficultyLevel && "3px solid black"};
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
  categoryName,
  sound,
  isFinished
}) => {
  return (
    <div>
      {quizStartCountDown >= 5 && isFinished === false && (
        <>
          {" "}
          <div className='categories'>
            <CategoryButton category={category} categoryNum={9} onClick={() => categorySelectHandler(9)}>
              Generel
            </CategoryButton>
            <CategoryButton category={category} categoryNum={23} onClick={() => categorySelectHandler(23)}>
              History
            </CategoryButton>
            <CategoryButton category={category} categoryNum={18} onClick={() => categorySelectHandler(18)}>
              Computer
            </CategoryButton>
            <CategoryButton category={category} categoryNum={11} onClick={() => categorySelectHandler(11)}>
              Film
            </CategoryButton>
            <CategoryButton category={category} categoryNum={10} onClick={() => categorySelectHandler(10)}>
              Books
            </CategoryButton>
            <CategoryButton category={category} categoryNum={25} onClick={() => categorySelectHandler(25)}>
              Art
            </CategoryButton>
            <br />
            <DifficultyButton difficulty={difficulty} difficultyLevel={"easy"} onClick={() => difficultySelectHandler("easy")}>
              Easy
            </DifficultyButton>
            <DifficultyButton difficulty={difficulty} difficultyLevel={"medium"} onClick={() => difficultySelectHandler("medium")}>
              Medium
            </DifficultyButton>
            <DifficultyButton difficulty={difficulty} difficultyLevel={"hard"} onClick={() => difficultySelectHandler("hard")}>
              Hard
            </DifficultyButton>
          </div>
          <form onSubmit={event => inputSubmitHandler(event, history)}>
            {storedName ? (
              <div>
                <p>Hi {storedName}</p> <div onClick={renameHandler}>Rename</div>
              </div>
            ) : (
              <input type='text' onChange={e => inputChangeHandler(e)} />
            )}
            <button>StartQuiz</button>
          </form>
        </>
      )}
      {quizStartCountDown < 5 && isFinished === false && (
        <>
          {sound && quizStartCountDown >= 0 && <audio autoPlay src={ping}></audio>}
          <p>{categoryName}</p>
          <p>{difficulty}</p>
          <h1>Good Luck {storedName ? storedName : name}</h1> <p>{quizStartCountDown <= 0 ? "Ready!" : quizStartCountDown}</p>
        </>
      )}
    </div>
  )
}

export default HomePage
