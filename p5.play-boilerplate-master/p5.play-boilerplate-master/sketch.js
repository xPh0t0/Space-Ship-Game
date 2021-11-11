var spaceImg, space;
var rocket, rocketImg;
var meteorite, meteoriteImg, meteoritesGroup;
var gameState = "play";
var score = 0;
var fire, fireImg, fireGroup;

function preload(){
spaceImg = loadImage("background.jpg");
rocketImg = loadImage("rocket.png");
meteoriteImg = loadImage("meteorite.png");
fireImg = loadImage("fire.png");
}

function setup() {
  createCanvas(800,400);
  space = createSprite(400,200);
  space.addImage(spaceImg); 
  space.scale = 1.5;
  space.velocityY = 2; 

  rocket = createSprite(400,300)
  rocket.addImage(rocketImg);
  rocket.scale = 0.3

  meteoritesGroup = new Group();
  fireGroup = new Group();
}

function draw() {
  background(0);
  if(gameState==="play"){

  score = score+Math.round(getFrameRate()/60);
  
  if(space.y>200){
    space.y=space.height/2;
  } 

  if(keyIsDown(LEFT_ARROW)){
    rocket.x = rocket.x-7;
  }

  if(keyIsDown(RIGHT_ARROW)){
    rocket.x = rocket.x+7;
  }

  if(keyPressed("space")){
    fire = createSprite(rocket.x,rocket.y);
    fire.addImage(fireImg);
    fire.velocityY = -5;
    fire.lifetime = 400;
    fireGroup.add(fire);
  }

  if(meteoritesGroup.isTouching(rocket)){
    gameState = "end";
  }

  spawnMeteorites();
  drawSprites();
}
else{
  fill("white")
  text("Game Over",400,250)
}
fill("white");
textSize(25);
text("Score: " +score,width-150,50);
}

function spawnMeteorites(){
  if(frameCount % 60 === 0){
    meteorite = createSprite(Math.round(random(100,700)),0)
    meteorite.addImage(meteoriteImg);
    meteorite.velocityY = 2;
    meteorite.scale = 0.1
    meteorite.lifetime = 400;
    meteoritesGroup.add(meteorite);
  }
}