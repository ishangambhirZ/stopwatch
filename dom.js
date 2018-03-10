//dom functions
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
