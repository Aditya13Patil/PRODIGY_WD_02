let startTime;
let interval;
let running = false;
let lapTimes = [];

const stopwatchDisplay = document.getElementById("stopwatch");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapTimesDisplay = document.getElementById("lap-times");

function updateStopwatch() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = elapsedTime % 1000;

  stopwatchDisplay.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
}

function startStop() {
    if (running) {
        clearInterval(interval);
        startStopButton.textContent = "Start";
        lapButton.disabled = false;
        running = false;
    } else {
        if (!startTime) {
            startTime = Date.now();
        } else {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            startTime = currentTime - elapsedTime;
        }
        interval = setInterval(updateStopwatch, 10);
        startStopButton.textContent = "Stop";
        lapButton.disabled = false;
        running = true;
    }
}

function reset() {
  clearInterval(interval);
  stopwatchDisplay.textContent = "0:00:000";
  startStopButton.textContent = "Start";
  lapButton.textContent = "Lap";
  running = false;
  lapTimes = [];
  lapTimesDisplay.textContent = "";
}

function lap() {
  if (running) {
    const currentTime = Date.now();
    const lapTime = currentTime - startTime;
    lapTimes.push(lapTime);
    const minutes = Math.floor(lapTime / 60000);
    const seconds = Math.floor((lapTime % 60000) / 1000);
    const milliseconds = lapTime % 1000;
    lapTimesDisplay.innerHTML += `<div>Lap ${
      lapTimes.length
    }: ${minutes}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(3, "0")}</div>`;
  } else {
    reset();
  }
}

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
