let questions = [
    {
        'answer_0': 'Wie viel Einwohner hat die Schweiz?',
        'answer_1': '3.29 Millionen',
        'answer_2': '8.67 Millionen',
        'answer_3': '12.95 Millionen',
        'answer_4': '9.62 Millionen',
        'right-answer': 2
    },
    {
        'answer_0': 'Wie heisst die Hauptstadt der Schweiz?',
        'answer_1': 'Zürich',
        'answer_2': 'Schwyz',
        'answer_3': 'Bern',
        'answer_4': 'Altdorf',
        'right-answer': 3
    },
    {
        'answer_0': 'Wann wurde die Schweiz gegründet?',
        'answer_1': '1 August 801',
        'answer_2': '1 August 1350',
        'answer_3': '1 August 1732',
        'answer_4': '1 August 1291',
        'right-answer': 4
    },
    {
        'answer_0': 'Welcher See grenzt an die Schweiz, Deutschland und Österreich?',
        'answer_1': 'Bodensee',
        'answer_2': 'Genfersee',
        'answer_3': 'Seealpsee',
        'answer_4': 'Walensee',
        'right-answer': 1
    },
    {
        'answer_0': 'Wieviel Kantone hat die Schweiz',
        'answer_1': '15',
        'answer_2': '32',
        'answer_3': '26',
        'answer_4': '18',
        'right-answer': 3
    },
    {
        'answer_0': 'Wiviel Landessprachen gibt es in der Schweiz',
        'answer_1': '2',
        'answer_2': '4',
        'answer_3': '5',
        'answer_4': '3',
        'right-answer': 2
      }
      
   
];

let rightQuestion = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/wrong.mp3');
let AUDIO_APPLAUS = new Audio('audio/applaus.mp3');



function init() {

    document.getElementById('totalquestions').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {
        showEndscreen();
        updateProgressbarRightAnswer();
    } else {
        updateToNextQuestion();
        updateProgressbar();
        updateProgressbarRightAnswer();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function answer(selection) {

    let question = questions[currentQuestion];
    let selectionQuestionNumber = selection.slice(-1);

    let idOfRightAnswer = `answer_${question['right-answer']}`;

    noSecondanswer();

    if (rightAnswerSelected(selectionQuestionNumber, question)) {
        RightAnswer(selection);
    } else {
        FalseAnswer(selection, idOfRightAnswer);

    }
}

function noSecondanswer() {
    for (let i = 1; i <= 4; i++) {
        let answer = 'answer_' + i;
        document.getElementById(answer).parentNode.style = 'pointer-events:none';
    }
}

function resetnoSecondanswer() {
    for (let i = 1; i <= 4; i++) {
        let answer = 'answer_' + i;
        document.getElementById(answer).parentNode.style = '';

    }

}

function rightAnswerSelected(nr, question) {
    return nr == question['right-answer'];
}

function nextQuestion() {

    currentQuestion++;
    showQuestion();
    resetnoSecondanswer();
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('next-question').disabled = true;

    for (let i = 1; i <= 4; i++) {

        let answer = 'answer_' + i;

        document.getElementById(answer).parentNode.classList.remove('bg-success');
        document.getElementById(answer).parentNode.classList.remove('bg-danger');



    }

}

function showEndscreen() {

    AUDIO_APPLAUS.play();

    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: None';

    document.getElementById('amount-Of-Questions').innerHTML = questions.length;
    document.getElementById('right-Of-Questions').innerHTML = rightQuestion;
    document.getElementById('header-img').src = 'img/trophy.png';

}


function restartGame() {

    rightQuestion = 0;
    currentQuestion = 0;

    document.getElementById('header-img').src = 'img/mountain.jpg';

    document.getElementById('endScreen').style = 'display: None';
    document.getElementById('questionBody').style = '';
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;

    init();

}

function updateToNextQuestion() {

    let question = questions[currentQuestion];

    for (let i = 0; i <= 4; i++) {

        let answer = 'answer_' + i;
        document.getElementById(answer).innerHTML = question[answer];
    }
}

function updateProgressbar() {

    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);


    document.getElementById('progressbar-txt').innerHTML = `${percent} %`;
    document.getElementById('progressbar').style.height = `${percent}%`;

}

function updateProgressbarRightAnswer() {

    if (currentQuestion == 0) {
        percent = rightQuestion / (currentQuestion + 1);
    } else {
        percent = rightQuestion / (currentQuestion);
    }
    percent = Math.round(percent * 100);
    if (percent == 100) {
        document.getElementById('progressbarrightanswer').style.backgroundColor = 'green';
    } else if (percent <= 50) {
        document.getElementById('progressbarrightanswer').style.backgroundColor = 'red';
    } else if (percent <= 99) {
        document.getElementById('progressbarrightanswer').style.backgroundColor = 'orange';
    }
    document.getElementById('progressbarrightanswer-txt').innerHTML = `${percent} %`;
    document.getElementById('progressbarrightanswer').style.height = `${percent}%`;
}

/*function getColor(percent){

    if (percent == 100){
      let color =   'green'
    }
}*/




function RightAnswer(selection) {

    document.getElementById(selection).parentNode.classList.add('bg-success');
    document.getElementById('next-question').disabled = false;
    rightQuestion++;
    AUDIO_SUCCESS.play();
}

function FalseAnswer(selection, idOfRightAnswer) {

    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    document.getElementById('next-question').disabled = false;
    AUDIO_WRONG.play();
}