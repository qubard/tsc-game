var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AABB = (function () {
    function AABB(pos, size) {
        this.pos = pos;
        this.size = size;
        this.rendered = true;
    }
    AABB.prototype.collides = function (other) {
        return this.pos.x >= other.pos.x && this.pos.x <= other.pos.x + other.size.x
            && this.pos.y >= other.pos.y && this.pos.y <= other.pos.y + other.size.y;
    };
    AABB.prototype.render = function (ctx) {
        if (ctx != null && this.rendered) {
            ctx.beginPath();
            ctx.strokeStyle = "#FF0000";
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x + this.size.x, this.pos.y);
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x, this.pos.y + this.size.y);
            ctx.moveTo(this.pos.x, this.pos.y + this.size.y);
            ctx.lineTo(this.pos.x + this.size.x, this.pos.y + this.size.y);
            ctx.moveTo(this.pos.x + this.size.x, this.pos.y);
            ctx.lineTo(this.pos.x + this.size.x, this.pos.y + this.size.y);
            ctx.stroke();
        }
    };
    return AABB;
}());
var game;
window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    game = new Game(ctx, 144);
    game.setSize(canvas.getBoundingClientRect());
    init();
};
function registerKeys() {
    window.addEventListener('keydown', keydown, false);
    window.addEventListener('keyup', keyup, false);
}
function keydown(e) {
    game.getKeyboard().handleKeydown(e.keyCode);
}
function keyup(e) {
    game.getKeyboard().handleKeyup(e.keyCode);
}
function init() {
    registerKeys();
    render();
}
function render() {
    game.loop();
    window.requestAnimationFrame(render);
}
var Entity = (function () {
    function Entity(pos, direction, bbox) {
        this.direction = direction;
        this.pos = pos;
        this.velocity = new Vec2(0, 0);
        this.bbox = bbox;
        this.init();
    }
    Entity.prototype.init = function () {
        this.velocity = new Vec2(0, 0);
    };
    Entity.prototype.update = function () {
        this.pos = this.pos.plus(this.velocity);
    };
    Entity.prototype.isMoving = function () {
        return Vec2.mag(this.velocity) > 0;
    };
    Entity.prototype.resetDirection = function () {
        this.direction = new Vec2(0, 0);
    };
    Entity.prototype.addDirection = function (delta) {
        this.direction = this.direction.plus(delta);
    };
    Entity.prototype.accelerate = function (v, max) {
        var mag = Vec2.mag(this.velocity);
        if (mag > 0 && mag > max) {
            this.velocity = Vec2.norm(this.velocity).scale(max);
        }
        else {
            this.velocity = this.velocity.plus(this.direction.scale(v));
        }
    };
    Entity.prototype.setVelocity = function (velocity) {
        this.velocity = velocity;
    };
    Entity.prototype.decelerate = function (v, min) {
        var mag = Vec2.mag(this.velocity);
        console.log(mag);
        if (mag > 0 && mag < min) {
            this.resetVelocity();
        }
        else {
            this.velocity = this.velocity.minus(this.velocity.scale(v));
        }
    };
    Entity.prototype.resetVelocity = function () {
        this.velocity = new Vec2(0, 0);
    };
    Entity.prototype.setBoundingBox = function (bbox) {
        this.bbox = bbox;
    };
    Entity.prototype.collides = function (ent) {
        return this.bbox.collides(ent.bbox);
    };
    return Entity;
}());
var PunPun = (function (_super) {
    __extends(PunPun, _super);
    function PunPun() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PunPun.prototype.init = function () {
        this.rendered = true;
        this.sprite = new ImageWrapper(Sprites.PunPun);
    };
    PunPun.prototype.render = function (ctx, frame) {
        if (ctx != null) {
            this.setBoundingBox(new AABB(this.pos, frame.size.scale(frame.scale)));
            ctx.drawImage(this.sprite.getImage(), frame.crop.x, frame.crop.y, frame.size.x, frame.size.y, this.pos.x, this.pos.y, frame.size.x * frame.scale, frame.size.y * frame.scale);
            this.bbox.render(ctx);
        }
    };
    PunPun.prototype.renderAnimated = function (ctx) {
        var frame = this.frames[this.currentFrame];
        this.render(ctx, frame);
    };
    return PunPun;
}(Entity));
var Game = (function () {
    function Game(ctx, fps) {
        this.ctx = ctx;
        this.fps = fps;
        this.keyboard = new Keyboard();
        this.timestep = 1000 / fps;
        this.delta = 0;
        this.player = new PunPun(new Vec2(50, 50), new Vec2(0, 0));
    }
    Game.prototype.setSize = function (size) {
        this.size = size;
    };
    Game.prototype.getKeyboard = function () {
        return this.keyboard;
    };
    Game.prototype.getCanvasContext = function () {
        return this.ctx;
    };
    Game.prototype.loop = function () {
        if (this.lastTick == null) {
            this.lastTick = Date.now();
        }
        this.delta += Date.now() - this.lastTick;
        this.lastTick = Date.now();
        while (this.delta >= this.timestep) {
            this.update(this.timestep);
            this.delta -= this.timestep;
        }
        this.render();
    };
    Game.prototype.doInput = function () {
        var MAX_VELOCITY = 4;
        this.player.resetDirection();
        if (this.keyboard.isKeyDown(Keys.RIGHT)) {
            this.player.addDirection(new Vec2(1, 0));
        }
        if (this.keyboard.isKeyDown(Keys.LEFT)) {
            this.player.addDirection(new Vec2(-1, 0));
        }
        if (this.keyboard.isKeyDown(Keys.DOWN)) {
            this.player.addDirection(new Vec2(0, 1));
        }
        if (this.keyboard.isKeyDown(Keys.UP)) {
            this.player.addDirection(new Vec2(0, -1));
        }
        if (Vec2.mag(this.player.direction) > 0) {
            this.player.direction = Vec2.norm(this.player.direction);
        }
        if (this.keyboard.getPresses() > 0) {
            this.player.accelerate(0.25, MAX_VELOCITY);
        }
        else if (this.keyboard.getPresses() == 0 && this.player.isMoving()) {
            this.player.decelerate(0.1, 0.1);
        }
    };
    Game.prototype.update = function (elapsed) {
        this.doInput();
        this.player.update();
    };
    Game.prototype.render = function () {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height);
        var frame = { crop: new Vec2(13, 0), size: new Vec2(18, 17), scale: 4 };
        this.player.render(this.ctx, frame);
    };
    return Game;
}());
var ImageWrapper = (function () {
    function ImageWrapper(filename) {
        this.filename = filename;
        this.load_image();
    }
    ImageWrapper.prototype.load_image = function () {
        this.img = document.createElement('img');
        this.img.src = this.filename;
    };
    ImageWrapper.prototype.getImage = function () {
        return this.img;
    };
    return ImageWrapper;
}());
var Keys;
(function (Keys) {
    Keys[Keys["RIGHT"] = 39] = "RIGHT";
    Keys[Keys["LEFT"] = 37] = "LEFT";
    Keys[Keys["UP"] = 38] = "UP";
    Keys[Keys["DOWN"] = 40] = "DOWN";
})(Keys || (Keys = {}));
var Keyboard = (function () {
    function Keyboard(presses) {
        if (presses === void 0) { presses = 0; }
        this.presses = presses;
        this.keys = new Array(255);
    }
    Keyboard.prototype.isKeyDown = function (keycode) {
        return this.keys[keycode];
    };
    ;
    Keyboard.prototype.getPresses = function () {
        return this.presses;
    };
    Keyboard.prototype.handleKeydown = function (keycode) {
        if (!this.keys[keycode]) {
            this.presses++;
            this.keys[keycode] = true;
        }
    };
    Keyboard.prototype.handleKeyup = function (keycode) {
        if (this.keys[keycode]) {
            this.presses--;
            this.keys[keycode] = false;
        }
    };
    return Keyboard;
}());
var Sprites;
(function (Sprites) {
    Sprites["PunPun"] = "stahlsby.png";
})(Sprites || (Sprites = {}));
var Vec2 = (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.scale = function (k) {
        return Vec2.times(k, this);
    };
    Vec2.prototype.plus = function (v) {
        return Vec2.plus(this, v);
    };
    Vec2.prototype.minus = function (v) {
        return Vec2.minus(this, v);
    };
    Vec2.times = function (k, v) {
        return new Vec2(k * v.x, k * v.y);
    };
    Vec2.minus = function (v1, v2) {
        return new Vec2(v1.x - v2.x, v1.y - v2.y);
    };
    Vec2.plus = function (v1, v2) {
        return new Vec2(v1.x + v2.x, v1.y + v2.y);
    };
    Vec2.dot = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    };
    Vec2.mag = function (v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };
    Vec2.norm = function (v) {
        var mag = Vec2.mag(v);
        var div = (mag === 0) ? Infinity : 1.0 / mag;
        return Vec2.times(div, v);
    };
    return Vec2;
}());
