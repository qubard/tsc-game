class Game {
    private keyboard: Keyboard;
    private player: EntityRenderable;
    private size: ClientRect;

    private timestep: number;
    private delta: number;
    private lastTick: number;

    private console: GConsole;

    private sample_text: Font = new Font(Fonts.Victoria, "Hi, testing fonts.\\:^)", 2, new Vec2(10, 10));


    constructor(private ctx: CanvasRenderingContext2D, private fps: number) {
        this.keyboard = new Keyboard();
        this.console = new GConsole(new Vec2(10, 10), 5, true, 0.5);
        this.timestep = 1000 / fps;
        this.delta = 0;

        this.player = new PunPun(new Vec2(50, 50), new Vec2(0, 0));

        Font.init_map();
    }

    setSize(size: ClientRect) {
        this.size = size;
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
            this.console.log("Resetting delta timestep, 10s of ticks missed");
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
    
    i: number = 0;

    update(elapsed: number) {
        this.doInput();
        this.player.update();
        this.render();
        this.console.log("Game::update(" + (this.i++/100 | 0) + ")");
    }

    render() {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height);
        this.player.render(this.ctx);
        this.console.render(this.ctx);
        /*this.sample_text.text = "n:" + (this.player.getPath() ? this.player.getPath().getLength() : 0) + "," + this.keyboard.getPresses() + "\ntesting Victoria & newlines.\nhello";
        this.sample_text.render(this.ctx);*/
    }
}