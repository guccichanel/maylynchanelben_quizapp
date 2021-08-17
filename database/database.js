const pg = require('pg');
const connectionString = 'postgres://jckyedfltaongm:26de7477ab56be288b9ebb88eeb81dd7adcf9edeb0bb9da48f694eee90307f27@ec2-3-233-100-43.compute-1.amazonaws.com:5432/deuphfdfbj0nlb'
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

//functions
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container')

let randomQuestions, currentQuestionIndex, correctAnswers

const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')

nextButton.addEventListener ('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

startButton.addEventListener('click', startGame)

    function startGame() {
        // console.log('game started')
        startButton.classList.add('hide');
        randomQuestions = triviaQuestions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionContainerElement.classList.remove('hide')
        nextQuestion()
        correctAnswers = 0;
    }

    function nextQuestion() {
        resetState()
        showQuestion(randomQuestions[currentQuestionIndex])
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

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild
        (answerButtonElement.firstChild)
    }
}

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

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

module.exports = class quiz {
    static init() {
        return pool.query(
            `
            DROP TABLE IF EXISTS quiz;
            CREATE TABLE quiz (
             id SERIAL primary key,
             question VARCHAR not null,
             answer1 VARCHAR not null,
             answer2 VARCHAR not null,
             answer3 VARCHAR,
             answer4 VARCHAR
            );
            `
        );
    }

    static create(newGame) {
        const questionContainerElement = document.getElementById('question-container');
        const questionElement = document.getElementById('question');
        const answerButtonElement = document.getElementById('answer-buttons');
        return startGame.showQuestion(questionContainerElement, questionElement, answerButtonElement);
    }
    
    static showQuestion()
}


module.exports.getPool = function () {
    if (!pool) pool = new pg.Pool(DB_CONFIG);
    return pool;
};

module.exports.tearDown = function () {
    return module.exports.getPool().end();
};