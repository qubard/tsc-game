class PunPun extends EntityRenderable {
    init() {
        this.animation = new Render.EntAnimation();
        this.setBoundingBox(new AABB(this.pos, new Vec2(18, 17).scale(4)));

        this.animation.frameRate = 50;

        this.animation.frames.idle_right.push({ crop: new Vec2(0, 0), size: new Vec2(13, 17), scale: 4 });
        this.animation.frames.idle_right.push({ crop: new Vec2(65, 17), size: new Vec2(13, 17), scale: 4 });
        this.animation.frames.idle_right.push({ crop: new Vec2(78, 17), size: new Vec2(13, 17), scale: 4 });
        this.animation.frames.idle_right.push({ crop: new Vec2(65, 17), size: new Vec2(13, 17), scale: 4 });

        this.animation.frames.idle_left.push({ crop: new Vec2(0, 17), size: new Vec2(13, 17), scale: 4 });
        this.animation.frames.idle_left.push({ crop: new Vec2(105, 17), size: new Vec2(13, 17), scale: 4 });
        this.animation.frames.idle_left.push({ crop: new Vec2(92, 17), size: new Vec2(13, 17), scale: 4 });
        this.animation.frames.idle_left.push({ crop: new Vec2(105, 17), size: new Vec2(13, 17), scale: 4 });

        this.animation.frames.move_left.push({ crop: new Vec2(13, 17), size: new Vec2(17, 17), scale: 4 });
        this.animation.frames.move_left.push({ crop: new Vec2(31, 17), size: new Vec2(16, 17), scale: 4 });
        this.animation.frames.move_left.push({ crop: new Vec2(47, 17), size: new Vec2(18, 15), scale: 4 });

        this.animation.frames.move_right.push({ crop: new Vec2(13, 0), size: new Vec2(17, 17), scale: 4 });
        this.animation.frames.move_right.push({ crop: new Vec2(31, 0), size: new Vec2(16, 17), scale: 4 });
        this.animation.frames.move_right.push({ crop: new Vec2(47, 0), size: new Vec2(18, 15), scale: 4 });

        this.rendered = true;
        this.sprite = new ImageWrapper(Sprites.PunPun);
    }
}