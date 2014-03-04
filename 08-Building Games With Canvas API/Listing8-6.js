// Define a function to establish if the bounds of the player’s character intersects with those
// of an obstacle or enemy, causing a collision
function intersects(characterLeft, characterWidth, characterTop, characterHeight, obstacleLeft, obstacleWidth, obstacleTop, obstacleHeight) {

    // Define Boolean variables to indicate whether a collision occurs on the y-axis and whether
    // it occurs on the x-axis
    var doesIntersectVertically = false,
        doesIntersectHorizontally = false,

        // Establish the bounds of the character and obstacle based on the supplied parameters
        characterRight = characterLeft + characterWidth,
        characterBottom = characterTop + characterHeight,
        obstacleRight = obstacleLeft + obstacleWidth,
        obstacleBottom = obstacleTop + obstacleHeight;

    // A collision occurs on the y-axis if the top position of the character sits between the
    // top and bottom positions of the obstacle or if the bottom position of the character sits
    // between the same positions of the obstacle
    if ((characterTop > obstacleTop && characterTop < obstacleBottom) ||
        (characterBottom > obstacleTop && characterTop < obstacleBottom)) {
        doesIntersectVertically = true;
    }

    // A collision occurs on the x-axis if the left position of the character sits between the
    // left and right positions of the obstacle or if the right position of the character sits
    // between the same positions of the obstacle
    if ((characterLeft > obstacleLeft && characterLeft < obstacleRight) ||
        (characterRight > obstacleLeft && characterLeft < obstacleRight)) {
        doesIntersectHorizontally = true;
    }

    // A collision occurs if the character intersects the obstacle on both the x- and y-axes.
    return doesIntersectVertically && doesIntersectHorizontally;
}