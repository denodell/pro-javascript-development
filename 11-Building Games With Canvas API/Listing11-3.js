var canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    img = document.createElement("img");

img.addEventListener("load", function() {
    var individualImagePositionTop = 200,
        individualImagePositionLeft = 150,
        individualImageWidth = 300,
        individualImageHeight = 40,
        displayPositionTop = 100,
        displayPositionLeft = 100,
        displayWidth = 150,
        displayHeight = 40;

    // Draw the individual image located at position 200px x 150px and with dimensions 300px x
    // 40px onto the <canvas> element at position 100px x 100px, rendering at half the size of
    // the original, at 150px x 40px
    context.drawImage(img, individualImagePositionTop, individualImagePositionLeft, individualImageWidth, individualImageHeight, displayPositionTop, displayPositionLeft, displayWidth, displayHeight);
}, false);

img.src = "sprite-map.png";

window.addEventListener("load", function() {
    document.body.appendChild(canvas);
}, false);