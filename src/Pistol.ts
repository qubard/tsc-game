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

        this.idle_right = new Render.Animation(50);
        this.idle_left = new Render.Animation(50);
        this.move_left = new Render.Animation(30);
        this.move_right = new Render.Animation(30);

        let scale = Config.GameParams.Scale;
        let size = new Vec2(17, 12);

        this.idle_right.pushFrame(SpriteHelper.frameAt(0, size, scale));
        this.move_right.pushFrame(SpriteHelper.frameAt(0, size, scale));
        this.idle_left.pushFrame(SpriteHelper.frameAt(1, size, scale));
        this.move_left.pushFrame(SpriteHelper.frameAt(1, size, scale));
    }
}