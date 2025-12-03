import {
  decrementTime,
  incrementTime,
  limitCounter,
  limitInputlength,
} from "./functions";
import { DOMElements } from "./domElements";

const {
  $setsInput,
  $workMinutesInput,
  $restMinutesInput,
  $restSecondsInput,
  $worksSecondsInput,
  $configDiv,
  $preparationDiv,
  $preparationText,
  $preparationTimmer,
  $countDiv,
  $countTitle,
  $countTimmer,
  $countSets,
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
limitInputlength($worksSecondsInput, 2);
limitInputlength($restSecondsInput, 2);

limitCounter($worksSecondsInput, 0, 59);
limitCounter($restSecondsInput, 0, 59);

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

  if (target.matches("#start-btn")) {
    const workMinutes = Number($workMinutesInput.value);
    const workSeconds = Number($worksSecondsInput.value);
    const restMinutes = Number($restMinutesInput.value);
    const restSeconds = Number($restSecondsInput.value);
    const sets = Number($setsInput.value);
    console.log({
      workMinutes,
      workSeconds,
      restMinutes,
      restSeconds,
      sets,
    });

    $configDiv.classList.add("hidden");
    $preparationDiv.classList.remove("hidden");

    let count = 5;
    const regresiveCount = setInterval(() => {
      if (count > 1) {
        console.log("Count:", count - 1);
        $preparationTimmer.textContent = String(count - 1);
        count--;
      } else {
        console.log("Go!");
        $preparationTimmer.classList.add("hidden");
        $preparationText.classList.remove("hidden");
        clearInterval(regresiveCount);
        setTimeout(() => {
          runSet();
        }, 1000);
      }
    }, 1000);

    let currentSet = 1;

    function runSet() {
      $preparationDiv.classList.add("hidden");
      $countDiv.classList.remove("hidden");

      if (currentSet > sets) {
        console.log("TIMER COMPLETADO");
        return;
      }
      console.log(`Starting set ${currentSet} of ${sets}`);
      $countSets.textContent = `${sets - currentSet + 1}`;
      //work
      startCountdown(workMinutes, workSeconds, "Work", () => {
        console.log("REST");
        //rest
        startCountdown(restMinutes, restSeconds, "Rest", () => {
          console.log(`Set ${currentSet} completed`);
          currentSet++;
          runSet();
        });
      });
    }
  }

  const $pauseBtn = target.closest("#pause-btn") as HTMLButtonElement;
  if ($pauseBtn) {
    const [playIcon, pauseIcon] = $pauseBtn.querySelectorAll(
      "svg"
    ) as NodeListOf<SVGElement>;

    playIcon.classList.toggle("hidden");
    pauseIcon.classList.toggle("hidden");
  }
});

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const sconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(sconds).padStart(
    2,
    "0"
  )}`;
}

function startCountdown(
  minutes: number,
  seconds: number,
  label: string,
  callback: () => void
) {
  let totalSeconds = minutes * 60 + seconds;

  $countTitle.textContent = label.toUpperCase();

  document.body.classList.remove("state-work", "state-rest");
  if (label.toLowerCase() === "work") {
    document.body.classList.add("state-work");
  } else if (label.toLowerCase() === "rest") {
    document.body.classList.add("state-rest");
  }

  const interval = setInterval(() => {
    if (totalSeconds > 0) {
      console.log(`${label} Time: ${formatTime(totalSeconds)}`);
      $countTimmer.textContent = formatTime(totalSeconds);

      totalSeconds--;
    } else {
      $countTimmer.textContent = formatTime(0);
      clearInterval(interval);
      callback();
    }
  }, 1000);
}
