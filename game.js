let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

// Random Sequence

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level++;

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Play Animation and Sound

  for (let i = 0; i < level; i++) {
    setTimeout(function () {
      randomAnimate(gamePattern[i]);
      playSound(gamePattern[i]);
    }, i * 500);
  }
}

// Random Sequence Animation

function randomAnimate(randomSequence) {
  $("#" + randomSequence)
    .fadeOut(50)
    .fadeIn(50);
}

// User Click

$(".btn").click(function () {
  if (started == true) {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  }
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

$("#level-title").click(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// Answer Check

function checkAnswer(currentLevel) {
  if (started == true) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
      if (gamePattern.length == userClickedPattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      playSound("wrong");

      $("#level-title").text("Game Over, Click Here to Restart");
      startOver();
    }
  }
}
// Game Over

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
