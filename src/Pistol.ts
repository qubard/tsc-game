import { EntityRenderable } from "./EntityRenderable";
import { Vec2 } from "./Vec2";
import { AABB } from "./AABB";
import { ImageWrapper } from "./ImageWrapper";
import { Render } from "./Animation";
import { Config } from "./Config";
import { SpriteHelper } from "./Sprite";

export class Pistol extends EntityRenderable {
    
    constructor(protected pos: Vec2, public dir: Vec2, protected bbox?: AABB) {
        super(pos, dir, bbox);

        this.sprite = new ImageWrapper(Config.Sprites.Pistol);

        this.idle_right = new Render.Animation(5);
        this.idle_left = new Render.Animation(5);
        this.move_left = new Render.Animation(30);
        this.move_right = new Render.Animation(30);

        let scale = Config.GameParams.Scale;
        let size = new Vec2(17, 12);

        for(var i = -Math.PI/2; i < Math.PI/2; i += 0.1) {
            this.idle_left.pushFrame(SpriteHelper.frameAtOffset(1, size, scale, new Vec2(0, 16 * Math.cos(i))));
        }
    }
}