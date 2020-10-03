var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var spookySound;
var gameState = "play";

function preload(){
  
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png"); 
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
  
  
  
  
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 3;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.5;
  
  
  
  
}

function draw(){
  background("white");
  
  if(gameState === "play"){
    if(tower.y > 400){
    
    tower.y = 300;
  }
  
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 4;
    
  }
  
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 4;
    
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
    
    
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
    
  }
  
  if(ghost.y > 600 || invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy();
    gameState = "end";
  }
    
  
  
  
  spawnDoor();
  spawnClimber();
  drawSprites();
    
    
    
  }
  if(gameState === "end"){
    
    stroke("yellow");
    fill("yellow");
    textSize(50);
    text("Game Over",300,300);
    
  }
  
  
  
  
}

function spawnDoor(){
  if(frameCount % 150 === 0){
    door = createSprite(200,50);
    door.addImage(doorImage);
    door.velocityY = 3;
    door.x = Math.round(random(120,400));
    door.lifetime = 200;
    doorGroup.add(door);
    
    ghost.depth = door.depth;
    ghost.depth ++ ;
    
    
  }
  
  
}

function spawnClimber(){
  if(frameCount % 150 === 0){
    climber = createSprite(200,100);
    climber.addImage(climberImage);
    climber.velocityY = 3;
    climber.x = door.x;
    climber.lifetime = 200;
    
    climberGroup.add(climber);
    
    invisibleBlock = createSprite(200,105);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x  = door.x;
    invisibleBlock.velocityY = 3;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
  }
  
  
}