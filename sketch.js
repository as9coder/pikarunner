var backround, backroundImg;
var pikachu,  pikachuImg;
var edges;
var apple, appleImg, applesGroup;
var score=0;
var pokeball, pokeballImg, pokeballGroup;
var gamestate= "setup";
var powerUp, powerScore= 0, powerUpImg;
var endPika, endPikaImg;
var pikaTh, jumpPika;
var reset, resetImg;
//var invisibleBlock;

function preload(){
    backroundImg= loadImage("background.jpg");
    pikachuImg= loadAnimation("pikachu.gif");
    appleImg= loadImage("apple.webp");
    pokeballImg= loadImage("pokeballi.gif");
    powerUpImg= loadImage("powerup.jpg");
    endPikaImg= loadAnimation("pikaCaughtImg.gif");
    pikaTh= loadAnimation("pikaVolt.gif");
    jumpPika= loadSound("jump.mp3");
    resetImg= loadAnimation("reset.gif");
}

function setup() {
 createCanvas(800, 600);

 backround= createSprite(200, 200,  200, 200);
 backround.addImage(backroundImg);
 backround.scale= 2.5;
 backround.velocityX= -4;
 
 pikachu= createSprite(100, 450, 30, 30);
  pikachu.addAnimation("pikarun", pikachuImg);
  pikachu.scale= 0.8;
 pikachu.setCollider("rectangle", 0, 20, 80, 120);
  //pikachu.debug= true;
  //pikachu.setCollider("circle", 0, 0, 50);


  applesGroup= new Group();
  pokeballGroup= new Group();

  powerUp= createSprite(50, 80, 20, 20);
  powerUp.addImage(powerUpImg);
  powerUp.scale= 0.3;

 edges= createEdgeSprites();

 reset= createSprite(400, 300, 20, 20);
 //reset.addAnimation("resetting", resetImg);
 reset.scale= 0.2;
 reset.visible= false;

 endPika= createSprite(400, 300);
 endPika.addAnimation("piakiscaught", endPikaImg);
 endPika.scale= 2;

 //invisibleBlock= createSprite(400, 200, 800, 10);
 
 
}

function draw() {
 background("lightblue");

 if (backround.x <50) {
  backround.x = backround.width /2;
}

if(pikachu.y>580){
  pikachu.y= 570;
}




 
 drawSprites();

 fill("red");
 

  if(gamestate=== "end"){
    backround.velocityX= 0;
   
  textSize(20);
  fill("black");
  text("GAME OVER, PRESS ANYWHERE ON SCREEN TO RESTART", 100, 300);

  endPika.visible= true; 

  if(mousePressedOver(endPika)){
    gamestate= "play";
    score= 0;
    powerScore= 0;
  }
 
 }

 

 if(gamestate=== "play"){

  backround.velocityX= -(5+ 3* frameCount/400);
  endPika.visible= false;
  pikachu.visible= true; 
  powerUp.visible= true;

  text("SCORE: "+score, 700, 50);
  text("POWER: "+ powerScore, 30, 20);
  
  if( pikachu.y> 200&& keyDown("up")){
    pikachu.velocityY= pikachu.velocityY- 8;
    jumpPika.play();
  }
 
  pikachu.velocityY= pikachu.velocityY+ 0.5;
  pikachu.collide(edges[3]);
  pikachu.collide(edges[2]);


  //spawnApples();

  if(applesGroup.isTouching(pikachu)){
    score= score+ 1;
    applesGroup.destroyEach();
  }

  //spawnPokeballs();

  if(pokeballGroup.isTouching(pikachu)){
    pikachu.visible= false;
    gamestate= "end";
  }

  if(frameCount%150 ===0){
    powerScore= powerScore+ 1;

    if(powerScore=== 10){
      powerScore= powerScore+ 0;
    }
  }

  var select;
  select= Math.round(random(1, 3));

  if(frameCount%200=== 0){
  if(select=== 1){
    spawnApples();
  }
  else if(select=== 2){
    spawnPokeballs();
  }
}

 }
 
if(mousePressedOver(powerUp)&& powerScore>= 10){
  gamestate= "mode";
  powerScore= powerScore- 10
}

if(gamestate=== "mode"){
  backround.velocityX= -100;
  //pikachu.changeAnimation(pikaTh);

  text("SCORE: "+score, 700, 50);
  text("POWER: "+ powerScore, 30, 20);
  
  pikachu.velocityY= 0;
  spawnApples();
  if(frameCount% 20=== 0){
    apple= createSprite(200, 550, 20, 20);
    apple.addImage(appleImg);
    apple.scale= 0.04;
    apple.x= Math.round(random(350, 550));
    apple.velocityX= -50;
    apple.lifetime= 30;
    applesGroup.add(apple);
  }

  if(applesGroup.isTouching(pikachu)){
    score= score+ 1;
    applesGroup.destroyEach();
  }

pokeballGroup.destroyEach();

  if(frameCount% 300 ===0){
    gamestate= "play";
  }
}

if(gamestate=== "setup"){
  endPika.visible= false;
  pikachu.visible= false;
  powerUp.visible= false;

  textSize(30);
  text("INSTRUCTIONS:", 200, 100);
  text("USE UP ARROW KEY TO JUMP PIKACHU(THE YELLOW", 10, 200);
  text(" POKEMON). COLLECT APPLES AND AVOID POKEBALLS. ", 10, 250);
  text("WHEN THE GAME WILL START, YOU WILL BE ABLE TO", 10, 300);
  text(" SEE POWER AND APPLES COLLECTED. WHEN ", 10, 350);
  text("POWER IS 10, YOU CAN PRESS THE BUTTON AT TOP", 10, 400);
  text("(SNORLAX, WITH BIG WHITE STOMACH) TO POWERUP.", 10, 450);

  if(mouseIsPressed){
    gamestate= "play";
  }
}


}

function spawnApples(){
  //if(frameCount% 200=== 0){
    apple= createSprite(200, 550, 20, 20);
    apple.addImage(appleImg);
    apple.scale= 0.04;
    apple.x= Math.round(random(350, 550));
    apple.velocityX= -5;
    apple.lifetime= 120;
    applesGroup.add(apple);
  //}
}

function spawnPokeballs(){
  //if(frameCount%300===0){
  pokeball= createSprite(300, 550, 20, 20);
  pokeball.setCollider("circle", 10, 10);
  //pokeball.debug= true;
  pokeball.x= Math.round(random(400, 550));
  pokeball.addImage(pokeballImg);
  pokeball.scale= 0.15;
  pokeball.velocityX= -5;
  pokeball.lifetime= 120;
  pokeballGroup.add(pokeball);
  //}
}
