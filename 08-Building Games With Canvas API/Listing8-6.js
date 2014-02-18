function RaceCar(left) {
    Frogger.ImageSprite.call(this, left);
}

RaceCar.prototype = new Frogger.ImageSprite();
RaceCar.prototype.spriteLeft = 0;
RaceCar.prototype.spriteTop = 80;

function Bulldozer(left) {
    Frogger.ImageSprite.call(this, left);
}

Bulldozer.prototype = new Frogger.ImageSprite();
Bulldozer.prototype.spriteLeft = 80;
Bulldozer.prototype.spriteTop = 80;

function RoadCar(left) {
    Frogger.ImageSprite.call(this, left);
}

RoadCar.prototype = new Frogger.ImageSprite();
RoadCar.prototype.spriteLeft = 240;
RoadCar.prototype.spriteTop = 80;

function RaceCarTurbo(left) {
    Frogger.ImageSprite.call(this, left);
}

RaceCarTurbo.prototype = new Frogger.ImageSprite();
RaceCarTurbo.prototype.spriteLeft = 160;
RaceCarTurbo.prototype.spriteTop = 80;

function Truck(left) {
    Frogger.ImageSprite.call(this, left);
}

Truck.prototype = new Frogger.ImageSprite();
Truck.prototype.spriteLeft = 320;
Truck.prototype.spriteTop = 80;
Truck.prototype.width = 122;

function ShortLog(left) {
    Frogger.ImageSprite.call(this, left);
}

ShortLog.prototype = new Frogger.ImageSprite();
ShortLog.prototype.spriteLeft = 0;
ShortLog.prototype.spriteTop = 160;
ShortLog.prototype.width = 190;

function MediumLog(left) {
    Frogger.ImageSprite.call(this, left);
}

MediumLog.prototype = new Frogger.ImageSprite();
MediumLog.prototype.spriteLeft = 0;
MediumLog.prototype.spriteTop = 240;
MediumLog.prototype.width = 254;

function LongLog(left) {
    Frogger.ImageSprite.call(this, left);
}

LongLog.prototype = new Frogger.ImageSprite();
LongLog.prototype.spriteLeft = 240;
LongLog.prototype.spriteTop = 160;
LongLog.prototype.width = 392;

function Turtle(left) {
    Frogger.ImageSprite.call(this, left);
}
Turtle.prototype = new Frogger.ImageSprite();
Turtle.prototype.isUnderwater = function() {
    var isUnderwater = false,
        animation = this.animations[this.currentAnimation];

    if (animation.getSequenceValue() === Math.max.apply(Math, animation.sequence)) {
        isUnderwater = true;
    }

    return isUnderwater;
};

function TwoTurtles(left) {
    Turtle.call(this, left);
}

TwoTurtles.prototype = new Turtle();
TwoTurtles.prototype.spriteLeft = 320;
TwoTurtles.prototype.spriteTop = 240;
TwoTurtles.prototype.width = 130;
TwoTurtles.prototype.reset = function() {
    Turtle.prototype.reset.call(this);

    this.registerAnimation({
        "diveAndSurface": {
            sequence: [0, 1, 2, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            loop: true,
            rate: 200
        }
    });
    this.playAnimation("diveAndSurface");
};

function ThreeTurtles(left) {
    Turtle.call(this, left);
}

ThreeTurtles.prototype = new Turtle();
ThreeTurtles.prototype.spriteLeft = 0;
ThreeTurtles.prototype.spriteTop = 320;
ThreeTurtles.prototype.width = 200;
ThreeTurtles.prototype.reset = function() {
    Turtle.prototype.reset.call(this);

    this.registerAnimation({
        "diveAndSurface": {
            sequence: [0, 1, 2, 3, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            loop: true,
            rate: 300
        }
    });
    this.playAnimation("diveAndSurface");
};

function HomeFrog(left) {
    Frogger.ImageSprite.call(this, left);
}

HomeFrog.prototype = new Frogger.ImageSprite();
HomeFrog.prototype.spriteLeft = 640;
HomeFrog.prototype.spriteTop = 80;
HomeFrog.prototype.moveTo = function() {};

function HomeBase(left) {
    Frogger.ImageSprite.call(this, left);
}

HomeBase.prototype = new Frogger.ImageSprite();
HomeBase.prototype.spriteLeft = -80;
HomeBase.prototype.spriteTop = -80;
HomeBase.prototype.moveTo = function() {};
HomeBase.prototype.hasFrog = false;