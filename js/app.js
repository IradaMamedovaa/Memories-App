const API = 'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple'
const questionSection = document.querySelector('.questionSection');
const questionNum = document.querySelector('.questionNum span');
const answeredQuestions = document.querySelector('.answered'); 
const score = document.querySelector('.score'); //score in header section
const result = document.querySelector('.result');
const finalScore = document.querySelector('.finalScore');  //final score in result text
let number = 1;

async function getQuestions(API){
    const data = await fetch(API);
    const questions = await data.json();
    return questions.results
}

async function showQuestions(data,number,prevAnswer){
    const questions = await data;
    const length = questions.length;
    if(prevAnswer){
        let currentScore = parseInt(score.innerHTML) + (100/length);
        score.innerHTML = currentScore;
    }
    if(number > length) {
        questionSection.style.display = 'none';
        finalScore.innerHTML = score.innerHTML;
        result.style.display = 'flex';
        return
    };

    let questionObj = questions[number-1];
    questionNum.innerHTML = `${number} / ${length}`;
    answeredQuestions.style.width = `${number/length*100}%`;

    let answersArray = [...questionObj.incorrect_answers, questionObj.correct_answer];
    shuffleArray(answersArray);
    questionSection.innerHTML = `
    <p class = "question">${questionObj.question}</p>
    <p class = "answer">${answersArray[0]}</p>
    <p class = "answer">${answersArray[1]}</p>
    <p class = "answer">${answersArray[2]}</p>
    <p class = "answer">${answersArray[3]}</p>
    `
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => answer.addEventListener('click',(e)=>{
        number ++;
        showQuestions(getQuestions(API),number,checkAnswer(e.target,questionObj.correct_answer));
    }))

}

showQuestions(getQuestions(API),number,false);

function checkAnswer(selected,correct){
    if(selected.innerHTML == correct) {
        selected.classList.add('correct');
        return true
    }else{
        selected.classList.add('wrong');
        return false
    }
    
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}