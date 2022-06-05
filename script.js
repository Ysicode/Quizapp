
let currentCategory = 0;
let category = '';
let currentQuestion = 0;
let correctAnswers = 0;
let successAudio = new Audio('audio/success.mp3');
let wrongAudio = new Audio('audio/wrong.mp3');

function toggleMobileMenu() {
    document.getElementById('sidebar').classList.toggle('hide_mobile');
}

function showStart() {
    let removeClass = document.getElementsByClassName('nav_link');
    for (let i = 0; i < removeClass.length; i++) {
        removeClass[i].classList.remove('active');
    }
    document.getElementById('quiz_start').classList.remove('d-none');
    document.getElementById('quiz_card').classList.add('d-none');
    document.getElementById('quiz_end').classList.add('d-none');
    currentQuestion = 0;
    correctAnswers = 0;
    resetAnswers();
}

function choiceGame(number, id) {
    let removeClass = document.getElementsByClassName('nav_link');
    for (let i = 0; i < removeClass.length; i++) {
        removeClass[i].classList.remove('active');
    }
    document.getElementById(id).classList.add('active');
    document.getElementById('quiz_start').classList.add('d-none');
    category = id;
    currentCategory = number;
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
    toggleMobileMenu();
    resetAnswers();
}

function changeKidsLayout() {
    document.getElementById('quiz_card').style.background = 'linear-gradient(0deg, #f05f6d 10%, rgb(244, 208, 63) 57%, rgb(92 150 189), rgb(72, 201, 176))';
    document.getElementById('progress').style.background = 'rgb(75 190 181)';
}

function checkIfKidsMenu() {
    if (category.includes('kids')) {
        changeKidsLayout();
    } else {
        document.getElementById('quiz_card').style.background = '#d1cccc';
        document.getElementById('progress').style.background = '#d1cccc';
    }
}

function showQuestion() {
    checkIfKidsMenu();
    if (currentQuestion >= questions[currentCategory][category].length) {
        showScore();    
    } else {
        showNextAnswer();
        UpdateProgressBar()
    }
}

function showScore() {
    document.getElementById('all_questions').innerHTML = questions[currentCategory][category].length;
    document.getElementById('quiz_card').classList.add('d-none');
    document.getElementById('quiz_end').classList.remove('d-none');
    document.getElementById('score').innerHTML = correctAnswers;
    document.getElementById('total_questions').innerHTML = questions[currentCategory][category].length;
}

function showNextAnswer() {
    document.getElementById('quiz_card').classList.remove('d-none');
    document.getElementById('quiz_start').classList.add('d-none');

    let question = questions[currentCategory][category][currentQuestion];
    document.getElementById('all_questions').innerHTML = questions[currentCategory][category].length;
    document.getElementById('question').innerHTML = question["question"];
    document.getElementById('answer1').innerHTML = question.answer[0]["answer1"];
    document.getElementById('answer2').innerHTML = question.answer[1]["answer2"];
    document.getElementById('answer3').innerHTML = question.answer[2]["answer3"];
    document.getElementById('answer4').innerHTML = question.answer[3]["answer4"];
    document.getElementById('questions_count').innerHTML = currentQuestion + 1;
}

function UpdateProgressBar() { //shows progressbar on top of page
    let percent = currentQuestion / questions[currentCategory][category].length;
    percent = Math.round(percent * 100);
    document.getElementById('progress_count').innerHTML = `${percent}%`;
    document.getElementById('progress_bar').style.width = `${percent}%`;
    document.getElementById('quiz_end').classList.add('d-none');
}


function answer(id) {
    let question = questions[currentCategory][category][currentQuestion];
    if (id.slice(-1) == question.correct_answer) {
        correctAnswer(id);
    } else {
       wrongAnswer(question, id);
    }
    document.getElementById('next_button').disabled = false;
    document.getElementById('answer_overlay').classList.remove('d-none');
}

function correctAnswer(id) {
    document.getElementById(`box_${id}`).style.background = '#52BE80';
    document.getElementById(`letter_${id}`).style.background = '#7DCEA0';
    correctAnswers++;
    successAudio.play();
}

function wrongAnswer(question, id) {
    document.getElementById(`box_${id}`).style.background = '#E74C3C';
    document.getElementById(`letter_${id}`).style.background = '#EC7063';
    document.getElementById(`box_answer${question.correct_answer}`).style.background = '#52BE80';
    document.getElementById(`letter_answer${question.correct_answer}`).style.background = '#7DCEA0';
    wrongAudio.play();
}


function nextQuestion() {
    currentQuestion++;
    showQuestion(currentCategory, category);
    document.getElementById('next_button').disabled = true;
    resetAnswers();
}

function resetAnswers() {
    Array.from(document.getElementsByClassName('answer_box')).forEach(
        function (element) {
            element.style.background = 'white';
        }
    );
    Array.from(document.getElementsByClassName('abcd')).forEach(
        function (element) {
            element.style.background = '#c7b39c';
        }
    );
    document.getElementById('answer_overlay').classList.add('d-none');
}

function newGame() {
    document.getElementById('quiz_end').classList.add('d-none');
    document.getElementById('quiz_card').classList.remove('d-none');
    document.getElementById('progress_bar').style.width = `0%`;
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}









