// See https://en.wikipedia.org/wiki/Circular_buffer#Circular_buffer_mechanics
export class CircularBuffer<T> {

    private arr: T[];
    private front: number = 0;
    private size: number = 0;

    constructor(private capacity: number) {
        this.arr = new Array<T>(capacity);
    }

    push(ele: T) {
        if (this.size <= this.capacity) {
            this.size++;
        }
        this.arr[this.front] = ele;
        this.front = (this.front + 1) % this.capacity;
    }

    getCapacity() {
        return this.capacity;
    }

    getLength() {
        return this.size < this.capacity ? this.size : this.capacity;
    }

    get(index: number) {
        if (index < 0 || index >= this.size) return null;
        if (this.size <= this.capacity) {
            return this.arr[index];
        }
        return this.arr[(this.front + index) % this.capacity];
    }

    array(): T[] {
        return this.arr;
    }
}