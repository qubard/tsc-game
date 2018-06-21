class Vec2 {
    constructor(public x: number, public y: number) { }
    
    scale(k: number) {
        return Vec2.times(k, this);
    }
    
    plus(v: Vec2) {
        return Vec2.plus(this, v);
    }
    
    minus(v: Vec2) {
        return Vec2.minus(this, v);
    }
    
    static times(k: number, v: Vec2) {
        return new Vec2(k * v.x, k * v.y);
    }

    static minus(v1: Vec2, v2: Vec2) {
        return new Vec2(v1.x - v2.x, v1.y - v2.y);
    }

    static plus(v1: Vec2, v2: Vec2) {
        return new Vec2(v1.x + v2.x, v1.y + v2.y);
    }

    static dot(v1: Vec2, v2: Vec2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static mag(v: Vec2) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    static norm(v: Vec2) {
        let mag = Vec2.mag(v);
        let div = (mag === 0) ? Infinity : 1.0 / mag;
        return Vec2.times(div, v);
    }
}