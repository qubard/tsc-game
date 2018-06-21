enum Sprites {
    PunPun = 'stahlsby.png'
}

enum Fonts {
    TorusSans = 'TorusSans.png'
}

interface SpriteFrame {
    crop: Vec2;
    size: Vec2;
    scale: number;
}

interface Animated {
    frames: SpriteFrame[];
    currentFrame: number;
}

interface Renderable {
    rendered: boolean;
    render(ctx: CanvasRenderingContext2D): void;
}