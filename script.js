let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let correctSound = new Audio("correct.mp3");
let wrongSound = new Audio("wrong.mp3");

// Load questions from JSON
async function startGame(level) {
    document.getElementById("level-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");

    let res = await fetch("questions.json");
    let data = await res.json();

    questions = data[level];  // load selected level questions
    currentQuestion = 0;
    score = 0;

    loadQuestion();
    startTimer();
}

function loadQuestion() {
    let q = questions[currentQuestion];

    document.getElementById("question").innerText = q.question;

    let optionsHTML = "";
    q.options.forEach((opt, index) => {
        optionsHTML += `<button class="option btn" onclick="checkAnswer(${index})">${opt}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

function checkAnswer(selected) {
    let correct = questions[currentQuestion].answer;

    if (selected === correct) {
        score++;
        correctSound.play();
    } else {
        wrongSound.play();
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
        resetTimer();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timeLeft = 15;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
                resetTimer();
            } else {
                endQuiz();
            }
        }

    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    document.getElementById("score").innerText = score;
}

