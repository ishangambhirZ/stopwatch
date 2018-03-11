//dom functions
var startButton, lapButton, pauseButton, resumeButton, resetButton, timerDiv, lapsList;
function initializeDom(){
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML += `<button id='start'>Start</button>
  <button id='lap'>Lap</button>
  <button id='pause'>Pause</button>
  <button id='resume'>Resume</button>
  <button id='reset'>Reset</button>
  <div id='timer'>
    <span id='minutes'></span>:<span id='seconds'></span>:<span id='milliseconds'></span>
  </div>
  <ol id='laps'>
  </ol>`
}
function refreshRender(){
  switch(status){
    case 'STOPPED':
      hideNodes([lapButton, pauseButton, resumeButton, resetButton]);
      showNodes([startButton]);
      break;
    case 'RUNNING':
      hideNodes([startButton, resumeButton, resetButton]);
      showNodes([lapButton, pauseButton]);
      break;
    case 'PAUSED':
      hideNodes([startButton, lapButton, pauseButton]);
      showNodes([resumeButton, resetButton]);
      break;
  }
}
function clearLapsList(){
  lapsList.innerHTML = '';
}
function hideNodes(nodes){
  nodes.forEach((node) => hide(node));
}
function showNodes(nodes){
  nodes.forEach((node) => show(node));
}
function hide(node){
  node.style.display='none';
}
function show(node){
  node.style.display='block';
}
function renderTimer(){
  timerDiv.innerHTML = timeFormat(currentTimer);
}
function timeFormat(time){
  return `${time.m}:${time.s}:${time.ms}`
}
function renderLap(time){
  lapsList.innerHTML += `<li>${timeFormat(time)}</li>`;
}
function getElements(){
  startButton = document.getElementById("start");
  lapButton = document.getElementById("lap");
  pauseButton = document.getElementById("pause");
  resumeButton = document.getElementById("resume");
  resetButton = document.getElementById("reset");
  timerDiv = document.getElementById("timer");
  lapsList = document.getElementById('laps');
}
