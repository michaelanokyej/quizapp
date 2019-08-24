// Global variables
let numberOfQuestions = $(questions).length;
let displayedQuestionNumber = parseInt($('.questionNumber').text());
let displayedScore = parseInt($('.userScore').text());
let pickedQuestion;

function startGame(){
    // Function to remove intro message and 
    // display generated question div and game status paragraph
    $('.introMessage').on('click', '.startButton', function (event) {
        $('.introMessage').remove();
        $('.generatedQuestion').css('display', 'block');
        $('#gameStatus').css('display', 'block');
        $('.questionNumber').text(1);
    });
}

function questionCounter(){
    displayedQuestionNumber++; 
}

function randomQuestion(){
    // This function generates random question number 
    let random = Math.floor(Math.random() * $(questions).length);
    pickedQuestion = questions[random];
    return pickedQuestion;
}

function generateQuestion(){
    // This generate a question for a user 
    // We check if game is still being played 
    if(displayedQuestionNumber < numberOfQuestions){
    randomQuestion();
    $('div.generatedQuestion').html(`
    <div>
    <form class = "questionForm">
    <fieldset>
    <legend>${pickedQuestion.question}</legend>
      
    <input type="radio" id="parrotCry" name="monster" value= "Because the parrot was crying too loud.">
    <label class='answerOption' for="parrotCry">${pickedQuestion.answers[0]}</label><br/>

    <input type="radio" id="wife" name="monster">
    <label class='answerOption' for="wife">${pickedQuestion.answers[1]}</label><br/>

    <input type="radio" id="parrotSwear" name="monster">
    <label class='answerOption' for="parrotSwear">${pickedQuestion.answers[2]}</label><br/>

    <input type="radio" id="theLaw" name="monster">
    <label class='answerOption' for="theLaw">${pickedQuestion.answers[3]}</label><br/>

    <input class="submitButton" type="button" value="submit">
    </fieldset>
  </form>
  </div>`
  );
} else{
    renderResults();
    restartQuiz();
    return numberOfQuestions;
}
}

function renderResults(){
    if (displayedScore >= 8) {
        $('div.generatedQuestion').html(`<div><h3>You're a master of history!</h3><img src="assets/images/scholar.png" alt="scholar image"/><p>You got ${displayedScore} / 10</p><p>You're ready to conquer the world!</p><button class="restartButton">Restart Quiz</button></div>`);
      } else if (displayedScore < 8 && displayedScore >= 5) {
        $('div.generatedQuestion').html(`<div><h3>You are almost a scholar!</h3><img src="assets/images/almostScholar.jpg" alt="almost scholar image"/><p>You got ${displayedScore} / 10</p><p>Brush up on your history if you want to conquer the world!</p><button class="restartButton">Restart Quiz</button></div>`);
      } else {
        $('div.generatedQuestion').html(`<div><h3>You are missing a lot of history!</h3><img src="assets/images/cryingEmoji" alt="crying emji"/><p>You got ${displayedScore} / 10</p><p>Try to study the world's history. I promise you will love it!</p><button class="restartButton">Restart Quiz</button></div>`);
      }
    }


function restartQuiz(){
    $('main').on('click', '.restartButton', function (event) {
        createGame();
      });
}




function checkAnswer(){
    // This function will check the user's choice 
    $('.questionForm').on('submit', function (event) {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${pickedQuestion.correctAnswer}`;
        if (answer === correctAnswer) {
          selected.parent().addClass('correct');
          correctAnswerSelected();
        } else {
          selected.parent().addClass('wrong');
          wrongAnswerSelected();
        }
      });

}

function correctAnswerSelected () {
    let correctAnswer = `${pickedQuestion.correctAnswer}`;
    $('div.generatedQuestion').html(`<div><p><b>Correct! You are awesome!</b></p><button type=button class="nextButton">Next</button></div>`);
  }

function wrongAnswerSelected () {
    let correctAnswer = `${pickedQuestion.correctAnswer}`;
    $('.questionAnswerForm').html(`<div><p><b>Sorry, you are wrong.</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
  }



function createGame(){
    // function to create the game as a whole
    startGame();
    generateQuestion();
    checkAnswer();
}



// To create game when page loads
$(createGame);
