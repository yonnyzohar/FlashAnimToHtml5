class TextureAtlas {

    static init(_loadCompleteFnctn, _progressFnctn, _assetsPath) {
        PIXI.loader.add(_assetsPath).load(function () {
            trace("ATLAS LOADED " + _assetsPath);
            TextureAtlas.atlas = PIXI.loader.resources[_assetsPath].textures;
            _loadCompleteFnctn();
        }).on('progress', function (e) {
            _progressFnctn(e.progress)
        });

    }

    static createFrame(itemName) {
        //trace(itemName);
        if (!TextureAtlas.atlas[itemName]) {
            itemName = itemName + "0000";
        }
        var image = new PIXI.Sprite(TextureAtlas.atlas[itemName]);
        if (image == null) {
            trace("could not create " + itemName);

        }
        return image;
    }

    static getNumOfFrames(_framePrefix) {
        var num = 0;
        for (var k in TextureAtlas.atlas) {
            if (k.indexOf(_framePrefix) != -1) {
                num++;
            }
        }
        return num;
    }

    static createMovieClip(_framePrefix) {
        var frames = [];
        var numFrames = TextureAtlas.getNumOfFrames(_framePrefix);
        trace(numFrames + " in " + _framePrefix);
        for (var i = 0; i < numFrames; i++) {
            var val = i < 10 ? '0' + i : i;
            var textureName = _framePrefix + '00' + val;
            frames.push(PIXI.Texture.fromFrame(textureName));
        }


        mc = new PIXI.extras.AnimatedSprite(frames);
        mc.animationSpeed = 1;
        mc.loop = false;
        mc.name = _framePrefix;
        return mc;
    }
}

TextureAtlas.dict = {};
TextureAtlas.atlas = null;
