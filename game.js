let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

// Random Sequence

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#level-title").text("Level " + level);
  level++;

  // Play Animation and Sound

  for (let i = 0; i < level; i++) {
    setTimeout(function () {
      animatePress(gamePattern[i]);
      playSound(gamePattern[i]);
    }, i * 500);
  }
}

// Random Sequence Animation

function animatePress(randomSequence) {
  $("#" + randomSequence)
    .fadeOut(50)
    .fadeIn(50);
}

// User Click

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Click Animation

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Audio

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Game Start

let level = 0;
let started = false;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// Answer Check

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("#level-title").text("Game Over, Press Any to Restart");
    startOver();
  }
}

// Game Over

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}