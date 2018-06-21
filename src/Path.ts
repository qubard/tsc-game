class Path implements Renderable {
    sprite?: ImageWrapper;
    rendered: boolean;
    private nodes: Vec2[];
    private lastPush: number;
    
    constructor(private delay: number) {
        this.nodes = [];
        this.lastPush = Date.now();
        this.rendered = true;
    }
    
    getDelay(): number {
        return this.delay;
    }
    
    getLength(): number {
        return this.nodes.length;
    }
    
    addNode(node: Vec2) {
        if(this.nodes.length <= 1 || (this.nodes.length > 1 && !this.nodes[this.nodes.length-1].equals(node))) {
            if(Date.now() - this.lastPush > this.delay) {
                this.nodes.push(node);
                this.lastPush = Date.now();
            }
        }
    }
    
    clearNodes() {
        this.nodes = [];
    }
    
    render(ctx: CanvasRenderingContext2D, frame?: SpriteFrame) {
        if(ctx != null && this.rendered) {
            ctx.strokeStyle = "#FF0000";
            for(var i = 0; i < this.nodes.length-1; i++) {
                let node = this.nodes[i];
                let next = this.nodes[i+1];
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(next.x, next.y);
                ctx.stroke();
            }
        }
    }
}