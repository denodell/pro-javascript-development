var HomeBase = function(startColumn, endColumn) {
    this.startColumn = startColumn;
    this.endColumn = endColumn;
};

HomeBase.prototype.getPosition = function() {
    return {
        left: GameBoard.getColumnPosition(this.startColumn),
        right: GameBoard.getColumnPosition(this.endColumn)
    };
};

HomeBase.prototype.getWidth = function() {
    return GameBoard.getColumnPosition(this.endColumn) - GameBoard.getColumnPosition(this.startColumn);
};

HomeBase.prototype.moveTo = function() {};
HomeBase.prototype.renderAt = function() {};