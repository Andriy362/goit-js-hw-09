import Notiflix from 'notiflix';

const refs = {
  newForm: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name = delay]'),
  inputStep: document.querySelector('input[name = step]'),
  inputAmount: document.querySelector('input[name = amount]'),
};

refs.newForm.addEventListener('submit', formSubmit);

function formSubmit(event) {
  event.preventDefault();

  let firstDelay = Number(refs.inputDelay.value);
  let step = Number(refs.inputStep.value);
  let amount = Number(refs.inputAmount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    firstDelay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
  return promise;
}
