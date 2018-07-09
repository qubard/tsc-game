import { Keyboard, Keys } from "./Keyboard";
import { Font } from "./Font";
import { GameConsole } from "./GameConsole";
import { PunPun } from "./PunPun";
import { Vec2 } from "./Vec2";
import { EntityRenderable } from "./EntityRenderable";
import { Config } from "./Config";
import { Pistol } from "./Pistol";

export class Game {
    private keyboard: Keyboard;
    private player: EntityRenderable;
    private size: ClientRect;

    private fps: number;
    private timestep: number;
    private delta: number;
    private lastTick: number;

    private gameConsole: GameConsole;

    private pistol: Pistol;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.fps = Config.GameParams.FPS;
        this.keyboard = new Keyboard();
        this.gameConsole = new GameConsole(new Vec2(10, 10), 50, 1, true, 0.5);
        this.timestep = 1000 / this.fps;
        this.delta = 0;

        this.player = new PunPun(new Vec2(50, 50), new Vec2(0, 0));
        this.pistol = new Pistol(new Vec2(50, 50), new Vec2(1,0));
        this.pistol.attachTo(this.player);
        Font.init_map();

        this.registerKeys();
    }

    setSize(size: ClientRect) {
        this.size = size;
    }

    private registerKeys() {
        this.keyboard.validateKeys([Keys.LEFT, Keys.RIGHT, Keys.UP, Keys.DOWN]);
    }

    getKeyboard(): Keyboard {
        return this.keyboard;
    }

    getCanvasContext(): CanvasRenderingContext2D {
        return this.ctx;
    }

    loop() {
        if (this.lastTick == null) {
            this.lastTick = Date.now();
        }

        this.delta += Date.now() - this.lastTick;
        this.lastTick = Date.now();

        // delta is way too high (missed 10s of ticks, reset otherwise loop is basically infinite)
        if (this.delta / this.timestep >= this.fps * 10) {
            this.delta = 0;
            this.gameConsole.log("Resetting delta timestep, 10s of ticks missed");
        }

        while (this.delta >= this.timestep) {
            this.update(this.timestep);
            this.delta -= this.timestep;
        }
    }

    doInput() {
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

        // todo: move this
        if (Vec2.mag(this.player.dir) > 0) {
            this.player.dir = Vec2.norm(this.player.dir);
        }

        if (this.keyboard.getPresses() > 0) {
            this.player.accelerate(0.25);
        } else if (this.keyboard.getPresses() == 0 && this.player.isMoving()) {
            this.player.decelerate(0.1, 0.1);
        }
    }

    update(elapsed: number) {
        this.doInput();
        this.player.update();
        this.pistol.update();
        this.render();
        this.gameConsole.log("(x,y)=" + (this.player.getPos().x | 0) + "," + (this.player.getPos().y | 0));
    }

    render() {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height);
        this.player.render(this.ctx);
        this.pistol.render(this.ctx);
        this.gameConsole.render(this.ctx);
    }
}