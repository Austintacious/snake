window.onload = function() {
  //dynamically create the canvas object in the HTML
  //at this point, it's not attached to the body of the page
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      score = 0,
      level = 0,
      direction = 0,
      snake = new Array(3);

  //Initialize the matrix
  var map = new Array(20);
  for (var i = 0; i < map.length; i++) {
    map[i] = new Array(20);
  }

  //using a 20x20 matrix,
  //each slot is 10x10px, 
  //plus 20px to accomodate score info,
  //and 4px for a border
  canvas.width = 204;
  canvas.height = 224;

  //attach the canvas
  var body = document.getElementByTagName('body')[0];
  body.appendChild(canvas);

  //Add the snake
  map = generateSnake(map);

  //Add the food
  map = generateFood(map);
  drawGame();

  function drawGame() {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw border and score
    drawMain();
    //Start cycling the matrix
    for (var x = 0; x < map.length; x++) {
      for (var y = 0; y < map[0].length; y++) {
        if (map[x][y] === 1) {
          ctx.fillStyle = 'black';
          ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
        }
      }
    }
  }

  function drawMain() {
    //draw a 2px-thick border onto canvas
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black'

    //The border is drawn on the outside
    //but we need to leave space for the interface
    ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

    //Display border and score/level
    context.font = '12px sans-serif';
    context.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
  }

  function generateFood(map) {
    //Generate a random position for rows and columns
    var roundX = Math.round(Math.random() * 19),
        roundY = Math.round(Math.random() * 19);

    //Make sure food doesn't appear where the snake is
    while (map[roundX][roundY] == 2) {
      var roundX = Math.round(Math.random() * 19),
          roundY = Math.round(Math.random() * 19); 
    }

    map[roundX][roundY] = 1;

    return map;
  }

  function generateSnake(map) {
    //Generate a random position for the row & column of the head
    var roundX = Math.round(Math.random() * 19),
        roundY = Math.round(Math.random() * 19);

    //Leave space for the rest of the body
    while ((roundX - snake.length) < 0) {
      roundX = Math.round(Math.random() * 19);
    }

    for (var i = 0; i < snake.length; i++) {
      snake[i] = { x: roundX - i, y: roundY };
      map[roundX - i][roundY] = 2;
    }
    return map;
  }

};