let questions = [
    {
        "question": "Wann wurde Google gegründet?",
        "answer1": "1995",
        "answer2": "1990",
        "answer3": "1998",
        "answer4": "2001",
        "correct_answer": 3
    },
    {
        "question": "Wer war der erste Mensch auf dem Mond?",
        "answer1": "Neil Armstrong",
        "answer2": "Lance Armstrong",
        "answer3": "Luis Armstrong",
        "answer4": "Billy Armstrong",
        "correct_answer": 1
    },
    {
        "question": "Wie alt ist unsere Erde?",
        "answer1": "3,7 Mrd Jahre",
        "answer2": "4,1 Mrd Jahre",
        "answer3": "3,5 Mrd Jahre",
        "answer4": "4,5 Mrd Jahre",
        "correct_answer": 4
    },
    {
        "question": "Wer hat das Auto erfunden?",
        "answer1": "Wilhelm Maybach",
        "answer2": "Carl Benz",
        "answer3": "Gottlieb Daimler",
        "answer4": "Ewald Mercedes",
        "correct_answer": 2
    },
    {
        "question": "Wieviel Einwohner hat Deutschland 2022?",
        "answer1": "80,1 Millionen",
        "answer2": "85,7 Millionen",
        "answer3": "91,3 Millionen",
        "answer4": "83,3 Millionen",
        "correct_answer": 4
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let successAudio = new Audio('audio/success.mp3');
let wrongAudio = new Audio('audio/wrong.mp3');

function init() {
    document.getElementById('all_questions').innerHTML = questions.length;
}

function choiceGame(id) {
    let removeClass = document.getElementsByClassName('nav_link');
    for (let i = 0; i < removeClass.length; i++) {
        removeClass[i].classList.remove('active');
    }
    document.getElementById(id).classList.add('active');
    document.getElementById('quiz_start').classList.add('d-none');
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById('quiz_card').classList.add('d-none');
        document.getElementById('quiz_end').classList.remove('d-none');     
        document.getElementById('score').innerHTML = correctAnswers;
        document.getElementById('total_questions').innerHTML = questions.length;
    } else {
        let question = questions[currentQuestion];
        document.getElementById('quiz_card').classList.remove('d-none');
        document.getElementById('question').innerHTML = question["question"];
        document.getElementById('answer1').innerHTML = question["answer1"];
        document.getElementById('answer2').innerHTML = question["answer2"];
        document.getElementById('answer3').innerHTML = question["answer3"];
        document.getElementById('answer4').innerHTML = question["answer4"];
        document.getElementById('questions_count').innerHTML = currentQuestion + 1;

        let percent = currentQuestion / questions.length;
        percent = Math.round(percent * 100);
        document.getElementById('progress_count').innerHTML = `${percent}%`;
        document.getElementById('progress_bar').style.width = `${percent}%`;
    }
}

function answer(id) {
    let question = questions[currentQuestion];
    if (id == "answer" + question['correct_answer']) {
        document.getElementById(`box_${id}`).style.background = '#52BE80';
        document.getElementById(`letter_${id}`).style.background = '#7DCEA0';
        correctAnswers++;
        successAudio.play();
    } else {
        document.getElementById(`box_${id}`).style.background = '#E74C3C';
        document.getElementById(`letter_${id}`).style.background = '#EC7063';
        document.getElementById(`box_answer${question['correct_answer']}`).style.background = '#52BE80';
        document.getElementById(`letter_answer${question['correct_answer']}`).style.background = '#7DCEA0';
        wrongAudio.play();
    }
    document.getElementById('next_button').disabled = false;
}



function nextQuestion() {
    currentQuestion++;
    showQuestion();
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
}

function newGame() {
    document.getElementById('quiz_end').classList.add('d-none');
    document.getElementById('quiz_card').classList.remove('d-none');
    document.getElementById('progress_bar').style.width = `0%`;
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}
