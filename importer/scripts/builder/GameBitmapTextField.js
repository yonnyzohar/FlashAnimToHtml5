class GameBitmapTextField extends PIXI.extras.BitmapText {
    constructor(_text, obj, _width, _height) {
        super(_text, obj);
        this.innerVal;
        this.z;
        this.bgTF;
        //this.width = _width;
        //this.height = _height;



    }

    setName(_name, placement = "") {
        this.name = _name;

        if (placement == "middle") {
            this.pivot.x = this.width * 0.5;
            this.pivot.y = this.height * 0.5;
        }
    }



    setText(str) {
        this.text = str;

        if (this.bgTF != null) {
            this.bgTF.text = str;
        }
    }

    killMe() {
        if (this.bgTF) {
            this.bgTF.dispose();
            this.bgTF.removeFromParent(true);
            this.bgTF = null;
        }

        this.removeFromParent();
    }

}
