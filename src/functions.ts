export function limitInputlength(input: HTMLInputElement, maxLength: number) {
  input.addEventListener("input", () => {
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  });
}

export function incrementTime(
  secondsInput: HTMLInputElement,
  minutesInput: HTMLInputElement
) {
  const seconds = Number(secondsInput.value);
  const minutes = Number(minutesInput.value);

  if (seconds < 59) {
    secondsInput.value = String(seconds + 1);
  } else if (minutes < 99) {
    minutesInput.value = String(minutes + 1);
    secondsInput.value = "00";
  }
}

export function decrementTime(
  secondsInput: HTMLInputElement,
  minutesInput: HTMLInputElement
) {
  const seconds = Number(secondsInput.value);
  const minutes = Number(minutesInput.value);

  if (minutes > 0) {
    if (seconds === 0) {
      minutesInput.value = String(minutes - 1);
      secondsInput.value = "59";
    } else {
      secondsInput.value = String(seconds - 1);
    }
  } else if (seconds > 0) {
    secondsInput.value = String(seconds - 1);
  }
}
