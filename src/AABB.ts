import { Vec2 } from "./Vec2";
import { Renderable } from "./Sprite";

export class AABB implements Renderable {
    rendered: boolean = false;

    constructor(private pos: Vec2, private size: Vec2) { }

    update(pos: Vec2): void {
        this.pos = pos;
    }

    getSize(): Vec2 {
        return this.size;
    }

    // Does a point lie inside the box?
    collides(other: AABB): boolean {
        return this.pos.x >= other.pos.x && this.pos.x <= other.pos.x + other.size.x
            && this.pos.y >= other.pos.y && this.pos.y <= other.pos.y + other.size.y;
    }

    render(ctx: CanvasRenderingContext2D): void {
        if (this.rendered) {
            ctx.beginPath(); // clear old rect path
            ctx.strokeStyle = "#FF0000";
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x + this.size.x, this.pos.y);
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x, this.pos.y + this.size.y);
            ctx.moveTo(this.pos.x, this.pos.y + this.size.y);
            ctx.lineTo(this.pos.x + this.size.x, this.pos.y + this.size.y);
            ctx.moveTo(this.pos.x + this.size.x, this.pos.y);
            ctx.lineTo(this.pos.x + this.size.x, this.pos.y + this.size.y);
            ctx.stroke();
        }
    }
}