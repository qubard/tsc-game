import { Renderable } from "./Sprite";
import { ImageWrapper } from "./ImageWrapper";
import { Entity } from "./Entity";
import { Render } from "./Animation";
import { Vec2 } from "./Vec2";
import { MotionBlur } from "./MotionBlur";

export class EntityRenderable extends Entity implements Renderable {
    sprite: ImageWrapper;
    rendered: boolean = true;

    private active: Render.Animation = null;
    protected idle_left: Render.Animation;
    protected idle_right: Render.Animation;
    protected move_left: Render.Animation;
    protected move_right: Render.Animation;

    protected blur: MotionBlur;

    // Get the directed animation
    private getAnimation(dir: Vec2, facingRight: boolean): Render.Animation {
        let ret = this.active;
        if (dir.x > 0) {
            ret = this.move_right;
        } else if (dir.x < 0) {
            ret = this.move_left;
        } else {
            ret = Math.abs(dir.y) == 0 ? facingRight ? this.idle_right : this.idle_left : facingRight ? this.move_right : this.move_left;
        }

        return ret;
    }

    resetFrame(animation: Render.Animation): void {
        if (animation != this.active) {
            if (this.active) {
                this.active.resetFrame();
            }
            this.active = animation;
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.rendered) {
            let animation = this.getAnimation(this.dir, this.facingRight);

            // Reset the frame index if the animation changes
            this.resetFrame(animation);

            let frames = animation.getFrames();

            if (frames) {
                let frame = frames[((animation.getFrameIncrement() / animation.getFrameRate()) | 0) % frames.length];
                if (frame) {
                    if (this.blur) {
                        this.blur.render(ctx);
                        this.blur.feed({ pos: this.pos, frame: frame });
                    }
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