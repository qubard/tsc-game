enum Sprites {
    PunPun = 'stahlsby.png'
}

interface SpriteFrame {
    crop: Vec2;
    size: Vec2;
    scale: number;
}

interface Animated {
    frames: SpriteFrame[];
    currentFrame: number;
    renderAnimated(ctx: CanvasRenderingContext2D): void;
}

interface Renderable {
    rendered: boolean;
    sprite?: ImageWrapper;
    render(ctx: CanvasRenderingContext2D, frame?: SpriteFrame): void;
}