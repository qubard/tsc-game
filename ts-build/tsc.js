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
    }
    AABB.prototype.collides = function (other) {
        return this.pos.x >= other.pos.x && this.pos.x <= other.pos.x + other.size.x
            && this.pos.y >= other.pos.y && this.pos.y <= other.pos.y + other.size.y;
    };
    AABB.prototype.render = function (ctx) {
        ctx.rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
    };
    return AABB;
}());
var game;
window.onload = function () {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    game = new Game(ctx);
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
    game.tick();
    game.render();
    window.requestAnimationFrame(render);
}
var Entity = (function () {
    function Entity(pos, velocity, bbox) {
        this.pos = pos;
        this.velocity = velocity;
        this.bbox = bbox;
        this.init();
    }
    Entity.prototype.setVelocity = function (velocity) {
        this.velocity = velocity;
    };
    Entity.prototype.setBoundingBox = function (bbox) {
        this.bbox = bbox;
    };
    Entity.prototype.init = function () { };
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
    PunPun.prototype.contructor = function (pos, velocity, bbox) {
        this.sprite = new ImageWrapper(Sprites.PunPun);
    };
    PunPun.prototype.init = function () {
        this.sprite = new ImageWrapper(Sprites.PunPun);
    };
    PunPun.prototype.render = function (ctx, frame) {
        if (ctx != null) {
            this.setBoundingBox(new AABB(this.pos, frame.size.scale(frame.scale)));
            ctx.drawImage(this.sprite.getImage(), frame.crop.x, frame.crop.y, frame.size.x, frame.size.y, this.pos.x, this.pos.y, frame.size.x * frame.scale, frame.size.y * frame.scale);
            this.bbox.render(ctx);
        }
    };
    return PunPun;
}(Entity));
var Game = (function () {
    function Game(ctx) {
        this.ctx = ctx;
        this.keyboard = new Keyboard();
        this.player = new PunPun(new Vec2(50, 50));
    }
    Game.prototype.getKeyboard = function () {
        return this.keyboard;
    };
    Game.prototype.getCanvasContext = function () {
        return this.ctx;
    };
    Game.prototype.tick = function () {
        if (this.keyboard.isKeyDown(Keys.RIGHT)) {
            console.log("Pressed right wkey");
        }
        else if (this.keyboard.isKeyDown(Keys.LEFT)) {
            console.log("Pressed left key");
        }
    };
    Game.prototype.render = function () {
        var frame = { crop: new Vec2(0, 0), size: new Vec2(13, 17), scale: 4 };
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
})(Keys || (Keys = {}));
var Keyboard = (function () {
    function Keyboard() {
        this.keys = new Array(255);
    }
    Keyboard.prototype.isKeyDown = function (keycode) {
        return this.keys[keycode];
    };
    ;
    Keyboard.prototype.handleKeydown = function (keycode) {
        this.keys[keycode] = true;
    };
    Keyboard.prototype.handleKeyup = function (keycode) {
        this.keys[keycode] = false;
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
