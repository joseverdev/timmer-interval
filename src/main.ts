import { decrementTime, incrementTime, limitInputlength } from "./functions";
import { DOMElements } from "./domElements";

const {
  $setsInput,
  $workMinutesInput,
  $restMinutesInput,
  $restSecondsInput,
  $worksSecondsInput,
} = DOMElements;

$setsInput.addEventListener("keydown", (e) => {
  const invalidChars = ["e", "E", "+", "-", "."];
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

$setsInput.addEventListener("input", () => {
  const value = $setsInput.value;
  if (value.length > 2) {
    $setsInput.value = value.slice(0, 2);
  }
});

limitInputlength($workMinutesInput, 2);
limitInputlength($restMinutesInput, 2);

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.matches("#set-increment")) {
    const sets = Number($setsInput.value);
    if (sets < 99) {
      $setsInput.value = String(sets + 1);
    }
  }
  if (target.matches("#set-decrement")) {
    const sets = Number($setsInput.value);
    if (sets > 1) {
      $setsInput.value = String(sets - 1);
    }
  }

  if (target.matches("#work-increment")) {
    incrementTime($worksSecondsInput, $workMinutesInput);
  }
  if (target.matches("#rest-increment")) {
    incrementTime($restSecondsInput, $restMinutesInput);
  }
  if (target.matches("#rest-decrement")) {
    decrementTime($restSecondsInput, $restMinutesInput);
  }
  if (target.matches("#work-decrement")) {
    decrementTime($worksSecondsInput, $workMinutesInput);
  }

  if (target.matches(".start-btn")) {
    console.log("Start button clicked");
  }
});
