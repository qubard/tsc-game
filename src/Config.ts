import { Vec2 } from "./Vec2";

export namespace Config {
    export const enum GameParams {
        FPS = 128
    }

    export const enum Sprites {
        PunPun = 'res/stahlsby.png',
        Pistol = 'res/pistol.png'
    }

    export interface FontParams {
        size: Vec2;
        filename: string;
    }

    export namespace Fonts {
        export const TorusSans = { size: new Vec2(100, 100), filename: 'res/fonts/TorusSans.png' };
        export const Victoria = { size: new Vec2(100, 100), filename: 'res/fonts/Victoria.png' };
    }
}