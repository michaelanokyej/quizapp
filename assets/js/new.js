// Global variables
let numberOfQuestions = $(questions).length;
let displayedQuestionNumber = 1;
let displayedScore = parseInt($('.userScore').text());
let score = 0;
let pickedQuestion;

function startGame(){
    // Function to remove intro message and 
    // display generated question div and game status paragraph
    $('.introMessage').on('click', '.startButton', function (event) {
        $('.introMessage').remove();
        $('.generatedQuestion').css('display', 'block');
        $('#gameStatus').css('display', 'block');
        $('.questionNumber').text(displayedQuestionNumber);
    });
}

function questionCounter(){
  displayedQuestionNumber++;
  $('.questionNumber').text(displayedQuestionNumber);
  // console.log("displayedQuestionNumber", displayedQuestionNumber);
}

function scoreCounter(){
  score++;
  $('.userScore').text(score);

}

function randomQuestion(){
    // This function generates random question number 
    let random = Math.floor(Math.random() * $(questions).length);
    pickedQuestion = questions[random];
}

function generateQuestion(){
    // This generate a question for a user 
    // We check if game is still being played 
    if(displayedQuestionNumber < numberOfQuestions){
    randomQuestion();
    // $('img.quizLogo').attr('src', pickedQuestion.icon);
    // // Working on the above to change pictures by question 
    $('div.generatedQuestion').html(`
    <div>
    <form class = "questionForm">
    <fieldset>
    <legend>${pickedQuestion.question}</legend>
    
    <div class = "answer">
    <input type="radio" id="answerOption1" name="quiz" value= "${pickedQuestion.answers[0]}">
    <label for="answerOption1">${pickedQuestion.answers[0]}</label><br/>
    </div>

    <div class = "answer">
    <input type="radio" id="answerOption2" name="quiz" value= "${pickedQuestion.answers[1]}">
    <label for="answerOption2">${pickedQuestion.answers[1]}</label><br/>
    </div>

    <div class = "answer">
    <input type="radio" id="answerOption3" name="quiz" value= "${pickedQuestion.answers[2]}">
    <label for="answerOption3">${pickedQuestion.answers[2]}</label><br/>
    </div>

    <div class = "answer">
    <input type="radio" id="answerOption4" name="quiz" value= "${pickedQuestion.answers[3]}">
    <label  for="answerOption4">${pickedQuestion.answers[3]}</label><br/>
    </div>

    <input class="submitAnswerButton" type="button" value="submit">
    </fieldset>
  </form>
  </div>`
  );
} else{
    renderResults();
    restartQuiz();
    // return numberOfQuestions;
}
console.log("generate question");
}

function renderResults(){
  $('div #gameStatus').css('display', 'none');
    if (score >= 8) {
        $('div.generatedQuestion').html(`<div><h3>You're a master of history!</h3><img src="assets/images/scholar.png" alt="scholar image"/><p>You got ${score} / 10</p><p>You're ready to conquer the world!</p><button class="restartButton">Restart Quiz</button></div>`);
      } else if (score < 8 && score >= 5) {
        $('div.generatedQuestion').html(`<div><h3>You are almost a scholar!</h3><img src="assets/images/smilingemoji.jpeg" alt="almost scholar image"/><p>You got ${score} / 10</p><p>Brush up on your history if you want to conquer the world!</p><button class="restartButton">Restart Quiz</button></div>`);
      } else {
        $('div.generatedQuestion').html(`<div><h3>You are missing a lot of history!</h3><img src="assets/images/cryingEmoji.jpeg" alt="crying emji"/><p>You got ${score} / 10</p><p>Try to study the world's history. I promise you will love it!</p><button class="restartButton">Restart Quiz</button></div>`);
      }
    }


function restartQuiz(){
    $('div.generatedQuestion').on('click', '.restartButton', function (event) {
      displayedQuestionNumber = 1;
      $('.questionNumber').text(displayedQuestionNumber);
      generateQuestion();
      checkAnswer();
      });
}




function checkAnswer(){
    // This function will check the user's choice 
    $('div.generatedQuestion').on('click', '.submitAnswerButton', function (event) {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${pickedQuestion.correctAnswer}`;
       
        if (answer === correctAnswer) {
        //   selected.parent().addClass('correct');
          correctAnswerSelected();
            console.log("correctAnswer");
            scoreCounter();
            nextQuestion();
        } else {
        //   selected.parent().addClass('wrong');
          wrongAnswerSelected();
        console.log("wrong");
        nextQuestion();
        }
      });

}

function correctAnswerSelected () {
    let correctAnswer = `${pickedQuestion.correctAnswer}`;
    $('div.generatedQuestion').html(`<div><p><b>Correct! You are awesome!</b></p><button type=button class="nextButton">Next</button></div>`);
  }

function wrongAnswerSelected () {
    let correctAnswer = `${pickedQuestion.correctAnswer}`;
    $('div.generatedQuestion').html(`<div><p><b>Sorry, you are wrong.</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
  }



  function nextQuestion(){
    $('div.generatedQuestion').off('click', '.nextButton') 
    $('div.generatedQuestion').on('click', '.nextButton', function (event) {
      // event.preventDefault();
      generateQuestion();
      questionCounter();
      
    });
  }

function createGame(){
    // function to create the game as a whole
    startGame();
    generateQuestion();
    checkAnswer();
}



// To create game when page loads
$(createGame);
