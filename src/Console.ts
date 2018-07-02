class GConsole implements Renderable {
    rendered: boolean = true;

    private buffer: CircularBuffer<string>;
    private font: Font;

    constructor(private pos: Vec2, private capacity: number, private duplicateChecking: boolean = false, private alpha: number = 1) {
        this.buffer = new CircularBuffer<string>(capacity);
        this.font = new Font(Fonts.Victoria, "", 1, pos);
        this.alpha = Math.min(Math.max(0, this.alpha), 1); // clamp alpha
    }

    log(data: string) {
        if (data && data.length > 0) {
            if (!this.duplicateChecking || (this.duplicateChecking && this.buffer.get(this.buffer.getLength() - 1) != data)) {
                this.buffer.push(data);
            }
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (ctx != null && this.rendered) {
            if (this.alpha != 1) {
                ctx.save();
                ctx.globalAlpha = this.alpha;
            }
            
            let s = "";
            for(var i = 0; i < this.buffer.getLength(); i++) {
                s += this.buffer.get(i) + '\n';
            }
            this.font.text = s;
            
            this.font.render(ctx);

            if (this.alpha != 1) {
                ctx.restore();
            }
        }
    }
}