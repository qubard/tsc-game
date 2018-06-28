class Entity implements Renderable {
    protected pos: Vec2;
    protected velocity: Vec2 = new Vec2(0,0);
    protected bbox?: AABB; // 2d collision bounding box
        
    protected path: Path;
    protected max_velocity: number = 1;
    
    protected animation: Render.EntAnimation;

    private facingRight: boolean;
    
    sprite: ImageWrapper;
    rendered: boolean;
    
    constructor(pos: Vec2, public dir: Vec2, bbox?: AABB) {
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
        this.dir = new Vec2(0, 0);
    }
    
    addDirection(delta: Vec2) {
        this.dir = this.dir.plus(delta);
        
        // residual facing direction boolean
        if(this.dir.x > 0) {
            this.facingRight = true;
        } else if(this.dir.x < 0) {
            this.facingRight = false;
        }
    }

    accelerate(v: number) {
        let mag = Vec2.mag(this.velocity);
        if(mag > 0 && mag > this.max_velocity) {
            this.velocity = Vec2.norm(this.velocity).scale(this.max_velocity);
        } else {
            this.velocity = this.velocity.plus(this.dir.scale(v));
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
    
    render(ctx: CanvasRenderingContext2D) {
        if(ctx != null && this.rendered) {
            let frames = this.animation.getFrames(this.dir, this.facingRight);
            
            if(frames) {
                let frame = frames[((++this.animation.currentFrame/50) | 0) % frames.length];
                if(frame) {
                    this.sprite.draw(ctx, frame, this.pos);
                }
            }
           
            if(this.bbox) {
                this.bbox.render(ctx);
            }
            
            if(this.path) {
                this.path.render(ctx);
            }
        }
    }
}

class PunPun extends Entity {
    
    init() {
        this.animation = new Render.EntAnimation();
        this.setBoundingBox(new AABB(this.pos, new Vec2(18,17).scale(4)));
        
        this.animation.frames.idle_right.push({crop: new Vec2(0,0), size: new Vec2(13,17), scale: 4});
        this.animation.frames.idle_right.push({crop: new Vec2(65,17), size: new Vec2(13,17), scale: 4});
        
        this.animation.frames.idle_left.push({crop: new Vec2(0,17), size: new Vec2(13,17), scale: 4});
        this.animation.frames.idle_left.push({crop: new Vec2(78,17), size: new Vec2(14,17), scale: 4});
        
        this.animation.frames.move_left.push({crop: new Vec2(13,17), size: new Vec2(17,17), scale: 4});
        this.animation.frames.move_left.push({crop: new Vec2(31,17), size: new Vec2(16,17), scale: 4});
        this.animation.frames.move_left.push({crop: new Vec2(47,17), size: new Vec2(18,15), scale: 4});
        
        this.animation.frames.move_right.push({crop: new Vec2(13,0), size: new Vec2(17,17), scale: 4});
        this.animation.frames.move_right.push({crop: new Vec2(31,0), size: new Vec2(16,17), scale: 4});
        this.animation.frames.move_right.push({crop: new Vec2(47,0), size: new Vec2(18,15), scale: 4});
        
        this.rendered = true;
        this.sprite = new ImageWrapper(Sprites.PunPun);
    }

}