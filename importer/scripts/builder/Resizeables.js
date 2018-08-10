class Resizeables {

    static addResizeable(mc) {
        Resizeables.resizeables.set(mc, true)
    }

    static resize() {
        for (var [key, value] of Resizeables.resizeables) {
            key.resize();
        }
    }

    static removeResizeable(mc) {
        Resizeables.resizeables.delete(mc);

    }
}

Resizeables.resizeables = new Map();
