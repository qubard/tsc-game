class Font implements Renderable {
    private glyphs: ImageWrapper;
    rendered: boolean;

    static GLYPH_SIZE: number = 9;
    static charset: string = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    static charset_map: number[] = new Array<number>(255);

    constructor(public font: string, public text: string, private scale: number, private dst: Vec2) {
        this.glyphs = new ImageWrapper(font);
        this.rendered = true;
    }

    static init_map() {
        for (var i = 0; i < Font.charset.length; i++) {
            let v = Number(Font.charset.charCodeAt(i));
            Font.charset_map[v] = i * Font.GLYPH_SIZE;
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (ctx != null && this.rendered) {
            for (var i = 0; i < this.text.length; i++) {
                let x = Font.charset_map[Number(this.text.charCodeAt(i))];
                ctx.drawImage(this.glyphs.getImage(), x, 0, Font.GLYPH_SIZE, Font.GLYPH_SIZE, this.dst.x + i * Font.GLYPH_SIZE * this.scale, this.dst.y, Font.GLYPH_SIZE * this.scale, Font.GLYPH_SIZE * this.scale);
            }
        }
    }
}