// warning: this is practically my foray into js 
// i do not know formatting conventions

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// cursor positioning
const cursor = {
    x: NaN,
    y: NaN,
}

    // update cursor position
window.addEventListener("click", e => {
    cursor.x = e.pageX;
    cursor.y = e.pageY;
});

window.addEventListener("mousemove", e => {
    cursor.x = e.pageX;
    cursor.y = e.pageY;
})

// vector offsets

function calc_offset(x1, y1, x2, y2) {

    if (isNaN(cursor.x) || isNaN(cursor.y)) return [x1, y1];

    const direction = Math.atan2(y2 - y1, x2 - x1);
    const magnitude = Math.hypot(x2 - x1, y2 - y1);

    const curve = magnitude * (Math.pow(1.3, -Math.pow(magnitude/80, 2)) * 0.2 - 0.01);
    
    const dx = Math.cos(direction) * curve;
    const dy = Math.sin(direction) * curve;

    return [x1 + dx, y1 + dy];
}
/*
function offset_card() {
    var card = document.getElementById("center-card");
    const direction = Math.atan2(canvas.height / 2 - cursor.y, canvas.width / 2 - cursor.x);
    const magnitude = Math.hypot(canvas.height / 2 - cursor.y, canvas.width / 2 - cursor.x);

    const curve = (-Math.pow(1.3, -Math.pow(magnitude/100, 2)) + 1) * 2;

    const offset_x = Math.cos(direction) * curve;
    const offset_y = Math.sin(direction) * curve;
    card.style.marginTop = offset_y + "px";
    card.style.marginLeft = offset_x + "px";
}
*/
function resize_text() {

    const card_width = document.getElementById("center-card").offsetWidth;

    // TITLE
    const title = document.getElementById("title");
    title.firstElementChild.style.fontSize = card_width / 6 + "px";
    title.style.transform = `translateY(-${card_width / 8 + 8}px)`

    // HORIZONTAL SEPARATOR
    const sep = document.getElementById("separator");
    sep.style.marginTop = -card_width / 8 + 40 + "px";

    // CONTENT
    const text = document.getElementById("card-content");
    text.style.fontSize = card_width / 16 + "px";
    text.style.padding = `0 ${card_width / 18}px 6px`;

    // FOOTER
    const footer = document.getElementsByTagName("footer")[0];
    footer.style.fontSize = card_width / 20 + "px";

    // VERTICAL SEPARATORS
    const seps = document.getElementsByClassName("vertsep");
    for (const sep of seps) {
        sep.style.height = card_width / 20 + 8 +"px";
        sep.style.margin = `0 ${card_width / 80}px ${-card_width / 50}px`;
    }

    // ICONS
    const icons = document.getElementsByTagName("img");
    for (const icon of icons) {
        icon.style.width = card_width / 12 + "px";
    }
}

// dots
    // params
var spacing = 80;
var radius = 2;
const color = "rgb(117, 33, 20)"

    // (re)generate array of dots
var dots = new Array;
function init_canvas() {
    console.log(radius)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setTimeout(() => {
        resize_text();
    }, 200);

    radius = (canvas.width > 2500) ? 4 : 2; // adapt params to screen size, should probably format this better
    spacing = (canvas.width > 2500) ? 160 : 80;
    
    ctx.fillStyle = color;

    const dots_width = Math.min(Math.round(canvas.width / spacing), 30); // clamping to 30 so i dont blow anybodys computer up
    const dots_height = Math.min(Math.round(canvas.height / spacing), 30);
    const offset_x = (canvas.width - (spacing * dots_width) + spacing) / 2 - radius;
    const offset_y = (canvas.height - (spacing * dots_height) + spacing) / 2 - radius;
    console.log(offset_x, offset_y)
    dots = [];

    for (var i = 0; i < dots_width; i++) {
        for (var j = 0; j < dots_height; j++) {
            let x = (spacing * i) + offset_x;
            let y = (spacing * j) + offset_y;
            dots.push([x, y]);
        }
    }
}

    // draw circle given coordinates and radius
function draw_circle(x, y, r) {
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    
}

    // regenerate dot array when resize window
window.addEventListener("resize", init_canvas);

    // update canvas
const fps = 40;
function update() {
    setTimeout(() => {
        window.requestAnimationFrame(update);
    }, 1000 / fps);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // offset_card();

    ctx.beginPath();
    for (const coords of dots) {
        const [x_offset, y_offset] = calc_offset(coords[0], coords[1], cursor.x, cursor.y);
        draw_circle(x_offset, y_offset, radius);
    }
    ctx.fill();
}

init_canvas();
update();