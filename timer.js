/*
STATE => {
  timerArr => [],
  currentTimer => 00:00:00,
  status => ['STOPPED', 'RUNNING', 'PAUSED']
}
//STOPPED
displayButton => ['Start']
timerArr => cleared
currentTimer => cleared

//RUNNING
displayButtons => ['Lap', 'Pause']
timerArr => filled
currentTimer => running

//paused
displayButtons => ['Resume', 'Reset']
timerArr => filled
currentTimer => paused
*/
(function stopWatch(){
  //dom variables
  var startButton, lapButton, pauseButton, resumeButton, resetButton, timerDiv, lapsList;
  //state variables
  var status, interval, currentTimer, counter, timerArr;

  //state functions
  function resetState(){
    status = 'STOPPED';
    timerArray = [];
    interval = 0;
    counter = 0;
    currentTimer = {
      ms: '00',
      s: '00',
      m: '00'
    }
  }
  //depends upon util and dom
  function updateTimer(){
    var ms = counter%100;
    currentTimer.ms=addPadding(ms);
    var secs = parseInt(counter/100);
    var s = secs%60;
    currentTimer.s=addPadding(s);
    var m = parseInt(secs/60);
    currentTimer.m = addPadding(m);
    renderTimer();
  }
  function updateStatus(newStatus){
    status = newStatus;
  }
  function runTimer(){
    interval = setInterval(function(){
      counter++;
      updateTimer();
    }, 1);
  }
  function pauseTimer(){
    clearInterval(interval);
  }
  function resetWatch(){
    resetState();
  }
  function recordTime(){
    let time = JSON.parse(JSON.stringify(currentTimer));
    timerArray.push(time);
    return time;
  }

  //util functions
  function addPadding(n){
    return n<10 ? `0${n}` : `${n}`;
  }

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

  //initialize
  getElements();
  resetState();
  bindEvents();
  refreshRender();
})();
