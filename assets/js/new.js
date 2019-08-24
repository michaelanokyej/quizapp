// Global variables
let numberOfQuestions = $(questions).length;
let displayedQuestionNumber = 0;
let displayedScore = 0;
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
    <form>
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
}
}

function checkAnswer(){
    // This function will check the user's choice 
}

function createGame(){
    // function to create the game as a whole
    startGame();
    generateQuestion();
    checkAnswer();
}



// To create game when page loads
$(createGame);
