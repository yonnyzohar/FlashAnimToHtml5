class Pool {
    constructor(maxPoolSize, growthValue, CLS) {
        this.CLS = CLS;
        this.MAX_VALUE = maxPoolSize;
        this.GROWTH_VALUE = growthValue;
        this.counter = maxPoolSize;
        this.pool = [];
        this.currentSprite;
        var i = maxPoolSize;

        while (--i > -1) {
            this.pool[i] = new CLS();
        }

    }

    getSprite() {
        if (this.counter > 0) {
            console.log(this.counter);
            return this.currentSprite = this.pool[--this.counter];
        }


        var i = this.GROWTH_VALUE;
        while (--i > -1) {
            var CLS = this.CLS
            this.pool.unshift(new CLS());
        }

        this.counter = this.GROWTH_VALUE;
        return this.getSprite();

    }

    disposeSprite(disposedSprite) {
        this.pool[this.counter++] = disposedSprite;
    }
}
