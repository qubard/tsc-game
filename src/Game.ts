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

    update(elapsed: number) {
        this.player.update();
        
        if(this.keyboard.isKeyDown(Keys.RIGHT)) {
            this.player.accelerate(new Vec2(0.15, 0));
        }
        
        if(this.keyboard.isKeyDown(Keys.LEFT)) {
            this.player.accelerate(new Vec2(-0.15, 0));
        } 
        
        if(this.keyboard.isKeyDown(Keys.DOWN)) {
            this.player.accelerate(new Vec2(0, 0.15));
        } 
        
        if(this.keyboard.isKeyDown(Keys.UP)) {
            this.player.accelerate(new Vec2(0, -0.15));
        }
        
        if(this.keyboard.getPresses() == 0) {
            this.player.reduceVelocity(0.9);
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height);
        
        var frame: SpriteFrame = { crop: new Vec2(0,0), size: new Vec2(13, 17), scale: 4 };
        this.player.render(this.ctx, frame);
    }
}