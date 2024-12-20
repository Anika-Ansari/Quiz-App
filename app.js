const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markdown Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false },
        ]
    }, {
        question: "Who is making the Web standards?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Mozilla", correct: false },
            { text: "Google", correct: false },
            { text: "The World Wide Web Consortium", correct: true },
        ]
    },
    {
        question: " Which attribute is used to provide a unique identifier to an HTML element?",
        answers: [
            { text: "class", correct: false },
            { text: "id", correct: true },
            { text: "style", correct: false },
            { text: "name", correct: false },
        ]
    }, {
        question: "Which character is used to indicate an end tag?",
        answers: [
            { text: "/", correct: true },
            { text: "<", correct: false },
            { text: "*", correct: false },
            { text: "^", correct: false },
        ]
    }, {
        question: " Which attribute specifies the URL of a link in <a>?",
        answers: [
            { text: "src", correct: false },
            { text: "link", correct: false },
            { text: "url", correct: false },
            { text: "href", correct: true },
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
        question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)

    })
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();

var min = 1;
var sec = 10;

var timer = document.getElementById("timer");

var interval = setInterval(function () {
    timer.innerHTML = `${min} :${sec}`
    sec--
    if (sec < 0) {
        if (min < 1) {
            handleNextButton();
            min = 1;
            sec = 10;
        } else {
            min--
            sec = 10;
        }
    }
}, 1000)

