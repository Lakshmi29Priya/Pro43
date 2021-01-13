//Create variables here
var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var foodObj;
function preload()
{
	//load images here
dogImg=loadImage("dogImg.png");
dogImg1=loadImage("dogImg1.png");
}

function setup() {
  database=firebase.database();

  createCanvas(1000, 400);
  foodObj=new Food();
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
feed=createButton("Feed Dog");
feed.position(700,90);
feed.mousePressed(feedDog);
addFood=createButton("Add Food");
addFood.position(800,90);
addFood.mousePressed(addFoods)
}


function draw() {  
background(46,139.87);
foodObj.display();
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val();
});
fill(255,255,254);
textSize(15);
if(lastFed>12){
  text("Last Feed: "+lastFed%12+"PM",350,350);
}
else if(lastFed==0){
  text("Last Feed:12AM",350,30);
}
else{
  text("Last Feed:"+lastFed+"AM",350,30);
}
drawSprites();
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(dogImg1);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}