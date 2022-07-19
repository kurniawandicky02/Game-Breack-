var canvas=document.getElementById("canvas1");
var ctx=canvas.getContext("2d");

/*ctx.beginPath();
ctx.rect(20,40,50,50);
ctx.fillStyle="#FF0000";
ctx.fill();
ctx.strokeStyle='rgba(0,0,255,0.5)';
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(240,160,20,0,Math.PI*2,false);
ctx.fillStyle="green";
ctx.fill();
ctx.strokeStyle='rgba(0,0,255,0.5)';
ctx.stroke();
ctx.closePath();*/

var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;
var ballRadius=5;
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed=false;
var leftPressed=false;
var brickRowCount=6;
var brickColumnCount=8;
var brickWidth=75;
var brickHeight=20;
var brickPadding=10;
var brickOffSetTop=30;
var brickOffSetLeft=30;
var score=0;
var lives=1;

var bricks=[];
for(let c=0;c<brickColumnCount;c++)
{
	bricks[c]=[];
	for(let r=0;r<brickRowCount;r++)
	{
		bricks[c][r]={x:0,y:0,status:1};
	}
}

document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

document.addEventListener("mousemove",mouseMoveHandler);

function mouseMoveHandler(e)
{
	var relativeX = e.clientX-canvas.offsetLeft;
	if(relativeX>0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2)
	{
		paddleX= relativeX-paddleWidth/2;
	}
}
function drawBricks()
{
	for(let c=0;c<brickColumnCount;c++)
	{
		for(let r=0;r<brickRowCount;r++)
		{
			if(bricks[c][r].status==1)
			{
			var brickX=(c*(brickWidth+brickPadding)+brickOffSetLeft);
			var brickY=(r*(brickHeight+brickPadding)+brickOffSetTop);
			bricks[c][r].x=brickX;
			bricks[c][r].y=brickY;
			
			ctx.beginPath();
			ctx.rect(brickX,brickY,brickWidth,brickHeight);
			ctx.fillStyle="red";
			ctx.fill();
			ctx.strokeStyle='rgba(0,0,255,0.5)';
			ctx.stroke();
			ctx.closePath();
			}

		}
	}
}
function keyDownHandler(e){
	if(e.keyCode==39)
	{
		rightPressed=true;
	}
	else if(e.keyCode==37)
	{
		leftPressed=true;
	}

}

function keyUpHandler(e){
	if(e.keyCode==39)
	{
		rightPressed=false;
	}
	else if(e.keyCode==37)
	{
		leftPressed=false;
	}

}

function drawBall()
{
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-(paddleHeight),paddleWidth,paddleHeight);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
function collisonDetection()
{
	for(var c=0;c<brickColumnCount;c++)
	{
		for(var r=0;r<brickRowCount;r++)
		{
			var b=bricks[c][r];
			if(b.status==1)
			{
				if(x>b.x && x< b.x+brickWidth && y>b.y && y< b.y+brickHeight )
				{
					dy=-dy;
					b.status=0;
					++score;
					if(brickColumnCount*brickRowCount==score)
					{
						alert("YOU WIN");
						document.location.reload();
					}

				}
			}
		}
	}
}

function drawScore()
{
	ctx.font="20px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Score:"+score,8,20);

}

function drawLives()
{
	ctx.font="20px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Lives:"+lives,canvas.width-65,20);

}
function draw()
{
	ctx.clearRect(0,0,canvas.width,canvas.height)
	drawBricks();
	drawLives();
	drawBall();
	drawPaddle();
	drawScore();
	collisonDetection();

	if(y+dy < ballRadius){
			dy=-dy;
	}
	else if(y+dy > canvas.height-2*ballRadius)
	{

		if(x>paddleX && x<paddleX +paddleWidth)
		{
			dy=-dy;
		}
		else{
			lives=lives-1;
			if(!lives)
			{
				alert("yah mati, Coba Lagi Kyy!!!");
		    	document.location.reload();
			}
			else
			{
				x=canvas.width/2;
				y=canvas.height-30;
				dx=2;
				dy=-2;
				 paddleX=(canvas.width-paddleWidth)/2;
			}
	    }
	}

	if((x+dx < ballRadius|| (x+dx > canvas.width-ballRadius)) ){
			dx=-dx;
	}
	if(rightPressed && paddleX <canvas.width-paddleWidth)
	{
		paddleX+=7;
	}
	else if(leftPressed && paddleX>0){
		paddleX-=7;
	}
	x += dx;
	y += dy;
}


setInterval(draw,10);