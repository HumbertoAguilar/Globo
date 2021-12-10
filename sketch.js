var balloon,balloonImage1,balloonImage2;
// crea aquí la base de datos y la variable de posición 
var height, database;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonheight=database.ref('ballon/height');
  balloonheight.on("value",readHeight,showError);

  textSize(20); 
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);
if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la izquierda
   // balloon.x=balloon.x-5
   updateHeight(-5,0);
  }
   if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la derecha
   // balloon.x=balloon.x+5
    updateHeight(5,0)
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección ascendente
  //  balloon.y=balloon.y-5
    updateHeight(0,-5)
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,5)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección descendente
    //balloon.y=balloon.y+5
   
  }



  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}

function updateHeight(x,y){
database.ref('ballon/height').set({
  'x':height.x+x,
  'y':height.y+y
})
}
function readHeight(data){
  height=data.val();
  console.log(height.x)
  balloon.x=height.x
  balloon.y=height.y
}
function showError(){
   console.log("Error")
}

