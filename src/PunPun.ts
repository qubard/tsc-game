class PunPun extends EntityRenderable {

    constructor(protected pos: Vec2, public dir: Vec2, protected bbox?: AABB) {
        super(pos, dir, bbox);

        this.idle_right = new Render.Animation(40);
        this.idle_left = new Render.Animation(40);
        this.move_left = new Render.Animation(20);
        this.move_right = new Render.Animation(30);
        
        this.setMaxVelocity(1);

        let scale = 4;
        let size = new Vec2(18,17);
        
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
        
        this.sprite = new ImageWrapper(Sprites.PunPun);
    }
}