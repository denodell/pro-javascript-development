function Log(options) {
    options = options || {};

    MoverAndWrapper.call(this, {
        startRow: options.startRow || 0,
        startColumn: options.startColumn || 1,
        direction: direction.RIGHT,
        speed: options.speed || 3,
        spritePath: options.spritePath || "tree_1.png",
        spriteWidth: options.spriteWidth || 80
    });
}

Log.prototype = new MoverAndWrapper();
Log.prototype.constructor = Log;

function ShortLog(startColumn) {
    Log.call(this, {
        startColumn: startColumn || 0,
        startRow: 6,
        spriteWidth: 190,
        speed: 6
    });
}

ShortLog.prototype = new Log();
ShortLog.prototype.constructor = ShortLog;

function MediumLog(startColumn) {
    Log.call(this, {
        startColumn: startColumn || 0,
        startRow: 3,
        spritePath: "tree_3.png",
        spriteWidth: 254,
        speed: 5
    });
}

MediumLog.prototype = new Log();
MediumLog.prototype.constructor = MediumLog;

function LongLog(startColumn) {
    Log.call(this, {
        startColumn: startColumn || 0,
        startRow: 5,
        spritePath: "tree_2.png",
        spriteWidth: 392,
        speed: 4
    });
}

LongLog.prototype = new Log();
LongLog.prototype.constructor = LongLog;