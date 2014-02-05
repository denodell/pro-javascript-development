var canvas = document.createElement("canvas"),
    context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

context.beginPath();
context.arc(100, 100, 100, 0, 2 * Math.PI);
context.stroke();