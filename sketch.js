var spring, sheild, magnet, magnet2, magnet3;
var coil, bg;
var platform;
var platformgroup;
var PLAY = 1;
var END = 0;
var gameState = 1;
var obstaclegroup;
var sheildgroup;
var score = 0;
var form;
var START = 2;

function preload(){
spring = loadImage("Spring.png");
sheildimage = loadImage("Sheild_Powerup.png");
magnet = loadImage("Magnet.png");
magnet2 = loadImage("Magnet2.png");
magnet3 = loadImage("Magnet3.png")
}

function setup(){
    createCanvas(displayWidth - 20, displayHeight - 20);
    bg = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
    bg.shapeColor = "yellow";
    bg.velocityY = 2;
    coil = createSprite(displayWidth/2, displayHeight/2, 10, 10);
    coil.addImage(spring);
    platformgroup = createGroup()
    obstaclegroup = createGroup()
    sheildgroup = createGroup()
    
}

function draw(){

  if(gameState===PLAY){

  background("orange");
  
  if(keyDown("space")&&touches.length>0){
    coil.velocityY = -10;
  }
  coil.velocityY = coil.velocityY + 1;
  if(bg.y>displayHeight-400){
    bg.y = displayHeight/2;
  }
  if(keyDown("right")&&touches.length>0){
      coil.x = coil.x + 5;
  }
  if(keyDown("left")&&touches.length>0){
      coil.x = coil.x - 5;
  }
  SpawnPlatform()
  SpawnObstacles()
  Sheild()
  if(platformgroup.isTouching(coil)){
    coil.velocityY = 0;
  }
  if(obstaclegroup.isTouching(coil)){
    gameState = END;
  }
  if(coil.y > displayHeight){
    gameState = END;
  }
  if(sheildgroup.isTouching(coil)){
    score = score + 50;
    sheildgroup.destroyEach()
  }
  drawSprites();
  strokeWeight(5);
  stroke("blue");
  fill("purple");
  textSize(30);
  text("Score: "+ score, displayWidth - 200, 100);
}
if(gameState===END){
  background("red");
  strokeWeight(10);
  stroke("blue");
  fill("green");
  textSize(50);
  text("Game Over", displayWidth/2-100, displayHeight/2);
}
}

function SpawnPlatform(){
  if(frameCount%250===0){
  platform = createSprite(displayWidth-400, -50, 200, 20);
  platform.shapeColor = "red"
  platform.x = Math.round(random(displayWidth-480, displayWidth-200));
  platform.velocityY = 1;
  coil.depth = platform.depth;
  coil.depth = coil.depth + 1;
  platformgroup.add(platform);
}}

function SpawnObstacles(){
  if(frameCount%150===0){
    var obstacle = createSprite(Math.round(random(100, displayWidth-100)), 0, 20, 20);
    obstacle.scale = 0.3;
    var rand = Math.round(random(1, 3));
    switch(rand){
      case 1: obstacle.addImage(magnet);
              break;
      case 2: obstacle.addImage(magnet2);
              break;
      case 3: obstacle.addImage(magnet3);
              break;
      default: break;
    }
    obstacle.velocityY = 2;
    obstaclegroup.add(obstacle);
  }
}

function Sheild(){
  if(frameCount%350===0){
    var sheild = createSprite(Math.round(random(100, displayWidth-100)), 0, 20, 20);
    sheild.addImage(sheildimage);
    sheild.velocityY = 2;
    sheild.scale = 0.5;
    sheildgroup.add(sheild);
  }
}