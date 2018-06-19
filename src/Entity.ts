class Entity {
    protected pos: Vec2;
    private velocity?: Vec2;
    protected bbox?: AABB; // 2d collision bounding box

    constructor(pos: Vec2, velocity?: Vec2, bbox?: AABB) {
        this.pos = pos;
        this.velocity = velocity;
        this.bbox = bbox;
        
        this.init();
    }
    
    setVelocity(velocity: Vec2) {
        this.velocity = velocity;
    }
    
    setBoundingBox(bbox: AABB) {
        this.bbox = bbox;
    }
    
    protected init() { }
	
    collides(ent: Entity): boolean {
        return this.bbox.collides(ent.bbox);
    }
}

class PunPun extends Entity {
    
    private sprite: ImageWrapper;
    
    contructor(pos: Vec2, velocity?: Vec2, bbox?: AABB) {
        this.sprite = new ImageWrapper(Sprites.PunPun);
    }
    
    init() {
        this.sprite = new ImageWrapper(Sprites.PunPun);
    }
    
    render(ctx: CanvasRenderingContext2D, frame: SpriteFrame) {
        if(ctx != null) {
            this.setBoundingBox(new AABB(this.pos, frame.size.scale(frame.scale)));
            ctx.drawImage(this.sprite.getImage(), frame.crop.x, frame.crop.y, frame.size.x, frame.size.y, this.pos.x, this.pos.y, frame.size.x*frame.scale, frame.size.y*frame.scale);
            this.bbox.render(ctx);
        }
    }
}