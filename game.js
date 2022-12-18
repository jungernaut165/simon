const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];
var level = 0;
var started = false;
var gameOver = false;
const timer = ms => new Promise(res => setTimeout(res, ms))

function nextSequence(){ //selects a new random color and plays the sequence
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    document.querySelector("h1").innerHTML = "Level " + level.toString();
   
    async function load () {  //allows a delay while playing the sequence
        for (i = 0; i<gamePattern.length; i++){
            $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);    //play the sound
            await timer(1000)
        }
    }
    load();
}

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3'); 
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
};

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] != gamePattern[currentLevel]){ //game over
        gameOver = true;
        gamePattern = [];
        userClickedPattern =[];
        started = false;
        level=0;
       
        document.querySelector("h1").innerHTML = "Game Over! Press another key to play again!";
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        
    } 
    
    if (!gameOver && (userClickedPattern.length == gamePattern.length)){ //basically got all them right for that level
        level++; 
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
}
//start of game
document.addEventListener("keydown", function(){
    while (!started) {
        document.querySelector("h1").innerHTML = "Level 0";
        started = true;
        gameOver = false;
        nextSequence();
    }
});

//when clicked on a button
$(".btn").click((event) => {
    if (started){
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour); //store the color
        $("#" + userChosenColour).fadeOut(100).fadeIn(100); //flash the color
        playSound(userChosenColour); //play the sound
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1)
    }
});
