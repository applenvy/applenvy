const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// cursor positioning

const cursor = {
    x: NaN,
    y: NaN,
}

    // update cursor position
window.addEventListener("pointermove", e => {
    cursor.x = e.pageX;
    cursor.y = e.pageY;
});

// dots

    // params
var spacing = 80;
var radius = 2;
const color = "rgb(117, 33, 20)"
var scale = 1;

    // (re)generate array of dots
var dots = new Array;
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    scale = (canvas.width > 2500) ? 2 : 1;
    
    ctx.fillStyle = color;
    const scaledSpacing = scale * spacing;
    const scaledRadius = scale * radius;

    const dots_width = Math.min(Math.round(canvas.width / scaledSpacing), 30); // clamping to 30 so i dont blow anybodys computer up
    const dots_height = Math.min(Math.round(canvas.height / scaledSpacing), 30);
    const offset_x = (canvas.width - (scaledSpacing * dots_width) + scaledSpacing) / 2 - scaledRadius;
    const offset_y = (canvas.height - (scaledSpacing * dots_height) + scaledSpacing) / 2 - scaledRadius;
    dots = [];

    for (var i = 0; i < dots_width; i++) {
        for (var j = 0; j < dots_height; j++) {
            let x = (scaledSpacing  * i) + offset_x;
            let y = (scaledSpacing  * j) + offset_y;
            dots.push([x, y]);
        }
    }
}

    // draw circle given coordinates and radius
function drawCircle(x, y, r) {
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    
}

    // regenerate dot array when resize window
window.addEventListener("resize", initCanvas);

    // update canvas
    // idk if this is more performant than usings setTimeout, but it seems smoother
var now, then, elapsed, fpsInterval;
function startUpdate(fps) {
    fpsInterval = 1000 / fps;
    then = performance.now();
    update();
}

function update() {

    requestAnimationFrame(update);

    now = performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        drawFrame();
    }

}

function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    for (const coords of dots) {
        const [x_offset, y_offset] = calcOffset(coords[0], coords[1], cursor.x, cursor.y);
        drawCircle(x_offset, y_offset, radius * scale);
    }
    ctx.fill();
}

// vector offsets

function calcOffset(x1, y1, x2, y2) {

    if (isNaN(cursor.x) || isNaN(cursor.y)) return [x1, y1];

    const direction = Math.atan2(y2 - y1, x2 - x1);
    const magnitude = Math.hypot(x2 - x1, y2 - y1);

    const curve = magnitude * (Math.pow(1.4, -Math.pow(magnitude/(scale * 80), 2)) * 0.4 - (0.01 * scale));

    const dx = Math.cos(direction) * curve ;
    const dy = Math.sin(direction) * curve ;

    return [x1 + dx, y1 + dy];
}

initCanvas();
startUpdate(60);