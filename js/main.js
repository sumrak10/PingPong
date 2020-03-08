var
    cvs    = document.getElementById('canvas'),
    ctx    = cvs.getContext('2d'),
    frameW = 900,
    frameH = 600,
    startX = (window.innerWidth - frameW) / 2,
    startY = (window.innerHeight - frameH) / 2,
    rectW = 25,
    rectH = 100,
    br = 10,
    font = 30,
    max_score = 5,
    phone = false;
if (window.innerWidth < 400) {
    phone = true;
}
if (window.innerWidth < frameW) {
    frameW = 600;
    frameH = 400;
}
if (phone) {
    frameW = 300;
    frameH = 200;
    rectW = 3;
    rectH = 30;
    br = 3;
    font = 10;
    startX = (window.innerWidth - frameW) / 2;
    startY = (window.innerHeight - frameH) / 2;
    console.log('phone!!!');
}

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

var ongoingTouches = new Array();

var 
    btn_start = document.getElementsByClassName('start_text'),
    page_start = document.getElementsByClassName('start_page');
btn_start[0].onclick = function() {
    console.log('click');
    page_start[0].style.display = 'none';
    window.requestAnimationFrame(draw);
}

function world() {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight );

    ctx.strokeStyle = 'white';
    ctx.strokeRect(startX, startY, frameW, frameH);
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var num = Math.floor(Math.random() * (max - min)) + min;
    return (num);
}
var 
    p1 = (frameH/2)-(rectH/2),
    p2 = (frameH/2)-(rectH/2),
    bx = (frameW/2),
    by = (frameH/2),
    kf = 1,
    player_speed = 5,
    speed = 5,
    score_p1 = 0,
    score_p2 = 0;
if (phone) {
    kf = 0.2;
    player_speed = 3;
    speed = 3;
}

