//alert("hi");
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
  });

$(".btn").click(function(event) {
  //var userChosenColor = $(this).attr("id");    //this is another way to get the id...
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  if (arraysEqual(userClickedPattern.length)) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 800);

    }
  } else {
    gameOver();
    startOver();
  }

});

function gameOver() {
  console.log("failure");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over. Press any key to start over.");
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

function arraysEqual(level) {
  for (var i = 0; i < level; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) return false;
  }
  return true;
}

function nextSequence() {

  userClickedPattern = [];
  //increasing the level by 1
  level++;
  //changing the level displayed immediately once level is upped
  $("#level-title").text("Level " + level);

  //select a random number and use it to select a color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  //add the selected color to the game pattern
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //button effects
  playSound(randomChosenColor);


}

//plays the audio for a selected button
function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

//animates the selected button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
