namespace Render {
    export class Animation {
        public currentFrame: number = 0;
        public frameRate: number = 1;
    }

    // Entities have directional animations, so each direction needs a SpriteFrame[]
    export interface EntFrames {
        active: SpriteFrame[]; // the active SpriteFrame[] for switching
        idle_left: SpriteFrame[];
        idle_right: SpriteFrame[];
        move_left: SpriteFrame[];
        move_right: SpriteFrame[];
    }

    export class StaticAnimation extends Animation {
        frames: SpriteFrame[];
    }

    export class EntAnimation extends Animation {
        frames: EntFrames = { active: [], idle_left: [], idle_right: [], move_left: [], move_right: [] };

        getFrames(dir: Vec2, facingRight: boolean): SpriteFrame[] {
            let ret = null;
            if(dir.x > 0) {
                ret = this.frames.move_right;
            } else if(dir.x < 0) {
                ret = this.frames.move_left;
            } else {
                if(facingRight) {
                  ret = this.frames.idle_right;  
                } else {
                  ret = this.frames.idle_left;
                }
            }
            
            // Reset the current frame if the active frame changes (within the getter itself)
            if(ret != this.frames.active) {
                this.frames.active = ret;
                this.currentFrame = 0;
            }
            
            return ret;
        }
    }
}