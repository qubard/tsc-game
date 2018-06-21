class Game {
    private keyboard: Keyboard;
    private player: PunPun;
    private size: ClientRect;
    
    private timestep: number;
    private delta: number;
    private lastTick: number;
    
    constructor(private ctx: CanvasRenderingContext2D, private fps: number) {
        this.keyboard = new Keyboard();
        this.timestep = 1000/fps;
        this.delta = 0;
        
        this.player = new PunPun(new Vec2(50,50), new Vec2(0,0));
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
        if(this.lastTick == null) {
            this.lastTick = Date.now();
        }
        
        this.delta += Date.now() - this.lastTick;
        this.lastTick = Date.now();
        while(this.delta >= this.timestep) {
            this.update(this.timestep);
            this.delta -= this.timestep;
        }
        this.render();
    }
    
    doInput() {
        let MAX_VELOCITY = 4;
        
        this.player.resetDirection();
        
        if(this.keyboard.isKeyDown(Keys.RIGHT)) {
            this.player.addDirection(new Vec2(1, 0));
        }
        
        if(this.keyboard.isKeyDown(Keys.LEFT)) {
            this.player.addDirection(new Vec2(-1, 0));
        }
        
        if(this.keyboard.isKeyDown(Keys.DOWN)) {
            this.player.addDirection(new Vec2(0, 1));
        }
        
        if(this.keyboard.isKeyDown(Keys.UP)) {
            this.player.addDirection(new Vec2(0, -1));
        }
        
        if(Vec2.mag(this.player.direction) > 0) {
            this.player.direction = Vec2.norm(this.player.direction);
        }
        
        if(this.keyboard.getPresses() > 0) {
            this.player.accelerate(0.25, MAX_VELOCITY);
        } else if(this.keyboard.getPresses() == 0 && this.player.isMoving()) {
            this.player.decelerate(0.1, 0.1);
        }
    }

    update(elapsed: number) {
        this.doInput();
        this.player.update();
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height);
        
        var frame: SpriteFrame = { crop: new Vec2(13, 0), size: new Vec2(18, 17), scale: 4 };
        this.player.render(this.ctx, frame);
    }
}