//Game States
var PLAY=1;
var END=0;
var gameState=PLAY;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOver;
var gameOversound;
var knifesound;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  //load sound here
  knifesound = loadSound("knifeSwoosh.mp3");
  gameOversound = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7

   //gameover
   gameOver=createSprite(300,300);
   gameOver.addImage(gameOverImage);
   gameOver.scale=2;
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);
  
  // Score variables and Groups
  score=0;
  fruitGroup  =new Group();
  monsterGroup=new Group();
}

function draw() {
  background("lightblue");
  //gameState
  if(gameState===PLAY){
    gameOver.visible=false;
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
        score=score+2
        fruitGroup.destroyEach();
        knifesound.play();
      }

    if(monsterGroup.isTouching(knife)){
      gameState=END;
      gameOversound.play();
      gameOver.visible=true;
    }
  }
    else if(gameState=END) {
       
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
      // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;

        
      }
    
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);

  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=600;
    //update below give line of code for increase fruitGroup speed by 4
    fruit.velocityX=-7
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX= 7;
      }
    }
    //incresing the score
    if(fruitGroup.isTouching(knife)){
      score=score+2;
      fruitGroup.destroyEach();
      knifesound.play();
      }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}