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
        this.move_left = new Render.Animation(5);
        this.move_right = new Render.Animation(5);

        let scale = Config.GameParams.Scale;
        let size = new Vec2(17, 12);

        for(var i = -Math.PI; i < Math.PI; i += 0.1) {
            let height = new Vec2(0, 12 * Math.cos(i) + 5*Config.GameParams.Scale);
            let leftFrame = SpriteHelper.frameAtOffset(1, size, scale, height);
            let rightFrame = SpriteHelper.frameAtOffset(0, size, scale, height);
            this.move_left.pushFrame(SpriteHelper.frameAtOffset(1, size, scale, height));
            this.move_right.pushFrame(SpriteHelper.frameAtOffset(0, size, scale, height));
            this.idle_right.pushFrame(SpriteHelper.frameAtOffset(0, size, scale, height));
            this.idle_left.pushFrame(SpriteHelper.frameAtOffset(1, size, scale, height));
        }
    }
}