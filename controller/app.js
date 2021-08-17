//IMPORT PACKAGES
const express = require('express');
const cors = require('cors');
const gameLogic = require('../controller/logic/gameLogic')
const app = express();
app.use(cors());
// app.use(express.static('views'));
// app.use(express.static("node_modules"));

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container')
let randomQuestions, currentQuestionIndex, correctAnswers
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')

//get questions
app.get('/question', function (req, res) {
    console.log('getting question');
    return function startGame() {
        console.log('game started')
        startButton.classList.add('hide');
        randomQuestions = triviaQuestions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionContainerElement.classList.remove('hide')
        nextQuestion()
        correctAnswers = 0;
    }
})
//get next question
app.get('/next-question', function (req, res) {
    console.log('getting next question');
    return function nextQuestion() {
        resetState()
        showQuestion(randomQuestions[currentQuestionIndex])
        next()
    }
    function resetState() {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtonElement.firstChild) {
            answerButtonElement.removeChild
                (answerButtonElement.firstChild)
        }
        next()
    }
    function showQuestion(question) {
        questionElement.innerText =  question.question
        question.answer.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')
            if(answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click' , selectAnswer)
            answerButtonElement.appendChild(button)
        })
    }
});

//get answers
app.get('/answer', function (req, res) {
    function selectAnswer(e) {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        setStatusClass(document.body, correct)
        Array.from(answerButtonElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
        })
        if(randomQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide') 
        }
        else {
            startButton.innerText = 'Restart'
            startButton.classList.remove('hide')
        }
        
        if(selectedButton.dataset = correct) {
            correctAnswers++;   
        } 
        document.getElementById('correct-answers').innerHTML = correctAnswers;
    }
})



//USED TO CATCH ERRORS
app.use(function (err, req, res, next) {
    //err is an instance of Error class or HTTPError class
    const status = err.status || 500;
    const message = err.message || 'Unknown Error!';

    return res.status(status).json({
        error: message,
    });

})

app.listen(8000, function () {
    console.log('App listening on port 8000')
});


module.exports = app;