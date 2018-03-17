function Events(window, template, state) {
    this.window = window;
    this.template = template;
    this.state = state;
    this.stopWatchAttached();
}
Events.prototype = {
    //This is mapping of the node elements with the functions on particular event
    addEventsMapping: function() {
        this.eventsMapping = [{
                node: this.template.startButton,
                event: 'click',
                listener: this.state.startWatch
            },
            {
                node: this.template.pauseButton,
                event: 'click',
                listener: this.state.pauseWatch
            },
            {
                node: this.template.lapButton,
                event: 'click',
                listener: this.state.recordLap
            },
            {
                node: this.template.resumeButton,
                event: 'click',
                listener: this.state.resumeWatch
            },
            {
                node: this.template.resetButton,
                event: 'click',
                listener: this.state.resetWatch
            }
        ]
    },
    //This listens to the event when stop watch is attached to the document.
    stopWatchAttached: function() {
        var MutationObserver = this.window.MutationObserver;
        var targetNode = this.template.templatesContainer
        var mutationConfig = {
            childList: true
        };
        this.observer = new MutationObserver(this.stopWatchObserverCallback.bind(this));
        this.observer.observe(targetNode, mutationConfig);
    },
    stopWatchObserverCallback: function() {
        if (!this.template.templateRendered) {
            this.template.templateIsRendered();
            this.template.setupVariables();
            this.template.refreshRender(this.state.status);
            this.addEventsMapping();
            this.addEventListeners();
        }
        this.observer.disconnect();
    },
    addEventListeners: function() {
        this.eventsMapping.forEach(({
            node,
            event,
            listener
        }) => {
            node.addEventListener(event, listener.bind(this.state));
        });
    },
    constructor: Events
}
