//event functions
function bindEvents(){
  startButton.addEventListener('click', startEvent);
  lapButton.addEventListener('click', lapEvent);
  pauseButton.addEventListener('click', pauseEvent);
  resumeButton.addEventListener('click', resumeEvent);
  resetButton.addEventListener('click', resetEvent);
}
function startEvent(){
  updateStatus('RUNNING');
  runTimer();
  refreshRender();
}
function lapEvent(){
  let time = recordTime();
  renderLap(time);
}
function pauseEvent(){
  updateStatus('PAUSED');
  pauseTimer();
  refreshRender();
}
function resumeEvent(){
  updateStatus('RUNNING');
  runTimer();
  refreshRender();
}
function resetEvent(){
  updateStatus('STOPPED')
  resetWatch();
  refreshRender();
  clearLapsList();
  renderTimer();
}
