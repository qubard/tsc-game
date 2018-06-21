class Font implements Renderable {
    private glyphs: ImageWrapper;
    rendered: boolean;
    
    static charset:string = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    
    static charset_map:number[] = new Array<number>(255);
    
    constructor(public font: string, public text: string, private scale: number, private dst: Vec2) { 
        this.glyphs = new ImageWrapper(font);
        this.rendered = true;
    }
    
    static init_map() {
        for(var i = 0; i < Font.charset.length; i++) {
            let v = Number(Font.charset.charCodeAt(i));
            Font.charset_map[v] = i*9;
        }
    }
    
    render(ctx: CanvasRenderingContext2D) {
        if(ctx != null && this.rendered) {
            for(var i = 0; i < this.text.length; i++) {
                let x = Font.charset_map[Number(this.text.charCodeAt(i))];
                ctx.drawImage(this.glyphs.getImage(), x, 0, 9, 9, this.dst.x+i*9*this.scale, this.dst.y, 9*this.scale, 9*this.scale);    
            }
        }
    }
}