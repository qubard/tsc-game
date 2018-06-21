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
    game = new Game(ctx, 200);
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
        this.velocity = new Vec2(0, 0);
        this.max_velocity = 1;
        this.pos = pos;
        this.bbox = bbox;
        this.init();
    }
    Entity.prototype.init = function () { };
    Entity.prototype.initPath = function (delay) {
        this.path = new Path(delay);
    };
    Entity.prototype.update = function () {
        if (this.isMoving()) {
            this.pos = this.pos.plus(this.velocity);
            if (this.path) {
                this.path.addNode(this.pos);
            }
        }
    };
    Entity.prototype.setMaxVelocity = function (max_velocity) {
        this.max_velocity = max_velocity;
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
    Entity.prototype.accelerate = function (v) {
        var mag = Vec2.mag(this.velocity);
        if (mag > 0 && mag > this.max_velocity) {
            this.velocity = Vec2.norm(this.velocity).scale(this.max_velocity);
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
        this.currentFrame = 0;
        this.frames = [];
        this.rendered = true;
        this.sprite = new ImageWrapper(Sprites.PunPun);
    };
    PunPun.prototype.render = function (ctx) {
        if (ctx != null) {
            var frame = this.frames[this.currentFrame];
            this.setBoundingBox(new AABB(this.pos, frame.size.scale(frame.scale)));
            this.sprite.draw(ctx, frame, this.pos);
            this.bbox.render(ctx);
            if (this.path) {
                this.path.render(ctx);
            }
        }
    };
    return PunPun;
}(Entity));
var Font = (function () {
    function Font(font, text, scale, dst) {
        this.font = font;
        this.text = text;
        this.scale = scale;
        this.dst = dst;
        this.glyphs = new ImageWrapper(font);
        this.rendered = true;
    }
    Font.init_map = function () {
        for (var i = 0; i < Font.charset.length; i++) {
            var v = Number(Font.charset.charCodeAt(i));
            Font.charset_map[v] = i * 9;
        }
    };
    Font.prototype.render = function (ctx) {
        if (ctx != null && this.rendered) {
            for (var i = 0; i < this.text.length; i++) {
                var x = Font.charset_map[Number(this.text.charCodeAt(i))];
                ctx.drawImage(this.glyphs.getImage(), x, 0, 9, 9, this.dst.x + i * 9 * this.scale, this.dst.y, 9 * this.scale, 9 * this.scale);
            }
        }
    };
    Font.charset = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    Font.charset_map = new Array(255);
    return Font;
}());
var Game = (function () {
    function Game(ctx, fps) {
        this.ctx = ctx;
        this.fps = fps;
        this.sample_text = new Font(Fonts.TorusSans, "Hi, testing fonts.\\:^)", 4, new Vec2(10, 10));
        this.keyboard = new Keyboard();
        this.timestep = 1000 / fps;
        this.delta = 0;
        this.player = new PunPun(new Vec2(50, 50), new Vec2(0, 0));
        this.player.init();
        this.player.setMaxVelocity(2);
        this.player.initPath(50);
        var frame = { crop: new Vec2(13, 0), size: new Vec2(18, 17), scale: 4 };
        this.player.frames.push(frame);
        Font.init_map();
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
    };
    Game.prototype.doInput = function () {
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
            this.player.accelerate(0.25);
        }
        else if (this.keyboard.getPresses() == 0 && this.player.isMoving()) {
            this.player.decelerate(0.1, 0.1);
        }
    };
    Game.prototype.update = function (elapsed) {
        this.doInput();
        this.player.update();
        this.render();
    };
    Game.prototype.render = function () {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height);
        this.player.render(this.ctx);
        this.sample_text.render(this.ctx);
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
    ImageWrapper.prototype.draw = function (ctx, frame, pos) {
        ctx.drawImage(this.img, frame.crop.x, frame.crop.y, frame.size.x, frame.size.y, pos.x, pos.y, frame.size.x * frame.scale, frame.size.y * frame.scale);
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
var Path = (function () {
    function Path(delay) {
        this.delay = delay;
        this.nodes = [];
        this.lastPush = Date.now();
        this.rendered = true;
    }
    Path.prototype.getDelay = function () {
        return this.delay;
    };
    Path.prototype.addNode = function (node) {
        if (this.nodes.length <= 1 || (this.nodes.length > 1 && !this.nodes[this.nodes.length - 1].equals(node))) {
            if (Date.now() - this.lastPush > this.delay) {
                this.nodes.push(node);
                this.lastPush = Date.now();
            }
        }
    };
    Path.prototype.clearNodes = function () {
        this.nodes = [];
    };
    Path.prototype.render = function (ctx, frame) {
        if (ctx != null && this.rendered) {
            for (var i = 0; i < this.nodes.length - 1; i++) {
                var node = this.nodes[i];
                var next = this.nodes[i + 1];
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(next.x, next.y);
                ctx.stroke();
            }
        }
    };
    return Path;
}());
var Sprites;
(function (Sprites) {
    Sprites["PunPun"] = "stahlsby.png";
})(Sprites || (Sprites = {}));
var Fonts;
(function (Fonts) {
    Fonts["TorusSans"] = "TorusSans.png";
})(Fonts || (Fonts = {}));
var Vec2 = (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.equals = function (v) {
        return this.x == v.x && this.y == v.y;
    };
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
