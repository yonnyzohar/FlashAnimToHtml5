class GameButton extends PIXI.Container {
    constructor(_labelStr = "") {
        super();
        this.textBox;
        this.labelStr;
        this.origScaleX = this.scale.x;
        this.origScaleY = this.scale.y;

        this.interactive = true;
        this.canTouch = true;
        this.interactiveChildren = true;
        this.mouseup = this.touchend = this.mouseupoutside = this.touchendoutside = this.onClicked.bind(this);
    }

    onClicked() {

        if (this.canTouch) {
            this.canTouch = false;

            TweenLite.to(this.scale, 0.15, {
                x: this.origScaleX * 0.9,
                y: this.origScaleY * 0.9,
                onComplete: this.tweenBack.bind(this)
            })
        }
    }

    tweenBack() {

        TweenLite.to(this.scale, 0.15, {
            x: this.origScaleX,
            y: this.origScaleY,
            onComplete: this.animDone.bind(this)
        })
    }

    animDone() {
        this.canTouch = true;
    }

}
