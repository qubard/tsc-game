import { Vec2 } from "./Vec2"

export interface Renderable {
    rendered: boolean;
    render(ctx: CanvasRenderingContext2D): void;
}

export interface SpriteFrame {
    crop: Vec2;
    size: Vec2;
    scale: number;
    offset: Vec2;
}

export namespace SpriteHelper {
    export function frameAt(index: number, size: Vec2, scale: number) {
        return SpriteHelper.frameAtOffset(index, size, scale, new Vec2(0, 0));
    }

    export function frameAtOffset(index: number, size: Vec2, scale: number, offset: Vec2): SpriteFrame {
        return { crop: new Vec2(size.x * index, 0), size: size, scale: scale, offset: offset };
    }
}