describe("Events", function() {
    var windowObj, templateObj, stateObj, eventObj;
    beforeEach(function() {
        windowObj = {
            test: "1",
            MutationObserver: function() {
                this.firstArgumentCheck = arguments[0];
                var self = this;
                this.disconnect = function() {

                };
                this.observe = function() {
                    self.targetNodeCheck = arguments[0];
                    self.configCheck = arguments[1];
                };
            }
        };
        templateObj = {
            test: "2",
            templatesContainer: "body",
            startButton: {
                addEventListener: function() {}
            },
            pauseButton: {
                addEventListener: function() {}
            },
            lapButton: {
                addEventListener: function() {}
            },
            resumeButton: {
                addEventListener: function() {}
            },
            resetButton: {
                addEventListener: function() {}
            },
            templateIsRendered: function() {

            },
            setupVariables: function() {

            },
            refreshRender: function() {

            }
        };
        spyOn(templateObj.startButton, 'addEventListener');
        spyOn(templateObj.pauseButton, 'addEventListener');
        spyOn(templateObj.lapButton, 'addEventListener');
        spyOn(templateObj.resumeButton, 'addEventListener');
        spyOn(templateObj.resetButton, 'addEventListener');
        stateObj = {
            test: "3",
            status: "testStatus",
            startWatch: {bind: function(){}},
            pauseWatch: {bind: function(){}},
            recordLap: {bind: function(){}},
            resumeWatch: {bind: function(){}},
            resetWatch: {bind: function(){}}
        };
        spyOn(stateObj.startWatch, 'bind');
        spyOn(stateObj.pauseWatch, 'bind');
        spyOn(stateObj.recordLap, 'bind');
        spyOn(stateObj.resumeWatch, 'bind');
        spyOn(stateObj.resetWatch, 'bind');
        eventObj = new Events(windowObj, templateObj, stateObj);
    });
    it("should set window, template, state properties when instantiated", function() {
        expect(eventObj.window).toEqual(jasmine.objectContaining({
            test: "1"
        }));
        expect(eventObj.template).toEqual(jasmine.objectContaining({
            test: "2"
        }));
        expect(eventObj.state).toEqual(jasmine.objectContaining({
            test: "3"
        }));
    });
    it("should set observer property when stopWatchAttached is called", function() {
        eventObj.stopWatchAttached();
        expect(eventObj.observer instanceof windowObj.MutationObserver).toEqual(true);
        spyOn(eventObj, 'stopWatchObserverCallback');
        spyOn(eventObj, 'addEventListeners');
        expect(eventObj.observer.targetNodeCheck).toEqual("body");
        expect(eventObj.observer.configCheck).toEqual(jasmine.objectContaining({
            childList: true
        }));
    });
    it("should setup requirements as soon as stopWatchObserverCallback is fired", function() {
        spyOn(eventObj.template, 'refreshRender');
        spyOn(eventObj.template, 'templateIsRendered');
        spyOn(eventObj.template, 'setupVariables');
        eventObj.stopWatchAttached();
        spyOn(eventObj.observer, 'disconnect');
        eventObj.stopWatchObserverCallback();
        expect(eventObj.eventsMapping.length).toEqual(5);
        expect(eventObj.template.refreshRender).toHaveBeenCalledWith("testStatus");
        expect(eventObj.template.templateIsRendered).toHaveBeenCalled();
        expect(eventObj.template.setupVariables).toHaveBeenCalled();
        expect(eventObj.observer.disconnect).toHaveBeenCalled();
    });
})
