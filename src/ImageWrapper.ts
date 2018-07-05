import { Vec2 } from "./Vec2"
import { SpriteFrame } from './Sprite';

export class ImageWrapper {
    private width: number = -1;
    private height: number = -1;
    private img: HTMLImageElement;

    constructor(public filename: string, private size?: Vec2) {
        this.load_image();
        if (size) {
            this.width = size.x;
            this.height = size.y;
        }
    }

    private load_image() {
        this.img = document.createElement('img');
        this.img.src = this.filename;
        alert("Loaded");
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getImage(): HTMLImageElement {
        return this.img;
    }

    draw(ctx: CanvasRenderingContext2D, frame: SpriteFrame, pos: Vec2) {
        ctx.drawImage(this.img, frame.crop.x, frame.crop.y, frame.size.x, frame.size.y, pos.x, pos.y, frame.size.x * frame.scale, frame.size.y * frame.scale);
    }
}