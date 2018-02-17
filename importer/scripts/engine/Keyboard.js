class Keyboard extends EventDispatcher
{
    constructor(){
        document.onkeydown = this.checkKeyDown.bind(this);
        document.onkeyup = this.checkKeyUp.bind(this);
    }

     checkKeyDown(e) {
        e = e || window.event;
         var self = this;

        if (e.keyCode == Keyboard.UP) {
            // up arrow
            self.dispatchEvent("UP_PRESSED");
        }

        if (e.keyCode == Keyboard.DOWN) {
            self.dispatchEvent("DOWN_PRESSED");
        } else if (e.keyCode == Keyboard.LEFT) {
            self.dispatchEvent("LEFT_PRESSED");
        } else if (e.keyCode == Keyboard.RIGHT) {
            self.dispatchEvent("RIGHT_PRESSED");
        } else if (e.keyCode == Keyboard.SPACE) {
            // up arrow
            self.dispatchEvent("SPACE_PRESSED");
        } else if (e.keyCode == Keyboard.Q) {
            self.dispatchEvent("Q_PRESSED");
        } else if (e.keyCode == Keyboard.CTRL) {
            self.dispatchEvent("CTRL_PRESSED");
        }
    }

    checkKeyUp(e) {
        e = e || window.event;
        this self= this;

        if (e.keyCode == Keyboard.UP) {
            // up arrow
            self.dispatchEvent("UP_RELEASED");
        }

        if (e.keyCode == Keyboard.DOWN) {
            self.dispatchEvent("DOWN_RELEASED");
        } else if (e.keyCode == Keyboard.LEFT) {
            self.dispatchEvent("LEFT_RELEASED");
        } else if (e.keyCode == Keyboard.RIGHT) {
            self.dispatchEvent("RIGHT_RELEASED");
        } else if (e.keyCode == Keyboard.CTRL) {
            self.dispatchEvent("CTRL_RELEASED");
        } else if (e.keyCode == Keyboard.SPACE) {
            self.dispatchEvent("SPACE_RELEASED");
        }

    }
}

Keyboard.RIGHT = '39'
Keyboard.LEFT = '37'
Keyboard.UP = '38'
Keyboard.DOWN = '40'
Keyboard.SPACE = '13' //32
Keyboard.Q = '81'
Keyboard.CTRL = '17'

