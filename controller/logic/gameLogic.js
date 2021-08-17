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

const triviaQuestions = [
    {
        question:"What does “www” stand for in a website browser?",
        answer: [
            {text: 'World Wide Web', correct: true},
            {text: 'World Peace', correct: false}
        ]
    },

    {
        question:"How long is an Olympic swimming pool (in meters)?",
        answer: [
            {text: '100m', correct: false},
            {text: '25m', correct: false},
            {text: '50m', correct: true},
            {text: '400m', correct: false},


        ]
    },

    {
        question:"Which country do cities of Perth, Adelade & Brisbane belong to?",
        answer: [
            {text: 'Australia', correct: true},
            {text: 'New Zealand', correct: false},
            {text: 'United States of America', correct: false},
            {text: 'None of The Above', correct: false},


        ]
    },

    {
        question:"What geometric shape is generally used for stop signs?",
        answer: [
            {text: 'square', correct: false},
            {text: 'rectangle', correct: false},
            {text: 'octagon', correct: true},
            {text: 'circle', correct: false},


        ]
    },

    {
        question:"How many languages are written from right to left?",
        answer: [
            {text: '100', correct: false},
            {text: '12', correct: true},
            {text: '75', correct: false},
            {text: '48', correct: false},


        ]
    },

    {
        question:"What is the name of the biggest technology company in South Korea?",
        answer: [
            {text: 'Samsung', correct: true},
            {text: 'BTS', correct: false},
            {text: 'LQ', correct: false},
            {text: 'Apple', correct: false},


        ]
    },

    {
        question:"Who was the first woman to win a Nobel Prize (in 1903)?",
        answer: [
            {text: 'Marie Curie', correct: true},
            {text: 'Mother Teresa', correct: false},
            {text: 'Malala Yousafzai', correct: false},
            {text: 'Jane Adams', correct: false},


        ]
    },

    {
        question:"What is the name of the largest ocean on earth?",
        answer: [
            {text: 'Indian Ocean', correct: false},
            {text: 'Pacific Ocean', correct: true},
            {text: 'Arctic Ocean', correct: false},
            {text: 'Atlantic', correct: false},


        ]
    },

    {
        question:"Demolition of the Berlin wall separating East and West Germany began in what year?",
        answer: [
            {text: '1989', correct: true},
            {text: '1970', correct: false},
            {text: '1995', correct: false},
            {text: '1962', correct: false},


        ]
    },

    {
        question:"Who was the first woman pilot to fly solo across the Atlantic??",
        answer: [
            {text: 'The Wright Brothers', correct: false},
            {text: 'Amelia Earhart', correct: true}


        ]
    },
]