class EntityRenderable extends Entity implements Renderable {
    protected animation: Render.EntAnimation;

    sprite: ImageWrapper;
    rendered: boolean;

    render(ctx: CanvasRenderingContext2D) {
        if (ctx != null && this.rendered) {
            let frames = this.animation.getFrames(this.dir, this.facingRight);

            if (frames) {
                let frame = frames[((++this.animation.currentFrame / this.animation.frameRate) | 0) % frames.length];
                if (frame) {
                    this.sprite.draw(ctx, frame, this.pos);
                }
            }

            if (this.bbox) {
                this.bbox.render(ctx);
            }

            if (this.path) {
                this.path.render(ctx);
            }
        }
    }
}