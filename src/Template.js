function Template(document, templatesContainerQuerySelector, templateType) {
    // this.document = document;
    // this.templatesContainer = this.document.querySelector(templatesContainerQuerySelector);
    // this.templateType = templateType;
    // this.templateRendered = false;
}
Template.prototype = {
    // templatesMap: {
    //   analog: analogTemplate,
    //   digital: digitalTemplate
    // },
    //This should render the template according to templateType
    renderTemplate: function() {
        this.templatesContainer.insertAdjacentHTML('afterBegin', this.templateToRender);
    },
    // renderTemplate: function() {
    //     var templateToRender = this.templatesMap[this.templateType];
    //     this.templatesContainer.innerHTML = templateToRender;
    // },
    //This sets the template state that it has been rendered and is now ready to set variables
    templateIsRendered: function() {
        this.templateRendered = true;
    },
    //This should setup the buttons for listening the events
    setupVariables: function() {
        this.startButton = this.document.getElementById("start");
        this.lapButton = this.document.getElementById("lap");
        this.pauseButton = this.document.getElementById("pause");
        this.resumeButton = this.document.getElementById("resume");
        this.resetButton = this.document.getElementById("reset");
        this.timerDiv = this.document.getElementById("timer");
        this.minutesDiv = this.document.getElementById("minutes");
        this.secondsDiv = this.document.getElementById("seconds");
        this.millisecondsDiv = this.document.getElementById("milliseconds");
        this.lapsList = this.document.getElementById('laps');
    },
    //This should update the dom according to the status which can be running, stopped, paused
    refreshRender: function(state, counter) {
        switch (state) {
            case 'RUNNING':
                this.timerRunnning(state, counter);
                break;
            case 'PAUSED':
                this.timerPaused();
                break;
            case 'STOPPED':
                this.timerStopped();
                break;
        }
        this.setCurrenState(state);
    },
    setCurrenState: function(state) {
        this.currentState = state;
    },
    //This should add additional lap after checking the status and lapTime
    //The lap time should be larger than the previous lap times and the status shall be running
    saveLap: function(lapTime) {
        var node = this.document.createElement("li");
        var textnode = this.document.createTextNode(this.formatTime(lapTime));
        node.appendChild(textnode);
        this.lapsList.appendChild(node);
    },
    timerStopped: function() {
        this.hideNodes([this.lapButton, this.pauseButton, this.resumeButton, this.resetButton]);
        this.showNodes([this.startButton]);
        this.clearTimer();
        this.clearLapsList();
    },
    timerRunnning: function(state, counter) {
        if (this.currentState !== state) {
            this.hideNodes([this.startButton, this.resumeButton, this.resetButton]);
            this.showNodes([this.lapButton, this.pauseButton]);
        }
        this.renderTimer(counter);
    },
    timerPaused: function() {
        this.hideNodes([this.startButton, this.lapButton, this.pauseButton]);
        this.showNodes([this.resumeButton, this.resetButton]);
    },
    clearLapsList: function() {
        var node = this.lapsList;
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    },
    clearTimer: function() {
        this.displayTime(0);
    },
    renderTimer: function(counter) {
        this.displayTime(counter);
    },
    displayTime: function(counter) {
        var time = this.getTimeObj(counter);
        this.minutesDiv.innerHTML = time.minutes;
        this.secondsDiv.innerHTML = time.seconds;
        this.millisecondsDiv.innerHTML = time.milliseconds;
    },
    formatTime: function(counter) {
        var time = this.getTimeObj(counter);
        return `${time.minutes}:${time.seconds}:${time.milliseconds}`;
    },
    getTimeObj: function(counter) {
        var timeObj = {};
        var seconds = parseInt(counter / 100);
        var minutes = parseInt(seconds / 60);
        var hours = parseInt(minutes / 60);
        timeObj.milliseconds = this.addPadding(counter % 100);
        timeObj.seconds = this.addPadding(seconds % 60);
        timeObj.minutes = this.addPadding(minutes);
        timeObj.hours = this.addPadding(hours);
        timeObj.minutesInTens = parseInt(timeObj.minutes.charAt(0));
        timeObj.minutesInOnes = parseInt(timeObj.minutes.charAt(1));
        timeObj.secondsInTens = parseInt(timeObj.seconds.charAt(0));
        timeObj.secondsInOnes = parseInt(timeObj.seconds.charAt(1));
        timeObj.millisecondsInTens = parseInt(timeObj.milliseconds.charAt(0));
        timeObj.millisecondsInOnes = parseInt(timeObj.milliseconds.charAt(1));
        return timeObj;
    },
    addPadding: function(n) {
        return n < 10 ? `0${n}` : `${n}`;
    },
    hideNodes: function(nodes) {
        nodes.forEach((node) => this.hide(node));
    },
    showNodes: function(nodes) {
        nodes.forEach((node) => this.show(node));
    },
    hide: function(node) {
        node.style.display = 'none';
    },
    show: function(node) {
        node.style.display = 'block';
    },
    constructor: Template
}
