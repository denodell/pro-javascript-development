function Car(options) {
    options = options || {};

    MoverAndWrapper.call(this, {
        startRow: options.startRow || 0,
        startColumn: options.startColumn || 1,
        direction: options.direction || direction.LEFT,
        speed: options.speed || 1,
        spritePath: "cars.png",
        spriteWidth: options.spriteWidth || 80,
        spritePosition: options.spritePosition || 0
    });
}

Car.prototype = new MoverAndWrapper();
Car.prototype.constructor = Car;

function RacingCar(startColumn) {
    Car.call(this, {
        startColumn: startColumn || 0,
        startRow: 13,
        speed: 5,
        spritePosition: 0
    });
}

RacingCar.prototype = new Car();
RacingCar.prototype.constructor = RacingCar;

function Bulldozer(startColumn) {
    Car.call(this, {
        startColumn: startColumn || 0,
        direction: direction.RIGHT,
        startRow: 12,
        speed: 5,
        spritePosition: 1
    });
}

Bulldozer.prototype = new Car();
Bulldozer.prototype.constructor = Bulldozer;

function RoadCar(startColumn) {
    Car.call(this, {
        startColumn: startColumn || 0,
        startRow: 11,
        speed: 3,
        spritePosition: 3
    });
}

RoadCar.prototype = new Car();
RoadCar.prototype.constructor = RoadCar;

function RacingCarType2(startColumn) {
    Car.call(this, {
        startColumn: startColumn || 0,
        direction: direction.RIGHT,
        startRow: 10,
        speed: 4,
        spritePosition: 2
    });
}

RacingCarType2.prototype = new Car();
RacingCarType2.prototype.constructor = RacingCarType2;

function Truck(startColumn) {
    Car.call(this, {
        startColumn: startColumn || 0,
        startRow: 9,
        speed: 5,
        spritePosition: 4,
        spriteWidth: 122
    });
}

Truck.prototype = new Car();
Truck.prototype.constructor = Truck;