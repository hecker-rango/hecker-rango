// Set up canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up images
const background = new Image();
background.src = "https://i.imgur.com/VJyI5or.png";
const character = new Image();
character.src = "https://i.imgur.com/5QF6rHq.png";
const enemy = new Image();
enemy.src = "https://i.imgur.com/YZbrn30.png";
const supply = new Image();
supply.src = "https://i.imgur.com/6F2uh4u.png";

// Game variables
let gameState = "start";
let health = 100;
let ammo = 6;
let supplies = 0;
let enemies = [
  { x: 700, y: 300 },
  { x: 500, y: 100 },
  { x: 300, y: 400 },
  { x: 100, y: 200 }
];
