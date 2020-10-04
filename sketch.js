var monkey , monkey_running;

var ground;

var bananas ,bananaImage;

var obstacle, obstacleImage;

var bananagroup, obstaclesgroup;

var survivaltime; 

var score;

function preload(){
  
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //createCanvas(400,400);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10); 
  ground.velocityX=-5;
  ground.x=ground.width/2;
  
  obstaclesgroup=new Group();
  bananagroup= new Group();
  
  survivaltime=0;
  
  score=0;
  
}


function draw() {
  background ("brown");
  
   if (ground.x<0){
    ground.x=ground.width/2;
  }
  
   if(keyDown("space")){
   monkey.velocityY=-12;
   }
  
   monkey.velocityY=monkey.velocityY+0.8;
   monkey.collide(ground);
  
    bananaspawn();
  obstaclespawn();
   
  stroke("white");
  textSize(15);
  fill("white");
  text("Score:"+score,300,50);
  
  if(obstaclesgroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesgroup.setVelocityXEach(0);
        bananagroup.setVelocityXEach(0);
        obstaclesgroup.setLifetimeEach(-1);
        bananagroup.setLifetimeEach(-1);
    
    
    }
  
  
  if(bananagroup.isTouching(monkey)){
    score=score+1;
    bananagroup.destroyEach();
  }

  
  stroke("black");
  textSize(15);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivaltime, 50,50);
  
   drawSprites();
}


function bananaspawn(){
  if(frameCount%80===0){
    bananas=createSprite(600,250,40,10);
    bananas.y=Math.round(random(120,200));
    bananas.velocityX=-4;
    
    
    bananas.lifetime=300;
    monkey.depth=bananas.depth+1;
    
    bananas.addImage(bananaImage);
    bananas.scale=0.1;
    
    bananagroup.add(bananas);
    
  }

}



function obstaclespawn(){
  if (frameCount % 300===0){
  obstacle=createSprite(800,320,10,40);
  obstacle.velocityX=-5;
    
    
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
    
  obstacle.lifetime=300;
  obstaclesgroup.add(obstacle);
  }
  
}





