class EntityRenderable extends Entity implements Renderable {
    protected animation: Render.EntityAnimation;

    sprite: ImageWrapper;
    rendered: boolean = true;

    render(ctx: CanvasRenderingContext2D) {
        if (ctx != null && this.rendered) {
            let animation = this.animation.getAnimation(this.dir, this.facingRight);
            let frames = animation.getFrames();

            if (frames) {
                let frame = frames[((animation.getFrameIncrement() / animation.getFrameRate()) | 0) % frames.length];
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