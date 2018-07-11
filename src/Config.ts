import { Vec2 } from "./Vec2";

export namespace Config {
    export const enum GameParams {
        FPS = 128,
        Scale = 4
    }

    export const enum Sprites {
        PunPun = 'res/stahlsby.png',
        Pistol = 'res/pistol.png'
    }

    export interface FontParams {
        cropSize: Vec2;
        filename: string;
    }

    export namespace Fonts {
        export const TorusSans = { cropSize: new Vec2(9, 9), filename: 'res/fonts/TorusSans.png' };
        export const Victoria = { cropSize: new Vec2(9, 9), filename: 'res/fonts/Victoria.png' };
    }
}