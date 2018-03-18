window.onload = function(){
  let template;
  if(confirm("Click Ok for Digital Stop Watch and Cancel for Analog Clock Watch")){
    template = new DigitalTemplate(document, 'body');
  }
  else{
    template = new AnalogTemplate(document, 'body');
  }
  let state = new State(window, template, 10);
  let eventsObj = new Events(window, template, state);
  eventsObj.stopWatchAttached();
  template.renderTemplate();
}
