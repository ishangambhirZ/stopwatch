var x = (function(){
  var startButton = document.getElementById("start");
  var lapButton = document.getElementById("lap");
  var pauseButton = document.getElementById("pause");
  var resumeButton = document.getElementById("resume");
  var resetButton = document.getElementById("reset");
  var timerDiv = document.getElementById("timer");
  var lapsList = document.getElementById('laps');
  var timer = {
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  };
  var counter = 0;
  var recordedTimers = [];
  var interval;
  var setCurrentTimer = function(){
    timer.milliseconds = counter%100;
    var seconds = parseInt(counter/100);
    timer.seconds = seconds%60;
    timer.minutes = parseInt(seconds/60);
  }
  var printTimer = function(curTimer=timer){
    document.getElementById('minutes').innerHTML = curTimer.minutes;
    document.getElementById('seconds').innerHTML = curTimer.seconds;
    document.getElementById('milliseconds').innerHTML = curTimer.milliseconds;
  }
  var getCurrentTimer = function(){
    printTimer(timer);
  }
  var resume = function(){
    if(!interval){
      interval = setInterval(function(){
        counter++;
        setCurrentTimer();
        printTimer();
      }, 1);
    }
  }
  var pause = function(){
    clearInterval(interval);
    interval = null;
  }
  var lap = function(){
    var curTimer = JSON.parse(JSON.stringify(timer));
    recordedTimers.push(curTimer);
    document.getElementById('laps').innerHTML += `<li>
      <div class="timer">
        <span class="minutes">${curTimer.minutes}</span>:<span class="seconds">${curTimer.seconds}</span>:<span class="milliseconds">${curTimer.milliseconds}</span>
      </div>
    </li>`
  }
  var getTimers = function(){
    recordedTimers.forEach((curTimer) => printTimer(curTimer));
  }
  var reset = function(){
    timer = {
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    };
    counter = 0;
    recordedTimers = [];
    interval = null;
  }
  function startAction(){
    resume();
    startButton.style.display='none';
    lapButton.style.display='block';
    pauseButton.style.display='block';
    timerDiv.style.display='block';
    lapsList.style.display='block';
  }
  function lapAction(){
    lap();
  }
  function pauseAction(){
    pause();
    lapButton.style.display='none';
    pauseButton.style.display='none';
    resumeButton.style.display='block';
    resetButton.style.display='block';
  }
  function resumeAction(){
    resume();
    resumeButton.style.display='none';
    resetButton.style.display='none';
    lapButton.style.display='block';
    pauseButton.style.display='block';
  }
  function resetAction(){
    reset();
    lapButton.style.display='none';
    pauseButton.style.display='none';
    resumeButton.style.display='none';
    resetButton.style.display='none';
    startButton.style.display='block';
    lapsList.style.display='none';
    printTimer();
  }
  var bindEvents = function(){
    startButton.style.display='block';
    resumeButton.style.display='none';
    resetButton.style.display='none';
    lapButton.style.display='none';
    pauseButton.style.display='none';
    lapsList.style.display='none';
    printTimer();
    startButton.addEventListener('click', startAction);
    lapButton.addEventListener('click', lapAction);
    pauseButton.addEventListener('click', pauseAction);
    resumeButton.addEventListener('click', resumeAction);
    resetButton.addEventListener('click', resetAction);
  }
  bindEvents();
})();
