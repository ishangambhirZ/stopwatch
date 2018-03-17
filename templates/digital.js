var DigitalTemplate = function(document, templatesContainerQuerySelector) {
    this.document = document;
    this.templatesContainer = this.document.querySelector(templatesContainerQuerySelector);
    this.templateRendered = false;
    this.currentState = 'STOPPED';
    this.templateToRender = digitalTemplate;
}
DigitalTemplate.prototype = Object.create(Template.prototype);
DigitalTemplate.prototype.constructor = DigitalTemplate;
DigitalTemplate.prototype.setupVariables = function(){
  Template.prototype.setupVariables.call(this);
  this.minutesInTens = this.document.getElementById('minutes-in-tens');
  this.minutesInOnes = this.document.getElementById('minutes-in-ones');
  this.secondsInTens = this.document.getElementById('seconds-in-tens');
  this.secondsInOnes = this.document.getElementById('seconds-in-ones');
  this.millisecondsInTens = this.document.getElementById('milliseconds-in-tens');
  this.millisecondsInOnes = this.document.getElementById('milliseconds-in-ones');
}
DigitalTemplate.prototype.displayTime = function(counter) {
  var time = this.getTimeObj(counter);
  this.minutesInTens.innerHTML = time.minutesInTens;
  this.minutesInOnes.innerHTML = time.minutesInOnes;
  this.secondsInTens.innerHTML = time.secondsInTens;
  this.secondsInOnes.innerHTML = time.secondsInOnes;
  this.millisecondsInTens.innerHTML = time.millisecondsInTens;
  this.millisecondsInOnes.innerHTML = time.millisecondsInOnes;
}
//https://css-tricks.com/infinite-all-css-scrolling-slideshow/
var digitalTemplate = `
<button id='start'>Start</button>
<button id='lap'>Lap</button>
<button id='pause'>Pause</button>
<button id='resume'>Resume</button>
<button id='reset'>Reset</button>
<div id='timer'>
  <div id='minutes' class='timer-section'>
    <div id="minutes-in-tens" class='timer-section-subpart tens'>
      <span>0</span><br>
      <span>1</span><br>
      <span>2</span><br>
      <span>3</span><br>
      <span>4</span><br>
      <span>5</span><br>
      <span>6</span><br>
      <span>7</span><br>
      <span>8</span><br>
      <span>9</span>
    </div>
    <div id="minutes-in-ones" class='timer-section-subpart ones'>
      <span>0</span><br>
      <span>1</span><br>
      <span>2</span><br>
      <span>3</span><br>
      <span>4</span><br>
      <span>5</span><br>
      <span>6</span><br>
      <span>7</span><br>
      <span>8</span><br>
      <span>9</span>
    </div>
  </div>
  <div class='timer-section-subpart delimmiter'>:</div>
  <div id='seconds' class='timer-section'>
    <div id="seconds-in-tens" class='timer-section-subpart tens'>
      <span>0</span><br>
      <span>1</span><br>
      <span>2</span><br>
      <span>3</span><br>
      <span>4</span><br>
      <span>5</span><br>
      <span>6</span><br>
      <span>7</span><br>
      <span>8</span><br>
      <span>9</span>
    </div>
    <div id="seconds-in-ones" class='timer-section-subpart ones'>
      <span>0</span><br>
      <span>1</span><br>
      <span>2</span><br>
      <span>3</span><br>
      <span>4</span><br>
      <span>5</span><br>
      <span>6</span><br>
      <span>7</span><br>
      <span>8</span><br>
      <span>9</span>
    </div>
  </div>
  <div class='timer-section-subpart delimmiter'>:</div>
  <div id='milliseconds' class='timer-section'>
    <div id="milliseconds-in-tens" class='timer-section-subpart tens'>
      <span>0</span><br>
      <span>1</span><br>
      <span>2</span><br>
      <span>3</span><br>
      <span>4</span><br>
      <span>5</span><br>
      <span>6</span><br>
      <span>7</span><br>
      <span>8</span><br>
      <span>9</span>
    </div>
    <div id="milliseconds-in-ones" class='timer-section-subpart ones'>
      <span>0</span><br>
      <span>1</span><br>
      <span>2</span><br>
      <span>3</span><br>
      <span>4</span><br>
      <span>5</span><br>
      <span>6</span><br>
      <span>7</span><br>
      <span>8</span><br>
      <span>9</span>
    </div>
  </div>
</div>
<ol id='laps'>
</ol>
`
