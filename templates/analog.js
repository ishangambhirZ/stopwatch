var AnalogTemplate = function(document, templatesContainerQuerySelector) {
    this.document = document;
    this.templatesContainer = this.document.querySelector(templatesContainerQuerySelector);
    this.templateRendered = false;
    this.templateToRender = analogTemplate;
    this.totalMinuteNeedleRotation = 0;
    this.totalSecondNeedleRotation = 0;
}
AnalogTemplate.prototype = Object.create(Template.prototype);
AnalogTemplate.prototype.constructor = AnalogTemplate;
AnalogTemplate.prototype.setupVariables = function() {
    Template.prototype.setupVariables.call(this);
    this.millisecondsHand = this.document.getElementById('milliseconds-hand');
    this.secondsHand = this.document.getElementById('seconds-hand');
    this.minutesHand = this.document.getElementById('minutes-hand');
}
AnalogTemplate.prototype.displayTime = function(counter) {
    if (counter === 0) {
        this.resetClock();
        return;
    }
    var time = this.getTimeObj(counter);
    var milliseconds = parseInt(time.milliseconds);
    var seconds = parseInt(time.seconds);
    var minutes = parseInt(time.minutes);
    var secondsRotation, minutesRotation;
    if (this.currentState == 'PAUSED') {
        secondsRotation = (seconds) * 6;
        minutesRotation = (minutes) * 6;
        this.rotateNode(this.secondsHand, this.totalSecondNeedleRotation);
        this.rotateNode(this.minutesHand, this.totalMinuteNeedleRotation);
    } else {
        secondsRotation = (seconds + 1) * 6;
        minutesRotation = (minutes + 1) * 6;
        this.rotateNode(this.millisecondsHand, milliseconds * 3.6);
        if (this.totalSecondNeedleRotation%360 !== secondsRotation%360) {
            this.totalSecondNeedleRotation += 6;
            this.rotateNode(this.secondsHand, this.totalSecondNeedleRotation);
        }
        if (this.totalMinuteNeedleRotation%360 !== minutesRotation%360) {
            this.totalMinuteNeedleRotation += 6;
            this.rotateNode(this.minutesHand, this.totalMinuteNeedleRotation);
        }
    }
}
AnalogTemplate.prototype.rotateNode = function(node, val) {
    node.style.transform = `rotate(${val}deg)`;
}
AnalogTemplate.prototype.resetClock = function(){
  this.millisecondsHand.style.transform = "rotate(0deg)";
  this.secondsHand.style.transitionDuration = "0s";
  this.secondsHand.style.transform = "rotate(0deg)";
  this.minutesHand.style.transitionDuration = "0s";
  this.minutesHand.style.transform = "rotate(0deg)";
  setTimeout(() => {
    this.secondsHand.style.transitionDuration = "1s";
    this.minutesHand.style.transitionDuration = "60s";
    this.totalMinuteNeedleRotation = 0;
    this.totalSecondNeedleRotation = 0;
  }, 100);
}
var analogTemplate = `
<button id='start'>Start</button>
<button id='lap'>Lap</button>
<button id='pause'>Pause</button>
<button id='resume'>Resume</button>
<button id='reset'>Reset</button>
<div id="frame">
    <div id="clock">
        <span id="one" class="numbers">1</span>
        <span id="two" class="numbers">2</span>
        <span id="three" class="numbers">3</span>
        <span id="four" class="numbers">4</span>
        <span id="five" class="numbers">5</span>
        <span id="six" class="numbers">6</span>
        <span id="seven" class="numbers">7</span>
        <span id="eight" class="numbers">8</span>
        <span id="nine" class="numbers">9</span>
        <span id="ten" class="numbers">10</span>
        <span id="eleven" class="numbers">11</span>
        <span id="twelve" class="numbers">12</span>
        <div id="center"></div>
        <div id="minutes-hand" class="needles"></div>
        <div id="seconds-hand" class="needles"></div>
        <div id="milliseconds-hand" class="needles"></div>
    </div>
</div>
<ol id='laps'>
</ol>
`;
