interface Renderable {
    rendered: boolean;
    render(ctx: CanvasRenderingContext2D): void;
}

interface SpriteFrame {
    crop: Vec2;
    size: Vec2;
    scale: number;
}