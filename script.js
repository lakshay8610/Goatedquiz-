let questions = [];
let currentQuestion = 0;
let score = 0;
let timerInterval;

async function loadQuestions() {
    const response = await fetch("question.json");
    questions = await response.json();
}

function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    currentQuestion = 0;
    score = 0;

    loadNextQuestion();
}

function loadNextQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    let q = questions[currentQuestion];

    document.getElementById("question").innerText = q.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        let btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(btn);
    });

    document.getElementById("feedback").innerText = "";
    startTimer();
}

function checkAnswer(selected) {
    let correct = questions[currentQuestion].answer;

    if (selected === correct) {
        score++;
        showFeedback("Correct!", "green");
    } else {
        showFeedback("Wrong! Correct answer: " + correct, "red");
    }

    currentQuestion++;

    setTimeout(() => {
        loadNextQuestion();
    }, 1200);
}

function showFeedback(text, color) {
    let fb = document.getElementById("feedback");
    fb.innerText = text;
    fb.style.color = color;
}

function startTimer() {
    let timeLeft = 15;
    document.getElementById("timer").innerText = timeLeft;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer("no answer");
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quiz-screen").innerHTML = `
        <h1>Quiz Complete!</h1>
        <h2>Your Score: ${score}/${questions.length}</h2>
    `;
}
