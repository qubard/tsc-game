class ImageWrapper {
    private img: HTMLImageElement;
    
    constructor(public filename: string) { 
        this.load_image();
    }
    
    private load_image() {
        this.img = document.createElement('img');
        this.img.src = this.filename;
    }
    
    getImage(): HTMLImageElement {
        return this.img;
    }
    
    draw(ctx: CanvasRenderingContext2D, frame: Render.SpriteFrame, pos: Vec2) {
        ctx.drawImage(this.img, frame.crop.x, frame.crop.y, frame.size.x, frame.size.y, pos.x, pos.y, frame.size.x*frame.scale, frame.size.y*frame.scale);    
    }
}