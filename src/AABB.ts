class AABB implements Renderable {
    private pos: Vec2;
    private size: Vec2;
    
    constructor(pos: Vec2, size: Vec2) {
        this.pos = pos;
        this.size = size;
    }
    
    // Does a point lie inside the box?
    collides(other: AABB): boolean {
        return this.pos.x >= other.pos.x && this.pos.x <= other.pos.x + other.size.x
        && this.pos.y >= other.pos.y && this.pos.y <= other.pos.y + other.size.y;
    }
    
    render(ctx: CanvasRenderingContext2D): void {
        ctx.rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
    }
}