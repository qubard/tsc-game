enum Keys {
    RIGHT = 39,
    LEFT = 37
}

class Keyboard {
    private keys: boolean[]; // Key press table
    
    constructor() {
        this.keys = new Array<boolean>(255);
    }
    
    isKeyDown(keycode: number) {
        return this.keys[keycode];
    };
        
    handleKeydown(keycode: number) {
        this.keys[keycode] = true;
    }
    
    handleKeyup(keycode: number) {
        this.keys[keycode] = false;
    }
}