ball_reset();
function ball_reset() {
    bx = (frameW/2);
    by = (frameH/2);
    gr = randomInt(10, 350);
    dx = Math.sin(gr * (Math.PI / 180))*speed;
    dy = Math.cos(gr * (Math.PI / 180))*speed;
}
if (phone) {
    // addEventListener("touchstart", mouseDownHandler, false);
    // addEventListener("touchend", mouseUpHandler, false);
    addEventListener("touchmove", mouseMoveHandler, false);
} else {
    addEventListener("keydown", keyDownHandler);
    addEventListener("keyup", keyUpHandler);
}
function draw() {
    world();
    ctx.fillStyle = "white";
    ctx.font = "italic "+font+"pt Arial";
    var score = 'p1 ( ' + score_p1 + " : " + score_p2 + ' ) p2';
    if (score_p1 > max_score) {
        score = 'Player 1 win!';
    } else if (score_p2 > max_score) {
        score = 'Player 2 win!'
    } 
    ctx.fillText(score, startX, startY-font-5);
    //move
    
    if (p1_up) {
        p1 -= player_speed;
    } 
    if (p1_down) {
        p1 += player_speed;
    }
    if (p2_up) {
        p2 -= player_speed;
    } 
    if (p2_down) {
        p2 += player_speed;
    }
    
    //players collision
    if (p1 < 0) {
        p1 = 0;
    } else if (p1 > (frameH-rectH)) {
        p1 = frameH-rectH;
    }
    if (p2 < 0) {
        p2 = 0;
    } else if (p2 > (frameH-rectH)) {
        p2 = frameH-rectH;
    }
    //ball collision
    if (by-br < 0) {
        dy = -dy;
    } else if (by+br > frameH) {
        dy = -dy;
    }
    if (bx-br < 5) {
        dx = 0;
        dy = 0;
        score_p2 += 1;
        ball_reset();
    } else if (bx+br > frameW-5) {
        dx = 0;
        dy = 0;
        score_p1 += 1;
        ball_reset();
    }

    // players and ball collision
    if ( (bx-br) <= (10 + rectW) && ( (by) >= p1) && ( (by) <= (p1+rectH) ) ) {
        dx = -(dx-kf); //-1
    } else if ( (bx+br) >= (frameW-10-rectW) && ( (by) >= p2) && ( (by) <= (p2+rectH) ) ) {
        dx = -(dx+kf); //+1
    }
    //kasaniya ob kraya
    if ( (by+br) <= (p1) && ( (bx) <= (rectW+5) ) ) {
        dy = -dy;
    } 
    if ( (by-br) <= (p1+rectH) && ( (bx) <= (rectW+5) ) ) {
        dy = -dy;
    }
    if ( (by+br) <= (p2) && ( (bx) >= (frameW-rectW) ) ) {
        dy = -dy;
    } 
    if ( (by-br) <= (p2+rectH) && ( (bx) >= (frameW-rectW) ) ) {
        dy = -dy;
    }
    //kasaniya ob ugli
    if ( ( by >= (p1-br) ) && ( by <= p1 ) && ( bx-br <= 5+rectW) ) {
        dx = (dx+kf);
        dy = -(dy+kf);
    } else if ( ( by >= (p1+rectH) ) && ( by <= p1+rectH+br ) && ( bx-br <= 5+rectW) ) {
        dx = (dx+kf);
        dy = (dy+kf);
    }
    if ( ( by >= (p2-br) ) && ( by <= p2 ) && ( bx+br >= frameW-rectW-5) ) {
        dx = -(dx+kf);
        dy = -(dy+kf);
    } else if ( ( by >= (p2+rectH) ) && ( by <= p2+rectH+br ) && ( bx+br >= frameW-rectW-5) ) {
        dx = -(dx+kf);
        dy = (dy+kf);
    }

    // 1 player
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(startX+5, startY+p1, rectW, rectH);
    ctx.closePath();

    // 2 player
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(startX+frameW-rectW-5, startY+p2, rectW, rectH);
    ctx.closePath();

    //ball
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.arc(startX+bx, startY+by, br, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill()
    

    //fpc
    bx += dx;
    by += dy;
    
    window.requestAnimationFrame(draw);
}
var 
    p1_up = false,
    p1_down = false,
    p2_up = false,
    p2_down = false;
function keyDownHandler(e) {
    if (e.keyCode == 87) {
        //player1 top down
        p1_up = true;
    } else if (e.keyCode == 83) {
        //player1 bottom down
        p1_down = true;
    } else if (e.keyCode == 80) {
        //player2 top down
        p2_up = true;
    } else if (e.keyCode == 186) {
        //player2 bottom down
        p2_down = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 87) {
        //player1 top up
        p1_up = false;
    } else if (e.keyCode == 83) {
        //player1 bottom up
        p1_down = false;
    } else if (e.keyCode == 80) {
        //player2 top up
        p2_up = false;
    } else if (e.keyCode == 186) {
        //player2 bottom up
        p2_down = false;
    }
}
function mouseDownHandler(e) {
    var 
        mx = e.clientX,
        my = e.clientY;
    console.log(mx,my, 'dfdddddddd');
}
function mouseUpHandler(e) {
    var 
        mx = e.clientX,
        my = e.clientY;
    console.log(mx,my);
}

function mouseMoveHandler(e) {
    
    e.preventDefault();
    var touches = e.changedTouches;
    for (var i = 0; i < touches.length; i++) {
        if (touches[i].pageY < (window.innerHeight/2)) {
            p2 = mapInt(touches[i].pageX,0, window.innerWidth, 0, frameH) - (startX/2);
            console.log(touches[i].pageX, p2);
        } else {
            p1 = mapInt(touches[i].pageX,0, window.innerWidth, 0, frameH) - (startX/2);
        }
    }
}
// long map(long x, long in_min, long in_max, long out_min, long out_max)
// {
//   return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
// }
function mapInt(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}