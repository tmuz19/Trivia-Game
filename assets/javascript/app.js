var gameArea = $("#game-area");
var countStartNumber = 30;

$(document).on('click', '#start-over', function (e) {
    startGame.reset();
});

$(document).on('click', '.answer-button', function (e) {
    startGame.clicked(e);
});

$(document).on('click', '#start', function (e) {
    $('#subcontainer').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    startGame.loadQuestion();
});

var questions = [{
    question: "How many teams are in the NFL?",
    options: ["16", "32", "30", "18"],
    answer: "32",
    image: "assets/images/NFLteams.jpeg"
},
{
    question: "How many NFL teams can make the playoffs?",
    options: ["12", "8", "6", "16"],
    answer: "12",
    image: "assets/images/nflplayoffs.png"
},
{
    question: "How many players make an ice hockey starting line up?",
    options: ["5", "8", "6", "11"],
    answer: "6",
    image: "assets/images/hockey.jpg"
},
{
    question: "Which NFL team has palyed in the Super Bowl the most? ",
    options: ["Broncos", "49ers", "Patriots", "Steelers"],
    answer: "Patriots",
    image: "assets/images/patriots.png"
},
{
    question: "How many teams are in the NBA?",
    options: ["32", "16", "24", "30"],
    answer: "30",
    image: "assets/images/NBAteams.jpg"
},
{
    question: "How many NBA teams can make the playoffs?",
    options: ["30", "16", "12", "8"],
    answer: "16",
    image: "assets/images/nbaplayoffs.png"
},
{
    question: "What is the name of Sacramento's NBA team?",
    options: ["Lakers", "Kings", "Warriors", "Clippers"],
    answer: "Kings",
    image: "assets/images/kings.png"
},
{
    question: "Which NBA team does Lebron James currently play for?",
    options: ["Lakers", "Cavaliers", "Heat", "Kings"],
    answer: "Lakers",
    image: "assets/images/lebron.jpg"
}];


var startGame = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function () {
        startGame.counter--;
        $('#counter-number').html(startGame.counter);

        if (startGame.counter === 0) {
            console.log("TIME UP");
            startGame.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(startGame.countdown, 1000);
        gameArea.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[this.currentQuestion].options.length; i++) {
            gameArea.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].options[i] + '">' + questions[this.currentQuestion].options[i] + '</button>');
        }
    },
    nextQuestion: function () {
        startGame.counter = countStartNumber;
        $('#counter-number').html(startGame.counter);
        startGame.currentQuestion++;
        startGame.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        $('#counter-number').html(startGame.counter);

        gameArea.html('<h2>You are out of time!</h2>');
        gameArea.append('<h3>The Correct Answer is: ' + questions[this.currentQuestion].answer);
        gameArea.append('<img src="' + questions[this.currentQuestion].image + '" />');

        if (startGame.currentQuestion === questions.length - 1) {
            setTimeout(startGame.results, 3 * 1000);
        } else {
            setTimeout(startGame.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);

        gameArea.html('<h2>Your results!</h2>');
        $('#counter-number').html(startGame.counter);
        gameArea.append('<h3>Correct Answers: ' + startGame.correct + '</h3>');
        gameArea.append('<h3>Incorrect Answers: ' + startGame.incorrect + '</h3>');
        gameArea.append('<h3>Unanswered: ' + (questions.length - (startGame.incorrect + startGame.correct)) + '</h3>');
        gameArea.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function (e) {
        clearInterval(timer);

        if (e.target.getAttribute("data-name") === questions[this.currentQuestion].answer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function () {
        startGame.incorrect++;
        clearInterval(timer);
        gameArea.html('<h2>Wrong answer!</h2>');
        gameArea.append('<h3>The correct answer is: ' + questions[startGame.currentQuestion].answer + '</h3>');
        gameArea.append('<img src="' + questions[startGame.currentQuestion].image + '" />');

        if (startGame.currentQuestion === questions.length - 1) {
            setTimeout(startGame.results, 3 * 1000);
        } else {
            setTimeout(startGame.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function () {
        clearInterval(timer);
        startGame.correct++;
        gameArea.html('<h2>Correct!</h2>');
        gameArea.append('<img src="' + questions[startGame.currentQuestion].image + '" />');

        if (startGame.currentQuestion === questions.length - 1) {
            setTimeout(startGame.results, 3 * 1000);
        } else {
            setTimeout(startGame.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};