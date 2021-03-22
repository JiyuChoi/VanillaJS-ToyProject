const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// Give canvas width, height (pixel)
canvas.width = 700;
canvas.height = 700;

// Color of line
ctx.strokeStyle = "#2c2c2c";
// Pixel of line
ctx.lineWidth = 2.5;

let painting = false;

function stopPainiting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

// every time when moving mouse
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        // stroke: 획을 긋다
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainiting);
    canvas.addEventListener("mouseleave", stopPainiting);
}