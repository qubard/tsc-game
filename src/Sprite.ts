import { Vec2 } from './Vec2';

export interface Renderable {
    rendered: boolean;
    render(ctx: CanvasRenderingContext2D): void;
}

export interface SpriteFrame {
    crop: Vec2;
    size: Vec2;
    scale: number;
}

export namespace SpriteHelper {
    export function frameAt(index: number, size: Vec2, scale: number): SpriteFrame {
        return { crop: new Vec2(size.x * index, 0), size: size, scale: scale };
    }
}