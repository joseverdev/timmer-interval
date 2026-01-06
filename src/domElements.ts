export const DOMElements = {
  $setsInput: document.getElementById("sets") as HTMLInputElement,
  $worksSecondsInput: document.getElementById("work-input") as HTMLInputElement,
  $workMinutesInput: document.getElementById(
    "work-minutes-input"
  ) as HTMLInputElement,
  $restMinutesInput: document.getElementById(
    "rest-minutes-input"
  ) as HTMLInputElement,
  $restSecondsInput: document.getElementById(
    "rest-seconds-input"
  ) as HTMLInputElement,
  $configDiv: document.querySelector(".config") as HTMLDivElement,
  $preparationDiv: document.querySelector(".preparation") as HTMLDivElement,
  $preparationText: document.getElementById(
    "preparation__text"
  ) as HTMLParagraphElement,
  $preparationTimmer: document.getElementById(
    "preparation__timmer"
  ) as HTMLParagraphElement,
  $countDiv: document.getElementById("count") as HTMLDivElement,
  $countTitle: document.getElementById("count__title") as HTMLParagraphElement,
  $countTimmer: document.getElementById(
    "count__timmer"
  ) as HTMLParagraphElement,
  $countSets: document.getElementById("count__sets") as HTMLParagraphElement,
  $exitBtn: document.getElementById("exit") as HTMLButtonElement,
  $backBtn: document.getElementById("back") as HTMLButtonElement,
};
