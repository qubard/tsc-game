import { Vec2 } from "./Vec2";
import { AABB } from "./AABB";
import { Path } from "./Path";

export class Entity {
    protected velocity: Vec2 = new Vec2(0, 0);

    protected path: Path;
    protected max_velocity: number = 1;

    protected facingRight: boolean;

    private attachedEntity: Entity;

    constructor(protected pos: Vec2, public dir: Vec2, protected bbox?: AABB) {
        this.pos = pos;
        this.bbox = bbox;
    }

    attachTo(entity: Entity) {
        this.attachedEntity = entity;
    }

    getScale(): Vec2 {
        if(this.bbox) {
            return this.bbox.getSize();
        }
        return new Vec2(0, 0);
    }

    getPath(): Path {
        return this.path;
    }

    setPos(pos: Vec2) {
        this.pos = pos;
    }

    getFacingDirection(): Vec2 {
        return new Vec2(this.facingRight ? 1 : -1, 0);
    }

    getPos(): Vec2 {
        return this.pos;
    }

    initPath(delay: number) {
        this.path = new Path(delay);
    }

    update() {
        if (this.isMoving()) {
            this.pos = this.pos.plus(this.velocity);

            if (this.bbox) {
                this.bbox.update(this.pos);
            }

            if (this.path) {
                this.path.addNode(this.pos);
            }
        }

        if(this.attachedEntity) {
            this.facingRight = this.attachedEntity.facingRight;
            this.dir = this.attachedEntity.dir;
            this.pos = this.attachedEntity.getPos().plus(this.attachedEntity.getFacingDirection().scaleVec(this.attachedEntity.getScale()));
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
        if (this.dir.x > 0) {
            this.facingRight = true;
        } else if (this.dir.x < 0) {
            this.facingRight = false;
        }
    }

    accelerate(v: number) {
        let mag = Vec2.mag(this.velocity);
        if (mag > 0 && mag > this.max_velocity) {
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
        if (mag > 0 && mag < min) {
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