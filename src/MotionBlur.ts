// Need a position associated with a SpriteFrame
interface BufferFrame {
    pos: Vec2;
    frame: SpriteFrame;
}

class MotionBlur implements Renderable {
    rendered: boolean = true;

    private spriteBuffer: CircularBuffer<BufferFrame>; // wrap-around buffer for sprite frames
    private lastFeed: number = Date.now();
    private sprite: ImageWrapper;

    constructor(private capacity: number, private feed_delay: number) {
        this.spriteBuffer = new CircularBuffer<BufferFrame>(this.capacity);
    }

    setSprite(sprite: ImageWrapper) {
        this.sprite = sprite;
    }

    // Attempt to feed a frame into the Sprite buffer (will wrap automatically)
    feed(frame: BufferFrame) {
        let curr = Date.now();
        if (curr - this.lastFeed > this.feed_delay) {
            this.spriteBuffer.push(frame);
            this.lastFeed = curr;
        }
    }

    render(ctx: CanvasRenderingContext2D, frame?: BufferFrame) {
        if (ctx != null && this.rendered) {
            for (var i = 0; i < this.spriteBuffer.getLength(); i++) {
                var buff = this.spriteBuffer.get(i);
                if (buff) {
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, 0.2);
                    this.sprite.draw(ctx, buff.frame, buff.pos);
                    ctx.restore();
                }
            }
        }
    }
}