class Entity {
    protected pos: Vec2;
    protected velocity: Vec2 = new Vec2(0,0);
    protected bbox?: AABB; // 2d collision bounding box
        
    protected path: Path;
    protected max_velocity: number = 1;
    
    constructor(pos: Vec2, public direction: Vec2, bbox?: AABB) {
        this.pos = pos;
        this.bbox = bbox;

        this.init();
    }
    
    protected init() { }
    
    getPath(): Path {
        return this.path;
    }
    
    initPath(delay: number) {
        this.path = new Path(delay);
    }
    
    update() {
        if(this.isMoving()) {
            this.pos = this.pos.plus(this.velocity);
            if(this.bbox) {
                this.bbox.update(this.pos);
            }
            if(this.path) {
                this.path.addNode(this.pos);
            }
        }
    }
    
    setMaxVelocity(max_velocity: number) {
        this.max_velocity = max_velocity;
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

    accelerate(v: number) {
        let mag = Vec2.mag(this.velocity);
        if(mag > 0 && mag > this.max_velocity) {
            this.velocity = Vec2.norm(this.velocity).scale(this.max_velocity);
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
    
    sprite: ImageWrapper;
    currentFrame: number;
    rendered: boolean;
    frames: SpriteFrame[];
    
    init() {
        this.currentFrame = 0;
        this.frames = [];
        this.setBoundingBox(new AABB(this.pos, new Vec2(18,17).scale(4)));
        this.frames.push({crop: new Vec2(0,0), size: new Vec2(13,17), scale: 4}); // idle_r
        this.frames.push({crop: new Vec2(14,0), size: new Vec2(17,17), scale: 4}); // move_r_1
        this.frames.push({crop: new Vec2(31,0), size: new Vec2(16,17), scale: 4}); // move_r_2
        this.frames.push({crop: new Vec2(47,0), size: new Vec2(18,15), scale: 4}); // move_r_3
        this.rendered = true;
        this.sprite = new ImageWrapper(Sprites.PunPun);
    }

    render(ctx: CanvasRenderingContext2D) {
        if(ctx != null) {
            let frame = this.frames[((++this.currentFrame/50) | 0) % (this.frames.length-1) + 1];
            this.sprite.draw(ctx, frame, this.pos);
            this.bbox.render(ctx);
            if(this.path) {
                this.path.render(ctx);
            }
        }
    }
}