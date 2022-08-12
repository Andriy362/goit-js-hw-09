function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const сhangeColor = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStop.setAttribute('disabled', true);

let timerId = null;

btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    const background = getRandomHexColor();
    сhangeColor.style.backgroundColor = background;
  }, 1000);
  if (timerId) {
    btnStop.removeAttribute('disabled');
  }
  btnStart.setAttribute('disabled', true);
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  if (timerId) {
    btnStop.setAttribute('disabled', true);
  }
  btnStart.removeAttribute('disabled');
});
