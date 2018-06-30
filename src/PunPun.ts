class PunPun extends EntityRenderable {

    constructor(protected pos: Vec2, public dir: Vec2, protected bbox?: AABB) {
        super(pos, dir, bbox);

        this.animation = new Render.EntityAnimation();

        this.animation.idle_right = new Render.Animation(50);
        this.animation.idle_left = new Render.Animation(50);
        this.animation.move_left = new Render.Animation(20);
        this.animation.move_right = new Render.Animation(20);

        this.setBoundingBox(new AABB(this.pos, new Vec2(18, 17).scale(4)));

        this.animation.idle_right.pushFrame({ crop: new Vec2(0, 0), size: new Vec2(13, 17), scale: 4 });
        this.animation.idle_right.pushFrame({ crop: new Vec2(65, 17), size: new Vec2(13, 17), scale: 4 });
        this.animation.idle_right.pushFrame({ crop: new Vec2(78, 17), size: new Vec2(13, 17), scale: 4 });
        this.animation.idle_right.pushFrame({ crop: new Vec2(65, 17), size: new Vec2(13, 17), scale: 4 });

        this.animation.idle_left.pushFrame({ crop: new Vec2(0, 17), size: new Vec2(13, 17), scale: 4 });
        this.animation.idle_left.pushFrame({ crop: new Vec2(105, 17), size: new Vec2(13, 17), scale: 4 });
        this.animation.idle_left.pushFrame({ crop: new Vec2(92, 17), size: new Vec2(13, 17), scale: 4 });
        this.animation.idle_left.pushFrame({ crop: new Vec2(105, 17), size: new Vec2(13, 17), scale: 4 });

        this.animation.move_left.pushFrame({ crop: new Vec2(13, 17), size: new Vec2(17, 17), scale: 4 });
        this.animation.move_left.pushFrame({ crop: new Vec2(31, 17), size: new Vec2(16, 17), scale: 4 });
        this.animation.move_left.pushFrame({ crop: new Vec2(47, 17), size: new Vec2(18, 15), scale: 4 });

        this.animation.move_right.pushFrame({ crop: new Vec2(13, 0), size: new Vec2(17, 17), scale: 4 });
        this.animation.move_right.pushFrame({ crop: new Vec2(31, 0), size: new Vec2(16, 17), scale: 4 });
        this.animation.move_right.pushFrame({ crop: new Vec2(47, 0), size: new Vec2(18, 15), scale: 4 });

        this.sprite = new ImageWrapper(Sprites.PunPun);
    }
}