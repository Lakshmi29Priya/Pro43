class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage("Milk.png");
    }
updateFoodstock(foodStock){
    this.foodStock=foodStock;
}
getFedTime(lastFed){
    this.lastFed=lastFed;
}
deductFood(){
    if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
    }
}
getFoodStock(){
    return this.foodStock;
}
display(){
    var x=80,y=100;
imageMode(CENTER);
image(this.image,x,y,50,50);
x=x+30;
}
}