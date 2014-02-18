var Character = (function() {
    var character,
        startRow = 14,
        row = startRow,
        startColumn = 6,
        characterBounds = GameBoard.getCharacterBounds(),
        _isFrozen = false;

    function Character(left, top, animations) {
        Frogger.ImageSprite.call(this, left, top);
        this.registerAnimation(animations);
    }

    Character.prototype = new Frogger.ImageSprite();
    Character.prototype.spriteLeft = 0;
    Character.prototype.spriteTop = 0;

    Character.prototype.moveUp = function() {
        this.top -= GameBoard.getGridSize().height;
        if (this.top < characterBounds.top) {
            this.top = characterBounds.top;
        }
        this.playAnimation("move-up");
        row--;
    };

    Character.prototype.moveDown = function() {
        this.top += GameBoard.getGridSize().height;
        if (this.top > characterBounds.bottom) {
            this.top = characterBounds.bottom;
        }
        this.playAnimation("move-down");
        row++;
    };

    Character.prototype.moveLeft = function() {
        this.left -= GameBoard.getGridSize().width;
        if (this.left < characterBounds.left) {
            this.left = characterBounds.left;
        }
        this.playAnimation("move-left");
    };

    Character.prototype.moveRight = function() {
        this.left += GameBoard.getGridSize().width;
        if (this.left > characterBounds.right) {
            this.left = characterBounds.right;
        }
        this.playAnimation("move-right");
    };

    character = new Character(GameBoard.getColumnPosition(startColumn), GameBoard.getRowPosition(startRow), {
        "lose-life": {
            spriteLeft: 640,
            sequence: [0, 1, 2],
            rate: 350
        },
        "move-up": {
            spriteLeft: 0,
            sequence: [1, 0]
        },
        "move-right": {
            spriteLeft: 160,
            sequence: [1, 0]
        },
        "move-down": {
            spriteLeft: 320,
            sequence: [1, 0]
        },
        "move-left": {
            spriteLeft: 480,
            sequence: [1, 0]
        }
    });

    Frogger.observer.subscribe("player-lost-life", loseLife);
    Frogger.observer.subscribe("reset", reset);
    Frogger.observer.subscribe("player-at-goal", hide);
    Frogger.observer.subscribe("player-freeze", function() {
        _isFrozen = true;
    });
    Frogger.observer.subscribe("player-unfreeze", function() {
        _isFrozen = false;
    });

    function getRow() {
        return row;
    }

    function hide() {
        character.hide();
    }

    function move(characterDirection) {
        if (!_isFrozen) {
            if (characterDirection === Frogger.direction.LEFT) {
                character.moveLeft();
            } else if (characterDirection === Frogger.direction.RIGHT) {
                character.moveRight();
            } else if (characterDirection === Frogger.direction.UP) {
                character.moveUp();
            } else if (characterDirection === Frogger.direction.DOWN) {
                character.moveDown();
            }

            Frogger.observer.publish("player-moved");
        }
    }

    function render() {
        character.renderAt(character.left, character.top);
    }

    function loseLife() {
        character.playAnimation("lose-life");
    }

    function setPosition(left) {
        if (left > characterBounds.right) {
            left = characterBounds.right;
        } else if (left < characterBounds.left) {
            left = characterBounds.left;
        }

        character.moveTo(left);
    }

    function reset() {
        row = startRow;
        column = startColumn;
        character.reset();
    }

    function getPosition() {
        return character.getPosition();
    }

    Frogger.observer.subscribe("render-character", render);

    window.addEventListener("keydown", function(e) {
        var LEFT_ARROW = 37,
            UP_ARROW = 38,
            RIGHT_ARROW = 39,
            DOWN_ARROW = 40;

        if (e.keyCode === LEFT_ARROW) {
            move(Frogger.direction.LEFT);
        } else if (e.keyCode === UP_ARROW) {
            move(Frogger.direction.UP);
        } else if (e.keyCode === RIGHT_ARROW) {
            move(Frogger.direction.RIGHT);
        } else if (e.keyCode === DOWN_ARROW) {
            move(Frogger.direction.DOWN);
        }
    }, false);

    return {
        getRow: getRow,
        getPosition: getPosition,
        setPosition: setPosition
    };
}());