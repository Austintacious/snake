//Set canvas height and width, 
//tabindex makes canvas focusable
var width = window.innerWidth;
var height = window.innerHeight;
var canvas = document.getElementById("snake");
canvas.width = width;
canvas.height = height;
canvas.setAttribute('tabindex', 1);
var ctx = canvas.getContext("2d");

//Controls game speed
var fps = 1000 / 20;
var cell_width = 20;
var food = {x:0, y:0};
var snake = [];

//Starting length & direction of the snake
var length = 5;
var direction = 'right';
var direction_queue = 'right';

//Painting the background
//Drawing a filled rectangle, starting at coordinates 0,0
function paint_background() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//Painting the cell
function paint_cell(x, y, fill, stroke) {
  ctx.fillStyle = fill;
  ctx.fillRect(x*cell_width, y*cell_width, cell_width, cell_width);
  //add the stroke if it is defined
  if(typeof stroke !== "undefined"){
    ctx.strokeStyle = stroke;
    ctx.strokeRect(x*cell_width, y*cell_width, cell_width, cell_width);
  }
}

//Create the snake
function create_snake() {
  snake = [];
  for(i = length - 1; i >= 0; i--) {
    snake.push({x: i, y: 0});
  }
}

//Paint the snake
function paint_snake() {
  for(i = 0; i < snake.length; i++) {
    paint_cell(snake[i].x, snake[i].y, "4C1B33", "2D6960");
  }
}

//Main game loop
function game(){
  ctx.beginPath();
  paint_background();
  paint_snake();
  var head = snake[0];
  //Check for wall collisions
  if(head.x < 0 || head.x == width / cell_width || head.y < 0 || head.y == height / cell_width) {
    new_game();
    return;
  }
  //Ouroboros check!
  for(i = 1; i < snake.length; i++) {
    if(head.x == snake[i].x && head.y == snake[i].y) {
      new_game();
      return;
    }
  }
}

function move_snake() {
  //determine the coordinates of the head and calculate its' new position
  var x = snake[0].x;
  var y = snake[0].y;
  direction = direction_queue;
  if (direction == "right") x++;
  else if(direction == "left") x--;
  else if(direction == "top") y--;
  else if(direction == "bottom") y++;

  //pop off the tail and make it the new head... GENIUS!
  var tail = snake.pop();
  tail.x = x;
  tail.y = y;
  snake.unshift(tail); 
}

function change_direction(keycode) {
  //as long as the player doesn't move in the opposite direction, set it in the queue
  if(keycode == 37 && direction != "right") direction_queue = "left";
  else if(keycode == 38 && direction != "bottom") direction_queue = "top";
  else if(keycode == 39 && direction != "left") direction_queue = "right";
  else if(keycode == 40 && direction != "top") direction_queue = "bottom";
}

function check_collision(x1, y1, x1, y2) {
  if(x1 == x2 && y1 == y2)
    return true;
  else return false;
}

function new_game(){
  direction = "right";
  direction_queue = "right";
  create_snake();
  if(typeof loop !== "undefined")
    clearInterval(loop);
  loop = setInterval(game, fps);
  canvas.onkeydown = function(evt) {
    evt = evt || window.event;
    change_direction(evt.keycode);
  }
}


new_game();