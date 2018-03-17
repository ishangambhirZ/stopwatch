window.onload = function(){
  let template = new DigitalTemplate(document, 'body');
  let state = new State(window, template, 1);
  let eventsObj = new Events(window, template, state);
  template.renderTemplate();
}
