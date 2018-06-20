enum Keys {
    RIGHT = 39,
    LEFT = 37,
    UP = 38,
    DOWN = 40
}

class Keyboard {
    private keys: boolean[]; // Key press table
    
    constructor(private presses: number = 0) {
        this.keys = new Array<boolean>(255);
    }
    
    isKeyDown(keycode: number) {
        return this.keys[keycode];
    };
    
    getPresses(): number {
        return this.presses;
    }
        
    handleKeydown(keycode: number) {
        this.keys[keycode] = true;
        this.presses++;
    }
    
    handleKeyup(keycode: number) {
        this.keys[keycode] = false;
        this.presses = Math.max(this.presses-1, 0);
    }
}