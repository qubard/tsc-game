export enum Keys {
    RIGHT = 39,
    LEFT = 37,
    UP = 38,
    DOWN = 40
}

export class Keyboard {
    private keys: boolean[]; // Key press table
    private valid_keys: boolean[]; // Keep track of valid keys

    static MAX_KEY_VALUE: number = 255;

    constructor(private presses: number = 0) {
        this.keys = new Array<boolean>(Keyboard.MAX_KEY_VALUE);
        this.valid_keys = new Array<boolean>(Keyboard.MAX_KEY_VALUE);
    }

    validateKey(keycode: number) {
        this.valid_keys[keycode] = true;
    }

    validateKeys(keys: number[]) {
        for (let key of keys) {
            this.valid_keys[key] = true;
        }
    }

    isKeyDown(keycode: number) {
        return this.keys[keycode];
    };

    getPresses(): number {
        return this.presses;
    }

    handleKeydown(keycode: number) {
        if (!this.keys[keycode] && this.valid_keys[keycode]) {
            this.presses++;
            this.keys[keycode] = true;
        }
    }

    handleKeyup(keycode: number) {
        if (this.keys[keycode] && this.valid_keys[keycode]) {
            this.presses--;
            this.keys[keycode] = false;
        }
    }
}