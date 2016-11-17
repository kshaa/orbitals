var Timer = function() {
    this.speed = 1;
    this.time = performance.now() / 1000;
    this.t0 = this.time;
    this.t1 = this.time;
    this.update = function() {
        this.t0 = this.t1;
        this.t1 = performance.now() / 1000;
        this.time = (this.t1 - this.t0) * this.speed;
    }

}
