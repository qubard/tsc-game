class ImageWrapper {
    private img: HTMLImageElement;
    
    constructor(public filename: string) { 
        this.load_image();
    }
    
    private load_image() {
        this.img = document.createElement('img');
        this.img.src = this.filename;
    }
    
    getImage(): HTMLImageElement {
        return this.img;
    }
}