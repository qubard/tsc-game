import { ImageWrapper } from "./ImageWrapper";
import { Renderable } from "./Sprite";
import { Vec2 } from "./Vec2";
import { Config } from "./Config";

export class Font implements Renderable {
    private glyphs: ImageWrapper;
    rendered: boolean = true;

    private cropSize: Vec2;
    static charset_map: number[] = new Array<number>(255);

    constructor(params: Config.FontParams, public text: string, private scale: number, private dst: Vec2) {
        this.glyphs = new ImageWrapper(params.filename);
        this.cropSize = params.cropSize;
        this.init_map();
    }

    private init_map() {
        let charset = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ';
        for (var i = 0; i < charset.length; i++) {
            let v = Number(charset.charCodeAt(i));
            Font.charset_map[v] = i * this.cropSize.x; // map the cropped position of the glyph
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.rendered) {
            let posy = this.dst.y;
            let orig_x = this.dst.x;
            let posx = this.dst.x;
            for (var i = 0; i < this.text.length; i++) {
                let dx = this.cropSize.x * this.scale;
                if (this.text[i] != '\n') {
                    let x = Font.charset_map[Number(this.text.charCodeAt(i))];
                    ctx.drawImage(this.glyphs.getImage(), x, 0, this.cropSize.x, this.cropSize.y, posx, posy, dx, this.cropSize.y * this.scale);
                    posx += dx;
                } else {
                    posx = orig_x;
                    posy += dx;
                }
            }
        }
    }
}