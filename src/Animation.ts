namespace Render {
    export class Animation {
        private currentFrame: number = 0;
        private frames: SpriteFrame[] = [];

        constructor(private framerate: number) { }

        pushFrame(frame: SpriteFrame) {
            this.frames.push(frame);
        }

        getFrames(): SpriteFrame[] {
            return this.frames;
        }

        getFrameRate(): number {
            return this.framerate;
        }

        getCurrentFrame(): number {
            return this.currentFrame;
        }
        
        resetFrame() {
            this.currentFrame = 0;
        }

        getFrameIncrement(): number {
            return this.currentFrame++;
        }
    }

    export class EntityAnimation {
        active: Animation;
        idle_left: Animation;
        idle_right: Animation;
        move_left: Animation;
        move_right: Animation;

        // Get the directed animation
        getAnimation(dir: Vec2, facingRight: boolean): Animation {
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
                if(this.active) {
                    this.active.resetFrame();        
                }
                this.active = ret;
            }

            return ret;
        }
    }
}