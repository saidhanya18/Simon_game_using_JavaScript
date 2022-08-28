var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level=0;
var started=false;
function nextSequence(){
  // emptying the array
  userClickedPattern=[];
  level+=1;
  var r = Math.random()*4;
  r=Math.floor(r);
  var randomChosenColour = buttonColours[r];
  gamePattern.push(randomChosenColour);
 // to select elements as id in jquery we need # symbol
  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // fadein fadeout is to give the click effect
  // to play audio
  // var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  // audio.play();
  // converting thia also to play sound function
  playSound(randomChosenColour);
  // continuing step 7
  $("h1").text("Level"+" "+level);
};
// step 4 question 4 to create event based on the mouse click
//we use click event  and create a function and the button is supposed to perform when it is clicked on
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // to play sound
  // var audio2= new Audio("sounds/"+ userChosenColour+".mp3");
  // audio2.play();
  // but we are creating a seperate function to make it easier to play sound
  playSound(userChosenColour);
  // to add css step 6 to show the button clicked
  animatePress(userChosenColour);
  // step 8
  checkAnswer(userClickedPattern.length-1);
  started=true;
});
// adding step 6 to show a button clicked
function animatePress(currentColour){
 $("#"+currentColour).addClass("pressed");
 setTimeout(function(){
   $("#"+currentColour).removeClass("pressed");
 },100);
};
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
// step 7 to detect if the keyboard has been pressed
$(document).keypress(function(){
  nextSequence();
});
// now step 8 and 9 understanding the game
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

//step 10
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
};
