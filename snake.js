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
}

function new_game(){
  direction = "right";
  direction_queue = "right";
  create_snake();
  if(typeof loop !== "undefined")
    clearInterval(loop);
  loop = setInterval(game, fps);
}

new_game();