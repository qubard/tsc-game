import { Vec2 } from "./Vec2"
import { SpriteFrame } from './Sprite';

export class ImageWrapper {
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

    draw(ctx: CanvasRenderingContext2D, frame: SpriteFrame, pos: Vec2) {
        ctx.drawImage(this.img, frame.crop.x, frame.crop.y, frame.size.x, frame.size.y, pos.x + frame.offset.x, pos.y + frame.offset.y, frame.size.x * frame.scale, frame.size.y * frame.scale);
    }
}