const topics = {
    "№1 (Охлаждение и нагрев)": [
        { question: "При нагревании металлического бруска массой 3 кг от 20°C до 30°C потребовалась энергия 12 кДж. Чему равна удельная теплоёмкость вещества бруска? Ответ дайте в Дж/(кг · °C)", answer: "400" },
        { question: "Медное тело при охлаждении на 10°C отдает количество теплоты, равное 12 кДж. Чему равна масса этого тела?", answer: "3" },
        { question: "Какое количество теплоты необходимо затратить, чтобы нагреть кусок льда массой 2 кг от -10°C до температуры плавления? Ответ дайте в кДж.", answer: "42" }
    ],
    ...Object.fromEntries(Array.from({ length: 22 }, (_, i) => [`№${i + 2}`, []])) // Заменили "Раздел" на "№"
};

let currentTopic = null;
let currentQuestion = 0;
let score = 0;

function loadTabs() {
    const tabsContainer = document.getElementById("tabs");
    tabsContainer.innerHTML = Object.keys(topics).map(topic => 
        `<div class='tab' onclick='selectTopic("${topic}")'>${topic}</div>`
    ).join("");
}

function selectTopic(topic) {
    currentTopic = topics[topic];
    currentQuestion = 0;
    score = 0;
    updateScore();
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.toggle("active-tab", tab.innerText === topic);
    });
    loadQuestion();
}

function loadQuestion() {
    if (!currentTopic || currentTopic.length === 0) {
        document.getElementById("question").innerText = "В этом разделе пока нет вопросов.";
        document.getElementById("answer").style.display = "none";
        document.querySelector(".submit-button").style.display = "none";
        document.getElementById("feedback").innerText = "";
        return;
    }
    if (currentQuestion >= currentTopic.length) {
        document.getElementById("question").innerText = "Готово! Хотите начать заново?";
        document.getElementById("answer").style.display = "none";
        document.querySelector(".submit-button").style.display = "none";
        document.getElementById("feedback").innerText = "";
        return;
    }
    document.getElementById("question").innerText = currentTopic[currentQuestion].question;
    document.getElementById("answer").value = "";
    document.getElementById("answer").style.display = "block";
    document.querySelector(".submit-button").style.display = "block";
    document.getElementById("feedback").innerText = "";
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.trim();
    let correctAnswer = currentTopic[currentQuestion].answer;
    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").innerText = "Правильно!";
        document.getElementById("feedback").classList.remove("incorrect");
        document.getElementById("feedback").classList.add("correct");
    } else {
        document.getElementById("feedback").innerText = `Неправильно. Правильный ответ: ${correctAnswer}`;
        document.getElementById("feedback").classList.remove("correct");
        document.getElementById("feedback").classList.add("incorrect");
    }
    currentQuestion++;
    updateScore();
    loadQuestion();
}

function updateScore() {
    document.getElementById("score").innerText = score;
    let percent = currentQuestion > 0 ? ((score / currentQuestion) * 100).toFixed(0) : 0;
    document.getElementById("percent").innerText = `${percent}%`;
}

loadTabs();