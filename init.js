window.onload = function(){
  let template = new AnalogTemplate(document, 'body');
  let state = new State(window, template, 10);
  let eventsObj = new Events(window, template, state);
  template.renderTemplate();
}
