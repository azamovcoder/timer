const form = document.querySelector(".form");
const work = document.querySelector(".work");
const rest = document.querySelector(".rest");
const count = document.querySelector(".process__count");
const timer = document.querySelector(".timer");

let intervalId;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let workValue = parseInt(work.value);
  let restValue = parseInt(rest.value);
  let countValue = parseInt(count.value);

  startTimer(workValue, restValue, countValue);
});

function startTimer(workValue, restValue, countValue) {
  let cycle = 0;
  let isWork = true;
  let currentTime = workValue * 60;

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timer.innerHTML = `
      <div class="timer__content">
        <h1>${isWork ? "Work-Time" : "Rest-Time"}</h1>
        <p>
          ${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}
        </p>
      </div>
    `;

    if (currentTime <= 0) {
      if (isWork) {
        currentTime = restValue * 60;
        isWork = false;
      } else {
        cycle++;
        if (cycle < countValue) {
          currentTime = workValue * 60;
          isWork = true;
        } else {
          clearInterval(intervalId);
          timer.innerHTML = `<h1>Time-Off</h1>`;
          return;
        }
      }
    } else {
      currentTime--;
    }
  }, 100);
}
