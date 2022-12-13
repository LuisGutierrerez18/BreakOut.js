/* Constants for bricks */
var NUM_ROWS = 15;
var BRICK_TOP_OFFSET = 10;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;

/* Constants for ball and paddle */
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;

var BALL_RADIUS = 15;

var paddles;
var paddleY = getHeight()-PADDLE_HEIGHT-PADDLE_OFFSET;

var bricks;

var ball;
var dx = 4;
var dy = 5;

function start()
{
    

	setup();
	setTimer(draw, 20);
	mouseMoveMethod(paddleMovement);
	lives();
	//breakB();
	
}

function setup(){
    drawBricks();
    paddleC();
	ballC();
	getObject();
	checkObject();
}

function brick(x,y,color)
{
    bricks = new Rectangle(BRICK_WIDTH,BRICK_HEIGHT);
    bricks.setColor(color);
    bricks.setPosition(x,y);
    add(bricks);
    //color();
}

function row(rowNum, yPos)
{
    var xPos = BRICK_SPACING;
    for(var i = 0; i < NUM_BRICKS_PER_ROW; i++)
    {
        brick(xPos,yPos, color(rowNum));
        xPos = xPos + BRICK_WIDTH + BRICK_SPACING
    }
    
}

function drawBricks()
{
    var yPos = BRICK_TOP_OFFSET;
    for(var i = 0; i < NUM_ROWS; i++)
    {
        row(i, yPos);
        yPos = yPos + BRICK_HEIGHT + BRICK_SPACING;
    }
}

function color(rowNum)
{
    rowNum %= 8;
        
    if(rowNum <= 1)
    {
        return Color.red;
    }            
    else if(rowNum<= 3)   
    {
        return Color.orange;
    }
    else if(rowNum <= 5)
    {
        return Color.green;
    }
    else if(rowNum <= 7)
    {
        return Color.blue;
    }
    else if(rowNum <= 9)
    {
        return Color.red;
    }
    else if(rowNum <= 11)
    {
        return Color.orange;
    }
    else if(rowNum <= 13)
    {
        return Color.green;
    }
}
    /*
    for(var i = 0; i < NUM_ROWS; i++)
    {
        counter += 20;
        
        if(counter == 20)
        {
            bricks.setColor(Color.orange);
        }
        else if(counter == 40)
        {
             bricks.setColor(Color.green);
        }
        else if(counter == 60)
        {
            bricks.setColor(Color.blue);
        }
        else if(counter == 80)
        {
            bricks.setColor(Color.red);
        }
    }
    */


function paddleC() // C = creator
{
    paddles = new Rectangle(PADDLE_WIDTH,PADDLE_HEIGHT);
    paddles.setColor(Color.black);
    paddles.setPosition(getWidth()/2 - PADDLE_WIDTH/2, paddleY);
    add(paddles);
    
}
// Will make the paddle move alongside the mouse
function paddleMovement(e)
{
   var x = e.getX()/*-PADDLE_WIDTH/2*/ ;
   
   
   if(x > getWidth() - paddles.getWidth())
   {
       x = getWidth() - paddles.getWidth();
   }
   paddles.setPosition(x, paddleY);
   //paddleCheckWalls();
   
}


function ballC() //C = creator
{
    ball = new Circle(BALL_RADIUS);
	ball.setPosition(getWidth()/2, getHeight()/2);
	ball.setColor(Color.black);
	add(ball);
	
	
}

function draw()
{
	checkWalls();
	checkObject();
	ball.move(dx, dy);
}

function checkWalls(){
	// Bounce off right wall
	if(ball.getX() + ball.getRadius() > getWidth()){
		dx = -dx;
	}
	
	// Bounce off left wall
	if(ball.getX() - ball.getRadius() < 0){
		dx = -dx;
	}
	
	// Bounce off bottom wall
	if(ball.getY() + ball.getRadius() > getHeight()){
		dy = -dy;
	}
	
	
	// Bounce off top wall
	if(ball.getY() - ball.getRadius() < 0){
		dy = -dy;
	}
}

function getObject(){
    
    var left = ball.getX() - ball.getRadius();
    var right = ball.getX() + ball.getRadius();
    var top = ball.getY() - ball.getRadius();
    var bottom = ball.getY() + ball.getRadius();
    
    var topLeft = getElementAt(left, top);
    if(topLeft)
    {
        return topLeft;
    }
    
    var bottomLeft = getElementAt(left, bottom);
    if(bottomLeft)
    {
        return bottomLeft;
    }
    
    var topRight = getElementAt(right, top)
    if(topRight)
    {
        return topRight;
    }
    
    var bottomRight = getElementAt(right, bottom);
    if(bottomRight)
    {
        return bottomRight;
    }
    
    
}

function checkObject(){
    var obj = getObject();
    if(obj!=null){
        if(obj != paddles)
        {
            remove(obj);
            dy =-dy;
             
        }
        else
        {
            dy = -Math.abs(dy);
        }
        
    }
}


/*
* Last, there are just some miscellaneous things you can do:

* Pause the ball when it gets reset until you click. Kind of like the Pause Ball exercise.
* Stop the game after the ball falls to the bottom 3 times.
* Stop the game when all the bricks are removed.
* Display messages on the screen when you win or lose.
*/

function spawn(e)
{
    ball.setPosition(getWidth()/2 - BALL_RADIUS , getHeight() - BALL_RADIUS);
    setTimer(draw, 20);
}

function lives()
{
    var lives  = 3;
    
    var liveCount = new Text("Lives: " + lives, "15pt Arial");
    liveCount.setPosition(10, getHeight()- 5);
    liveCount.setColor(Color.black);
    add(liveCount);
    
    if(ball.getX() == getWidth && ball.getX() == getHeigth())
    {
        lives -= 1;
        println("You have" + lives + " lives left");
        
        // Spawn ball at middle of the canva + click method
        mouseClickMethod(spawn);
    }
    else if(ball.getY() == getHeight && ball.getY() == getHeight)
    {
        lives -= 1;
        liveCount.setText("You have" + lives + " lives left");
        
        // Spawn ball at middle of the canva + click method
        mouseClickMethod(spawn(ball));
    }
        
    
    if(lives == 0)
    {
        var text = new Text("Sorry, You are out of lives", "35pt Arial");
        text.setPostion(20, getHeight()/2)
        text.setColor(Color.black);
        add(text);
        stopTimer(draw);
    }
    else if(lives==2 || lives == 1)
    {
        liveCount.setText(lives);
        
    }
    
} //*/


//End of Code.
// Not Finished.
