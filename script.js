let equalPressed = 0;
let buttonInput = document.querySelectorAll(".button");
let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let erase = document.getElementById("erase");
let historyContent = document.getElementById("historyContent");

window.onload = () => {
  input.value = "";
};

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n-1);
}

buttonInput.forEach((buttonClass) => {
  buttonClass.addEventListener("click", (event) => {
    if (equalPressed === 1) {
      // input.value = "";
      equalPressed = 0;
    }
    let value = event.target.dataset.number;
    if (input.value == "0" || input.value == "error") {
        input.value = value;
    }
    else if (value = '.' && /(?:\.)(?!.*(?:\+|\-|\*|\/))/.test(screen.value)) {
        return
    }
    else {
        input.value += event.target.dataset.number;
    }
  });
});

equal.addEventListener("click", () => {
  equalPressed = 1;
  let inputValue = input.value;
  try {
    let expression = input.value;
    let solution = eval(inputValue
        .replaceAll('sin', 'Math.sin')
        .replaceAll('cos', 'Math.cos')
        .replaceAll('tan', 'Math.tan')
        .replaceAll('^2', '**2')
        .replaceAll('^3', '**3')
        .replaceAll('√', 'Math.sqrt')
        .replaceAll('∛', 'Math.cbrt')
        .replace(/(\d+)!/g, (match, number) => {
            return factorial(parseInt(number));
        }
    ));
    if (Number.isNaN(solution) || !Number.isFinite(solution)) {
      throw new Error("Invalid mathematical expression");
    }
    if (Number.isInteger(solution)) {
      input.value = solution;
    } else {
      input.value = solution.toFixed(2);
    }
    addToHistory(expression, input.value);
  } catch (error) {
    alert(error.message);
  }
});

function addToHistory(expression, result) {
    let listItem = document.createElement("li");
    let divItem = document.createElement("div");
    let spanItem = document.createElement("span");
    let buttonItem = document.createElement("button");

    listItem.appendChild(divItem);
    divItem.appendChild(spanItem);
    divItem.appendChild(buttonItem);
    divItem.setAttribute("class", "historyItem");

    divItem.style.display = "flex";
    divItem.style.justifyContent = "space-between";
    spanItem.style.alignSelf = "center";
    spanItem.style.cursor = "pointer";

    spanItem.textContent = `${expression} = ${result}`;
    spanItem.dataset.userInput = expression;
    spanItem.style.color = "white";
    spanItem.addEventListener('click', addBackToScreen);
    buttonItem.style.backgroundColor = "red";
    buttonItem.style.color = "white";
    buttonItem.setAttribute("class", "btn-sm")

    buttonItem.textContent = "Delete";
    buttonItem.addEventListener('click', deleteHistoryItem);

    historyContent.appendChild(divItem);
}

function addBackToScreen(event) {
    input.value = event.target.dataset.userInput;
}

function deleteHistoryItem(event) {
    event.target.parentNode.remove();
}

clear.addEventListener("click", () => {
  input.value = "";
});

erase.addEventListener("click", () => {
  input.value = input.value.substr(0, input.value.length - 1);
});
