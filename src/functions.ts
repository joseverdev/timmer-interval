function formatInputValue(value: string, maxLength: number): string {
  const raw = value.trim();
  if (raw === "") {
    return "00";
  }

  const digits = raw.replace(/\D/g, "");
  if (digits === "") {
    return "00";
  }

  let sanitized = digits.slice(0, maxLength);
  if (sanitized.length === 1) {
    sanitized = sanitized.padStart(2, "0");
  }

  return sanitized;
}

export function limitInputlength(input: HTMLInputElement, maxLength: number) {
  input.addEventListener("input", () => {
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  });

  input.addEventListener("blur", () => {
    input.value = formatInputValue(input.value, maxLength);
  });
}

export function limitCounter(
  input: HTMLInputElement,
  min: number,
  max: number
) {
  input.addEventListener("blur", () => {
    let value = Number(input.value);
    if (isNaN(value) || value < min) {
      input.value = formatInputValue(String(min), 2);
    } else if (value > max) {
      input.value = formatInputValue(String(max), 2);
    } else {
      input.value = formatInputValue(String(value), 2);
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
    secondsInput.value = formatInputValue(String(seconds + 1), 2);
  } else if (minutes < 99) {
    minutesInput.value = formatInputValue(String(minutes + 1), 2);
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
      minutesInput.value = formatInputValue(String(minutes - 1), 2);
      secondsInput.value = "59";
    } else {
      secondsInput.value = formatInputValue(String(seconds - 1), 2);
    }
  } else if (seconds > 0) {
    secondsInput.value = String(seconds - 1);
  }
}
