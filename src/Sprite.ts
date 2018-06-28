interface Renderable {
    rendered: boolean;
    render(ctx: CanvasRenderingContext2D): void;
}

namespace Render {
    export interface SpriteFrame {
        crop: Vec2;
        size: Vec2;
        scale: number;
    }
    
    export class Animation {
        public currentFrame: number = 0;
        protected delay: number = 1;
    }

    export interface EntFrames {
        idle_left: SpriteFrame[];
        idle_right: SpriteFrame[];
        move_left: SpriteFrame[];
        move_right: SpriteFrame[];
    }

    export class StaticAnimation extends Animation {
        frames: SpriteFrame[];
    }

    export class EntAnimation extends Animation {
        frames: EntFrames = {idle_left: [], idle_right: [], move_left: [], move_right: []};
        
        getFrames(dir: Vec2, facingRight: boolean): SpriteFrame[] {
            return dir.x > 0 ? this.frames.move_right : dir.x < 0 ? this.frames.move_left : facingRight ? this.frames.idle_right : this.frames.idle_left;
        }
    }
}