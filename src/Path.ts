class Path implements Renderable {
    
    sprite?: ImageWrapper;
    rendered: boolean;
    private nodes: Vec2[];
    
    constructor(private delay: number) {
        this.nodes = [];
        this.rendered = true;
    }
    
    getDelay(): number {
        return this.delay;
    }
    
    addNode(node: Vec2) {
        if(this.nodes.length <= 1 || (this.nodes.length > 1 && !this.nodes[this.nodes.length-1].equals(node))) {
            this.nodes.push(node);
        }
    }
    
    clearNodes() {
        this.nodes = [];
    }
    
    render(ctx: CanvasRenderingContext2D, frame?: SpriteFrame) {
        if(ctx != null && this.rendered) {
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