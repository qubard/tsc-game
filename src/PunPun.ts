import { Vec2 } from './Vec2';
import { ImageWrapper } from './ImageWrapper';
import { AABB } from './AABB';
import { Config } from './Config'
import { SpriteHelper } from './Sprite'
import { EntityRenderable } from './EntityRenderable';
import { Render } from './Animation';
import { MotionBlur } from './MotionBlur';

export class PunPun extends EntityRenderable {

    constructor(protected pos: Vec2, public dir: Vec2, protected bbox?: AABB) {
        super(pos, dir, bbox);

        this.idle_right = new Render.Animation(50);
        this.idle_left = new Render.Animation(50);
        this.move_left = new Render.Animation(30);
        this.move_right = new Render.Animation(30);

        this.sprite = new ImageWrapper(Config.Sprites.PunPun);

        this.blur = new MotionBlur(5, 100); // capacity and feed delay (ms) as arguments
        this.blur.setSprite(this.sprite);

        this.setMaxVelocity(2);

        let scale = 4;
        let size = new Vec2(18, 17);

        this.setBoundingBox(new AABB(this.pos, size.scale(scale)));

        this.idle_right.pushFrame(SpriteHelper.frameAt(0, size, scale));
        this.idle_right.pushFrame(SpriteHelper.frameAt(8, size, scale));
        this.idle_right.pushFrame(SpriteHelper.frameAt(9, size, scale));
        this.idle_right.pushFrame(SpriteHelper.frameAt(8, size, scale));

        this.idle_left.pushFrame(SpriteHelper.frameAt(4, size, scale));
        this.idle_left.pushFrame(SpriteHelper.frameAt(11, size, scale));
        this.idle_left.pushFrame(SpriteHelper.frameAt(10, size, scale));
        this.idle_left.pushFrame(SpriteHelper.frameAt(11, size, scale));

        this.move_left.pushFrame(SpriteHelper.frameAt(5, size, scale));
        this.move_left.pushFrame(SpriteHelper.frameAt(6, size, scale));
        this.move_left.pushFrame(SpriteHelper.frameAt(7, size, scale));
        this.move_left.pushFrame(SpriteHelper.frameAt(6, size, scale));

        this.move_right.pushFrame(SpriteHelper.frameAt(1, size, scale));
        this.move_right.pushFrame(SpriteHelper.frameAt(2, size, scale));
        this.move_right.pushFrame(SpriteHelper.frameAt(3, size, scale));
        this.move_right.pushFrame(SpriteHelper.frameAt(2, size, scale));
    }
}