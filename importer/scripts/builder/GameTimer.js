	class GameTimer {
	    static init(fps) {
	        this.fpsInterval = 1000 / fps;
	        this.then = Date.now();
	        this.startTime = this.then;
	    }
	    static addUpdateAble(mc) {
	        GameTimer.updatables.set(mc, true)
	    }

	    static update() {

	        this.now = Date.now();
	        this.elapsed = this.now - this.then;

	        if (this.elapsed > this.fpsInterval) {

	            // Get ready for next frame by setting then=now, but also adjust for your
	            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
	            this.then = this.now - (this.elapsed % this.fpsInterval);

	            // Put your drawing code here
	            for (var [key, value] of GameTimer.updatables) {
	                key.update();
	            }
	        }


	    }


	    static removeUpdateAble(mc) {
	        GameTimer.updatables.delete(mc);

	    }
	}

	GameTimer.updatables = new Map();
	GameTimer.fpsInterval = 0;
