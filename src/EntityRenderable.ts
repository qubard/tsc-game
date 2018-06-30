class EntityRenderable extends Entity implements Renderable {
    sprite: ImageWrapper;
    rendered: boolean = true;
    
    private active: Render.Animation;
    protected idle_left: Render.Animation;
    protected idle_right: Render.Animation;
    protected move_left: Render.Animation;
    protected move_right: Render.Animation;

    // Get the directed animation
    private getAnimation(dir: Vec2, facingRight: boolean): Render.Animation {
        let ret = null;
        if (dir.x > 0) {
            ret = this.move_right;
        } else if (dir.x < 0) {
            ret = this.move_left;
        } else {
            if (facingRight) {
                ret = this.idle_right;
            } else {
                ret = this.idle_left;
            }
        }

        // Reset the current frame if the active frame changes (within the getter itself)
        if (ret != this.active) {
            if (this.active) {
                this.active.resetFrame();
            }
            this.active = ret;
        }

        return ret;
    }

    render(ctx: CanvasRenderingContext2D) {
        if (ctx != null && this.rendered) {
            let animation = this.getAnimation(this.dir, this.facingRight);
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