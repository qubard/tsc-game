class Game {
    private keyboard: Keyboard;
    private player: PunPun;
    
    constructor(private ctx: CanvasRenderingContext2D) {
        this.keyboard = new Keyboard();
        
        this.player = new PunPun(new Vec2(50,50));
    }
    
    getKeyboard(): Keyboard {
        return this.keyboard;
    }
    
    getCanvasContext(): CanvasRenderingContext2D {
        return this.ctx;
    }

    tick() {
        if(this.keyboard.isKeyDown(Keys.RIGHT)) {
            console.log("Pressed right wkey");
        } else if(this.keyboard.isKeyDown(Keys.LEFT)) {
            console.log("Pressed left key");
        }
    }
    
    render() {
        var frame: SpriteFrame = { crop: new Vec2(0,0), size: new Vec2(13, 17), scale: 4 };
        this.player.render(this.ctx, frame);
    }
}