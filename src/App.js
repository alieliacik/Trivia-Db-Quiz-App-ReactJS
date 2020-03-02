import React, { useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import Question from "./components/Questions/Question/Question"
import HomePage from "./components/HomePage/HomePage"

import axios from "axios"
import QuizSummary from "./components/QuizSummary/QuizSummary"

const App = () => {
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [remainedTime, setRemainedTime] = useState(67)
  const [inputValue, setInputValue] = useState("")
  const [name, setName] = useState(null)
  const [storedName, setStoredName] = useState(null)
  const [wrongAnswersDeleted, setWrongAnswersDeleted] = useState(false)
  const [hintCount, setHintCount] = useState(5)
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false)
  const [quizStartCountDown, setQuizStartCountDown] = useState(5)
  const [category, setCategory] = useState(9)
  const [difficulty, setDifficulty] = useState("easy")
  const [sound, setSound] = useState(false)

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then(response => {
        const handleQuestions = response.data.results.map((ques, index) => {
          const correctAnswer = ques.correct_answer
          const answers = ques.incorrect_answers
          const answerIndex = Math.floor(Math.random() * 4)
          answers.splice(answerIndex, 0, correctAnswer)

          const modifyAnswers = answers.map((ans, index) => {
            if (ans === ques.correct_answer) {
              return { id: index, answer: ans, isSelected: false, isCorrect: true }
            } else {
              return { id: index, answer: ans, isSelected: false, isCorrect: false }
            }
          })
          return {
            id: index,
            question: ques.question,
            answers: modifyAnswers,
            difficulty: ques.difficulty
          }
        })
        setQuestions(handleQuestions)
      })
      .catch(err => {
        setError(true)
      })
  }, [category, difficulty])

  useEffect(() => {
    if (window.localStorage.getItem("name")) {
      setStoredName(window.localStorage.getItem("name"))
    }
  }, [storedName])

  const selectAnswerHandler = (questionId, answerId) => {
    playSound(300)
    const cloneQuestions = [...questions]
    const cloneQuestion = cloneQuestions[questionId]
    const cloneAnswers = [...cloneQuestion.answers]

    const updatedAnswers = cloneAnswers.map(ans => {
      if (answerId === ans.id) {
        return { ...ans, isSelected: true }
      } else {
        return { ...ans, isSelected: false }
      }
    })

    cloneQuestion.answers = updatedAnswers
    cloneQuestions[questionId] = cloneQuestion
    setQuestions(cloneQuestions)
  }

  const deleteTwoWrongAnswersHandler = questionId => {
    const cloneQuestions = [...questions]
    const cloneQuestion = cloneQuestions[questionId]
    const cloneAnswers = [...cloneQuestion.answers]
    const wrongAnswers = cloneAnswers.filter(ans => ans.isCorrect !== true)
    if (wrongAnswers.length > 1) {
      const firstRemovedWrongAnswer = wrongAnswers.splice(Math.floor(Math.random() * 2), 1)
      const secondRemovedWrongAnswer = wrongAnswers.splice(Math.floor(Math.random() * 1), 1)
      const updatedAnswers = cloneAnswers.filter(ans => ans.id !== firstRemovedWrongAnswer[0].id && ans.id !== secondRemovedWrongAnswer[0].id)
      cloneQuestion.answers = updatedAnswers
      cloneQuestions[questionId] = cloneQuestion
      setQuestions(cloneQuestions)
    } else {
      const updatedAnswers = cloneAnswers.filter(ans => ans.isCorrect === true)
      cloneQuestion.answers = updatedAnswers
      cloneQuestions[questionId] = cloneQuestion
      setQuestions(cloneQuestions)
    }
    setWrongAnswersDeleted(true)
    playSound(300)
  }

  const playSound = duration => {
    setSound(true)
    setTimeout(() => {
      setSound(false)
    }, duration)
  }

  const hintHandler = questionId => {
    const cloneQuestions = [...questions]
    const cloneQuestion = cloneQuestions[questionId]
    const cloneAnswers = [...cloneQuestion.answers]
    const wrongAnswers = cloneAnswers.filter(ans => ans.isCorrect !== true)
    const removedWrongAnswer = wrongAnswers.splice(Math.floor(Math.random() * cloneAnswers.length - 1), 1)
    const updatedAnswers = cloneAnswers.filter(ans => ans.id !== removedWrongAnswer[0].id)
    cloneQuestion.answers = updatedAnswers
    cloneQuestions[questionId] = cloneQuestion
    setQuestions(cloneQuestions)
    setHintCount(prevState => prevState - 1)
    playSound(300)
  }

  const correctAnswerHandler = questionId => {
    const cloneQuestions = [...questions]
    const cloneQuestion = cloneQuestions[questionId]
    const cloneAnswers = [...cloneQuestion.answers]
    if (cloneAnswers.length > 1) {
      const updatedAnswers = cloneAnswers.map(ans => {
        if (ans.isCorrect === true) {
          return { ...ans, isSelected: true }
        } else {
          return { ...ans, isSelected: false }
        }
      })
      cloneQuestion.answers = updatedAnswers
      cloneQuestions[questionId] = cloneQuestion
      setQuestions(cloneQuestions)
      setCorrectAnswerSelected(true)
    } else {
      alert("There is just one option")
    }
    playSound(300)
  }

  const nextQuestion = () => {
    if (currentQuestion < 9) setCurrentQuestion(prevState => prevState + 1)
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(prevState => prevState - 1)
  }

  const finishQuiz = history => {
    setIsFinished(true)
    playSound(4000)
    history.push("/quiz-summary")
    return questions.map(ques => ques.answers.map(ans => (ans.isCorrect === true && ans.isSelected === true ? setScore(prevState => (prevState += 10)) : null)))
  }

  const inputChangeHandler = event => setInputValue(event.target.value)

  const inputSubmitHandler = (event, history) => {
    event.preventDefault()
    if (inputValue.trim() !== "" || storedName) {
      setName(inputValue)
      const quizTimeinterval = setInterval(() => {
        setRemainedTime(prevState => prevState - 1)
      }, 1000)

      setTimeout(() => {
        clearInterval(quizTimeinterval)
        setIsFinished(true)
        finishQuiz()
      }, 67000)
      const quizStartInterval = setInterval(() => {
        setQuizStartCountDown(prevState => prevState - 1)

        if (quizStartCountDown > 0) {
          playSound(300)
        }
        playSound(300)
      }, 1000)

      setTimeout(() => {
        history.push("/questions")
        clearInterval(quizStartInterval)
      }, 7000)
      if (!storedName) {
        window.localStorage.setItem("name", inputValue)
        setStoredName(window.localStorage.getItem("name"))
      }
    } else {
      alert("please enter valid name")
    }
  }

  const categorySelectHandler = category => {
    setCategory(category)
  }

  const difficultySelectHandler = difficulty => {
    setDifficulty(difficulty)
  }

  const renameHandler = () => {
    window.localStorage.removeItem("name")
    setStoredName(null)
  }

  let categoryName = null
  if (category === 9) categoryName = "General Knowledge"
  else if (category === 10) categoryName = "Books"
  else if (category === 11) categoryName = "Film"
  else if (category === 18) categoryName = "Computer Science"
  else if (category === 23) categoryName = "History"
  else categoryName = "Art"
  return (
    <div style={{ textAlign: "center" }}>
      <Switch>
        <Route
          path='/home-page'
          render={({ history }) => (
            <HomePage
              inputSubmitHandler={inputSubmitHandler}
              inputChangeHandler={inputChangeHandler}
              history={history}
              name={name}
              quizStartCountDown={quizStartCountDown}
              categorySelectHandler={categorySelectHandler}
              difficultySelectHandler={difficultySelectHandler}
              category={category}
              difficulty={difficulty}
              storedName={storedName}
              renameHandler={renameHandler}
              categoryName={categoryName}
              sound={sound}
              isFinished={isFinished}
            />
          )}
        />
        <Route
          path='/questions'
          render={({ history }) =>
            questions.length && (
              <Question
                ques={questions[currentQuestion]}
                nextQuestion={nextQuestion}
                prevQuestion={prevQuestion}
                finishQuiz={finishQuiz}
                isFinished={isFinished}
                selectAnswerHandler={selectAnswerHandler}
                remainedTime={remainedTime}
                name={name}
                history={history}
                deleteTwoWrongAnswersHandler={deleteTwoWrongAnswersHandler}
                wrongAnswersDeleted={wrongAnswersDeleted}
                hintHandler={hintHandler}
                hintCount={hintCount}
                correctAnswerHandler={correctAnswerHandler}
                correctAnswerSelected={correctAnswerSelected}
                categoryName={categoryName}
                difficulty={difficulty}
                sound={sound}
              />
            )
          }
        />

        <Route to='/quiz-summary' render={({ history }) => <QuizSummary history={history} isFinished={isFinite} score={score} />} />
      </Switch>
    </div>
  )
}

export default App
