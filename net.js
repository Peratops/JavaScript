let canvas;
let context;

let threshold = 50;
let points = [];


let fpsInterval = 1000 / 10; // the denominator is frames-per-second
let now;
let then = Date.now();
                
document.addEventListener("DOMContentLoaded", init, false);
            
function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
            
    draw();
}
            
function draw() {
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);
    
    let q = {
        x : randint(0, canvas.width),
        y : randint(0, canvas.height),
    };

    points.push(q);

    for (let p = 0; p < points.length; p +=1)  {
        if (dist(points[p], q) < threshold) {
            context.strokeStyle = "blue";
            context.beginPath();
            context.moveTo(points[p].x, points[p].y);
            context.lineTo(q.x, q.y);
            context.stroke();
        }
    }
        
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dist(p,q) {
    return Math.sqrt((p.x - q.x)**2 + (p.y - q.y)**2)
}