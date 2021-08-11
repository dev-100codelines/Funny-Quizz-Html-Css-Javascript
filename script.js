const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')
const questionContainer = document.getElementById('question-container')
const questiionEle = document.getElementById('question')
const answerBtn = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, score = 0;

startBtn.addEventListener('click', start)
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuiz()
})

function start() {
    startBtn.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    setNextQuiz()
}

function setNextQuiz() {
    reset()
    showQuiz(shuffledQuestions[currentQuestionIndex])
}

function showQuiz(question) {
    questiionEle.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerBtn.appendChild(button)
    })
}

function reset() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtn.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    } else {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [{
        question: 'Alberta is a province of which country?',
        answers: [{ text: 'Santiago', correct: false }, { text: 'Canada', correct: true }, { text: 'Russia', correct: false }, { text: 'America', correct: false }, ]
    },
    {
        question: 'What is the largest country in the world?',
        answers: [{ text: 'France', correct: false }, { text: 'Canada', correct: false }, { text: 'German', correct: false }, { text: 'Russia', correct: true }]
    },
    {
        question: 'Who won the FIFA Womens World Cup in 2019?',
        answers: [{ text: 'Australia', correct: false }, { text: 'USA', correct: true }, { text: 'Netherlands', correct: false }, { text: 'Canada', correct: false }]
    },
    {
        question: 'What is Japanese sake made from?',
        answers: [{ text: 'Potato', correct: false }, { text: 'coconut', correct: false }, { text: 'Rice', correct: true }, { text: 'Tomato', correct: false }]
    },
    {
        question: 'What is David Bowie’s real name?',
        answers: [{ text: 'Matt Cardle', correct: false }, { text: 'Elvis Presley', correct: false }, { text: 'David Evans', correct: false }, { text: 'David Jones', correct: true }]
    },
]