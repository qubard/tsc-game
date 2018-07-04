import { SpriteFrame } from "./Sprite";

export namespace Render {
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
}