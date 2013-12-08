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
var cell_width = 10;
var food = {x:0, y:0};
var snake = [];
//Starting length of the snake
var length = 5;
var direction = 'right';
var direction_queue = 'right';