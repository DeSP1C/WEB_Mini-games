export default class GameLoop {
    constructor(callback) {
        this.callback = callback;
        this.running = false;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.loop();
        }
    }

    stop() {
        this.running = false;
    }

    loop() {
        if (!this.running) return;
        this.callback();
        requestAnimationFrame(() => this.loop());
    }
}