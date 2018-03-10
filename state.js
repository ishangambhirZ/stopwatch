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
