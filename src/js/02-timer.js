import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  clockface: document.querySelector('.value'),
  spanDaysEl: document.querySelector('[data-days]'),
  spanHoursEl: document.querySelector('[data-hours]'),
  spanMinutesEl: document.querySelector('[data-minutes]'),
  spanSecondsEl: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates) {
      const startTime = Date.now();
      const deadline = selectedDates[0].getTime();

      if (deadline <= startTime) {
        refs.btnStart.setAttribute('disabled', true);
        Notiflix.Notify.failure('Please choose a date in the future');
      } else {
        refs.btnStart.removeAttribute('disabled');
      }
      let deltaTime = deadline - startTime;

      timer = {
        IntervalId: null,
        start() {
          if (this.IntervalId) {
            clearInterval(this.IntervalId);
          }

          this.IntervalId = setInterval(() => {
            deltaTime -= 1000;

            if (deltaTime <= 1) {
              clearInterval(this.IntervalId);
              return null;
            }
            const time = convertMs(deltaTime);

            updateClock(time);
          }, 1000);
        },
      };
    }
  },
};
refs.btnStart.addEventListener('click', () => {
  timer.start();
});
flatpickr('#datetime-picker', options);

function updateClock({ days, hours, minutes, seconds }) {
  refs.spanDaysEl.textContent = `${days}`;
  refs.spanHoursEl.textContent = `${hours}`;
  refs.spanMinutesEl.textContent = `${minutes}`;
  refs.spanSecondsEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
