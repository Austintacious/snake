window.onload = function() {
  //dynamically create the canvas object in the HTML
  //at this point, it's not attached to the body of the page
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

  //using a 20x20 matrix,
  //each slot is 10x10px, 
  //plus 20px to accomodate score info,
  //and 4px for a border
  canvas.width = 204;
  canvas.height = 224;

  //attach the canvas
  var body = document.getElementByTagName('body')[0];
  body.appendChild(canvas);

  //draw a 2px-thick border onto canvas
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black'

  //The border is drawn on the outside
  //but we need to leave space for the interface
  ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);
};