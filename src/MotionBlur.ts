import { ImageWrapper } from "./ImageWrapper";
import { Renderable, SpriteFrame } from "./Sprite";
import { Vec2 } from "./Vec2";
import { CircularBuffer } from "./CircularBuffer";

// Need a position associated with a SpriteFrame
export interface BufferFrame {
    pos: Vec2;
    frame: SpriteFrame;
    expire?: number;
}

export class MotionBlur implements Renderable {
    rendered: boolean = true;

    private spriteBuffer: CircularBuffer<BufferFrame>; // wrap-around buffer for sprite frames
    private lastFeed: number = Date.now();
    private sprite: ImageWrapper;

    constructor(private feed_delay: number, private expires: number) {
        this.spriteBuffer = new CircularBuffer<BufferFrame>(expires/feed_delay+1);
    }

    setSprite(sprite: ImageWrapper) {
        this.sprite = sprite;
    }

    // Attempt to feed a frame into the Sprite buffer (will wrap automatically)
    feed(frame: BufferFrame) {
        let curr = Date.now();
        if (curr - this.lastFeed > this.feed_delay) {
            frame.expire = curr + this.expires;
            this.spriteBuffer.push(frame);
            this.lastFeed = curr;
        }
    }

    render(ctx: CanvasRenderingContext2D, frame?: BufferFrame) {
        if (ctx != null && this.rendered) {
            for(var i = 0; i < this.spriteBuffer.getLength(); i++) {
                let sprite = this.spriteBuffer.get(i);
                let expireDelta = Date.now()-sprite.expire;
                if(sprite.expire && expireDelta < 0) {
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, -expireDelta/(this.expires)-0.4);
                    this.sprite.draw(ctx, sprite.frame, sprite.pos);
                    ctx.restore();
                }
            }
        }
    }
}