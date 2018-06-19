enum Sprites {
    PunPun = 'stahlsby.png'
}

interface SpriteFrame {
    crop: Vec2;
    size: Vec2;
    scale: number;
}

interface Renderable {
    sprite?: ImageWrapper;
    render(ctx: CanvasRenderingContext2D, frame?: SpriteFrame): void;
}