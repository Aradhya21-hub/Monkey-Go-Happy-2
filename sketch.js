var PLAY = 1;
var END = 0;
var gameState=PLAY;
var gameOver,restart;

var monkey, monkey_running, monkey_collided;
var ground , groundImage;

var bananaGroup, bananaImage;

var obstaclesGroup, stoneImage;

var score;



function preload(){
  //monkey_running = loadAnimation("Monkey_01.png" , "Monkey_02.png" , //"Monkey_03.png" , "Monkey_04.png" , "Monkey_.05png" , "Monkey_06.png" , //"Monkey_07.png" , "Monkey_08.png" , "Monkey_09.png" , "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  
  bgImg = loadImage("jungle.jpg");
  
}

function setup(){
  createCanvas(400,400);
  
   monkey = createSprite(50,180,30,50);
  //monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.5;
  
   ground = createSprite(200,390,800,8);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  
  
    bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score=0;
  
  textSize(25);
textFont("Algerian");
textStyle(BOLD);
fill("black");
  
}

function draw() {
  background(bgImg);
  
   
  
   if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);

     
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
     if(monkey.isTouching(bananaGroup)){
  bananaGroup.destroyEach();
  score = score+1;
}
    
     //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 159){
      monkey.velocityY = -12 ;
    
    }
     
     
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //spawn the banana
    spawnBanana();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when monkey is touching the obstacle
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
      
      
    }
      
   }
  monkey.collide(ground);
   
     drawSprites();
  
  
   text("Score: "+ score,117,74);
  
   }
  
  function spawnBanana(){
    if (frameCount % 80 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    
    banana.lifetime = 200;
    
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
      bananaGroup.add(banana);
  
  

    }
  }
  
  function spawnObstacles() {
  if (frameCount % 150 === 0) {
    var stone = createSprite(400,350,40,10);
    stone.velocityX = -4;
    stone.addImage(stoneImage);
    
     stone.scale = 0.2;
    stone.lifetime = 300;
    
    obstaclesGroup.add(stone);
  }
  }