let questions = [];
let currentQuestion = 0;
let score = 0;

async function loadQuestions() {
    const res = await fetch("question.json");
    questions = await res.json();
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
        btn.onclick = () => checkAnswer(option, btn);
        optionsDiv.appendChild(btn);
    });

    document.getElementById("feedback").innerText = "";
}

function checkAnswer(selected, buttonElement) {
    let correct = questions[currentQuestion].answer;

    if (selected === correct) {
        score++;
        buttonElement.style.background = "green";
        buttonElement.style.color = "white";
        showFeedback("✔ Correct!", "green");
    } else {
        buttonElement.style.background = "red";
        buttonElement.style.color = "white";
        showFeedback("✘ Wrong!", "red");
    }

    disableAllButtons();

    setTimeout(() => {
        currentQuestion++;
        loadNextQuestion();
    }, 1200);
}

function disableAllButtons() {
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.disabled = true;
    });
}

function showFeedback(text, color) {
    let fb = document.getElementById("feedback");
    fb.innerText = text;
    fb.style.color = color;
}

function endQuiz() {
    document.getElementById("quiz-screen").innerHTML = `
        <h1>Quiz Completed</h1>
        <h2>Your Score: ${score}/${questions.length}</h2>
    `;
}
