var game: Game;

window.onload = () => {
    var canvas = <HTMLCanvasElement> document.getElementById(CanvasParams.CanvasID);
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false; // enable nearest neighbor scaling
    
    game = new Game(ctx, CanvasParams.FPS);
    game.setSize(canvas.getBoundingClientRect());
    init();
}

function registerKeys() {
    game.getKeyboard().validateKeys([Keys.LEFT, Keys.RIGHT, Keys.UP, Keys.DOWN]);
    window.addEventListener('keydown', keydown, false);
    window.addEventListener('keyup', keyup, false);
}

function keydown(e: KeyboardEvent) {
    game.getKeyboard().handleKeydown(<number>e.keyCode);
}

function keyup(e: KeyboardEvent) {
    game.getKeyboard().handleKeyup(<number>e.keyCode);
}

function init() {
    registerKeys();
    render();
}

function render() {
    game.loop();
    
    window.requestAnimationFrame(render);
}