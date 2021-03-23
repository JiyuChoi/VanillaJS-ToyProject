const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

// Give canvas width, height (pixel)
canvas.width = 700;
canvas.height = 700;

// default 설정
// Color of line
ctx.strokeStyle = "#2c2c2c";
// Pixel of line
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    // override
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    // override
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filiing = true;
        mode.innerText = "Paint";
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainiting);
    canvas.addEventListener("mouseleave", stopPainiting);
}

// Array.from: object -> array
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}