function State(window, template, step){
  this.window = window;
  this.template = template;
  this.step = step;
  this.resetState();
}
State.prototype = {
  resetState: function(){
    this.counter = 0;
    this.timer = 0;
    this.laps = [];
    this.status = 'STOPPED';
  },
  startWatch: function(){
    this.state = 'RUNNING';
    this.timer = this.runTimer();
  },
  pauseWatch: function(){
    this.state = 'PAUSED';
    this.window.clearInterval(this.timer);
    this.template.refreshRender(this.state);
  },
  recordLap: function(){
    var currentCounter = this.counter;
    this.template.saveLap(currentCounter);
  },
  resumeWatch: function(){
    this.state = 'RUNNING';
    this.timer = this.runTimer();
  },
  resetWatch: function(){
    this.state = 'STOPPED';
    this.window.clearInterval(this.timer);
    this.resetState();
    this.template.refreshRender(this.state);
  },
  runTimer: function(){
    return this.window.setInterval(() => {
      this.counter++;
      this.template.refreshRender(this.state, this.counter);
    }, this.step);
  },
  constructor: State
}
