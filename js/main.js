var
    cvs    = document.getElementById('canvas'),
    ctx    = cvs.getContext('2d'),
    frameW = 800,
    frameH = 600,
    startX = (window.innerWidth - frameW) / 2,
    startY = (window.innerHeight - frameH) / 2;
    rectW = 25;
    rectH = 100;

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

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
    p1 = (frameH/2),
    p2 = (frameH/2),
    bx = (frameW/2),
    by = (frameH/2),
    br = 10,
    gr = randomInt(10, 350),
    dx = Math.sin(gr * (Math.PI / 180))*5,
    dy = Math.cos(gr * (Math.PI / 180))*5,
    score_p1 = 0,
    score_p2 = 0;
function ball_reset() {
    bx = (frameW/2);
    by = (frameH/2);
    br = 10;
    gr = randomInt(10, 350);
    dx = Math.sin(gr * (Math.PI / 180))*5;
    dy = Math.cos(gr * (Math.PI / 180))*5;
}
function draw() {
    world();
    ctx.fillStyle = "white";
    ctx.font = "italic 30pt Arial";
    var score = score_p1 + " : " + score_p2;
    ctx.fillText(score, window.innerWidth/2-30, 100);
    //move
    addEventListener("keydown", keyDownHandler);
    addEventListener("keyup", keyUpHandler);
    if (p1_up) {
        p1 -= 5;
    } 
    if (p1_down) {
        p1 += 5;
    }
    if (p2_up) {
        p2 -= 5;
    } 
    if (p2_down) {
        p2 += 5;
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
        dx = -dx;
    } else if ( (bx+br) >= (frameW-10-rectW) && ( (by) >= p2) && ( (by) <= (p2+rectH) ) ) {
        dx = -dx;
    }
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
    
    // 1 player
    ctx.fillStyle = 'white';
    ctx.fillRect(startX+5, startY+p1, rectW, rectH);

    // 2 player
    ctx.fillStyle = 'white';
    ctx.fillRect(startX+frameW-rectW-5, startY+p2, rectW, rectH);

    //ball
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.arc(startX+bx, startY+by, br, 0, 2 * Math.PI);
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
