// Quiz Data
const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        answer: "Delhi"
    },
    {
        question: "Which is the fastest land animal?",
        options: ["Cheetah", "Lion", "Tiger", "Horse"],
        answer: "Cheetah"
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "12", "11", "13"],
        answer: "12"
    }
];

// DOM Elements
const questionEl = document.querySelector(".question");
const optionEls = document.querySelectorAll(".option");
const nextBtn = document.querySelector("#next-btn");
const resultEl = document.querySelector("#result");

let currentQuestion = 0;
let score = 0;

// Load Question
function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionEls.forEach((optionEl, index) => {
        optionEl.textContent = currentQuiz.options[index];
        optionEl.style.backgroundColor = "#222"; // reset color
        optionEl.disabled = false; // enable buttons
    });
    resultEl.textContent = "";
}

// Check Answer
optionEls.forEach(optionEl => {
    optionEl.addEventListener("click", () => {
        const selected = optionEl.textContent;
        if (selected === quizData[currentQuestion].answer) {
            optionEl.style.backgroundColor = "#00f0ff"; // correct
            score++;
        } else {
            optionEl.style.backgroundColor = "#ff0055"; // wrong
        }
        // Disable all options after selection
        optionEls.forEach(opt => opt.disabled = true);
    });
});

// Next Question
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Show Result
function showResult() {
    questionEl.style.display = "none";
    optionEls.forEach(opt => opt.style.display = "none");
    nextBtn.style.display = "none";
    resultEl.textContent = `Your Score: ${score} / ${quizData.length}`;
}

// Initialize Quiz
loadQuestion();
