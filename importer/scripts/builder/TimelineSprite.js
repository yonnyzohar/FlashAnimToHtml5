class TimelineSprite extends PIXI.Container {

    constructor() {
        super();
        this.totalFrames;
        this._frames;
        this.currentFrame = 0;
        this.looping = true;
    }

    getFrames() {
        return this._frames;
    }

    setFrames(value) {
        this._frames = value;
        var totalFrames = 0;
        if (this._frames != null) {
            for (var k in this._frames) {
                if (this._frames[k] instanceof Array) {
                    if (this._frames[k].length > totalFrames) {
                        totalFrames = this._frames[k].length;
                    }

                }
            }
            this.totalFrames = totalFrames;
        }

    }

    removeStateEndEventListener() {
        this.func = null;
    }

    addStateEndEventListener(func) {
        this.func = func;
    }

    play() {
        //innerI = 0;
        GameTimer.addUpdateAble(this);
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            if (child instanceof TimelineSprite) {
                child.play();
            }
        }

    }

    stop() {
        GameTimer.removeUpdateAble(this);
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            if (child instanceof TimelineSprite) {
                child.stop();
            }
        }
    }

    gotoAndPlay(frameNum) {
        //trace"playing with " + frameNum);
        this.currentFrame = frameNum;
        GameTimer.removeUpdateAble(this);
        this.play();
    }

    update() {
        var childFrames;

        this.gotoAndStop(this.currentFrame);
        this.currentFrame++;


        if (this.currentFrame > this.totalFrames) {
            if (this.looping) {
                this.currentFrame = 0;
            } else {
                GameTimer.removeUpdateAble(this);
            }

            if (this.func) {
                this.func.call(this, this);
            }



        }
    }

    gotoAndStop(frameNum) {
        this.currentFrame = frameNum;
        if (this._frames != null) {
            for (var k in this._frames) {
                if (this._frames[k][this.currentFrame]) {
                    var frame = this._frames[k][this.currentFrame];

                    if (this[k]) {
                        if (frame.x != undefined) {
                            this[k].x = frame.x;
                        }
                        if (frame.y != undefined) {
                            this[k].y = frame.y;
                        }
                        if (frame.alpha != undefined) {
                            this[k].alpha = frame.alpha;
                        }

                        if (frame.scaleX != undefined) {
                            this[k].scale.x = frame.scaleX;
                        }
                        if (frame.scaleY != undefined) {
                            this[k].scale.y = frame.scaleY;
                        }
                        if (frame.rotation != undefined) {
                            this[k].rotation = frame.rotation;
                        }

                        var m = new PIXI.Matrix();
                        m.a = frame.matrix.a;
                        m.b = frame.matrix.b;
                        m.c = frame.matrix.c;
                        m.d = frame.matrix.d;
                        m.tx = frame.matrix.tx;
                        m.ty = frame.matrix.ty;

                        this[k].transform.setFromMatrix(m);
                    }
                }
            }
        }
    }
}
