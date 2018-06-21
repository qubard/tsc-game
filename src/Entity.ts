class Entity {
    protected pos: Vec2;
    protected velocity: Vec2;
    protected bbox?: AABB; // 2d collision bounding box
        
    path: Path;
    
    constructor(pos: Vec2, public direction: Vec2, bbox?: AABB) {
        this.pos = pos;
        this.velocity = new Vec2(0,0);
        this.bbox = bbox;

        this.init();
    }
    
    public initPath(delay: number) {
        this.lastPush = Date.now();
        this.path = new Path(delay);
    }
    
    protected init() {
        this.velocity = new Vec2(0,0);
    }
    
    update() {
        if(this.isMoving()) {
            this.pos = this.pos.plus(this.velocity);
            if(this.path) {
                this.path.addNode(this.pos);
            }
        }
    }
    
    isMoving(): boolean {
        return Vec2.mag(this.velocity) > 0;
    }
    
    resetDirection() {
        this.direction = new Vec2(0, 0);
    }
    
    addDirection(delta: Vec2) {
        this.direction = this.direction.plus(delta);
    }

    accelerate(v: number, max: number) {
        let mag = Vec2.mag(this.velocity);
        if(mag > 0 && mag > max) {
            this.velocity = Vec2.norm(this.velocity).scale(max);
        } else {
            this.velocity = this.velocity.plus(this.direction.scale(v));
        }
    }
    
    setVelocity(velocity: Vec2) {
        this.velocity = velocity;
    }
    
    decelerate(v: number, min: number) {
        let mag = Vec2.mag(this.velocity);
        if(mag > 0 && mag < min) {
            this.resetVelocity();
        } else {
            this.velocity = this.velocity.minus(this.velocity.scale(v));
        }
    }
    
    resetVelocity() {
        this.velocity = new Vec2(0, 0);
    }
    
    setBoundingBox(bbox: AABB) {
        this.bbox = bbox;
    }
	
    collides(ent: Entity): boolean {
        return this.bbox.collides(ent.bbox);
    }
}

class PunPun extends Entity implements Animated, Renderable {
    
    // Need to make these private (?) in an interface
    sprite: ImageWrapper;
    currentFrame: number;
    rendered: boolean;
    frames: SpriteFrame[];
    
    init() {
        this.currentFrame = 0;
        this.frames = [];
        this.rendered = true;
        this.sprite = new ImageWrapper(Sprites.PunPun);
    }

    render(ctx: CanvasRenderingContext2D) {
        if(ctx != null) {
            let frame = this.frames[this.currentFrame];
            this.setBoundingBox(new AABB(this.pos, frame.size.scale(frame.scale)));
            ctx.drawImage(this.sprite.getImage(), frame.crop.x, frame.crop.y, frame.size.x, frame.size.y, this.pos.x, this.pos.y, frame.size.x*frame.scale, frame.size.y*frame.scale);
            this.bbox.render(ctx);
            this.path.render(ctx);
        }
    }
}