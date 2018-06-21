class AABB implements Renderable {
    private pos: Vec2;
    private size: Vec2;
    rendered: boolean;
    
    constructor(pos: Vec2, size: Vec2) {
        this.pos = pos;
        this.size = size;
        this.rendered = true;
    }
    
    // Does a point lie inside the box?
    collides(other: AABB): boolean {
        return this.pos.x >= other.pos.x && this.pos.x <= other.pos.x + other.size.x
        && this.pos.y >= other.pos.y && this.pos.y <= other.pos.y + other.size.y;
    }
    
    render(ctx: CanvasRenderingContext2D): void {
        if(ctx != null && this.rendered) {
            ctx.beginPath(); // clear old rect path
            ctx.strokeStyle = "#FF0000";
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x+this.size.x, this.pos.y);
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x, this.pos.y+this.size.y);
            ctx.moveTo(this.pos.x, this.pos.y+this.size.y);
            ctx.lineTo(this.pos.x+this.size.x, this.pos.y+this.size.y);
            ctx.moveTo(this.pos.x+this.size.x, this.pos.y);
            ctx.lineTo(this.pos.x+this.size.x, this.pos.y+this.size.y);
            ctx.stroke();
        }
    }
}