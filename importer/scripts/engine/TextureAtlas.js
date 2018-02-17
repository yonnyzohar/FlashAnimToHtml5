var TextureAtlas = {
    dict: {},
    atlas: [],


    init: function (_loadCompleteFnctn, _progressFnctn, _assetsPath) {
        PIXI.loader.add(_assetsPath).load(function () {
            trace("ATLAS LOADED " + _assetsPath);
            TextureAtlas.atlas.push(PIXI.loader.resources[_assetsPath].textures);
            _loadCompleteFnctn();
        }).on('progress', function (e) {
            _progressFnctn(e.progress)
        });

    },



    createFrame: function (itemName) {
        trace(itemName);

        var found = false;
        var img = null;

        for (var i = 0; i < TextureAtlas.atlas.length; i++) {
            var a = TextureAtlas.atlas[i];
            var _itemName = itemName;
            if (!a[_itemName]) {
                _itemName = _itemName + "0000";
            }

            if (a[_itemName]) {
                img = new PIXI.Sprite(a[_itemName]);
                break;
            }

        }

        if (img == null) {
            trace("COULD NOT FIND " + itemName);
        }

        return img;
    },

    getNumOfFrames: function (_framePrefix) {
        var num = 0;
        for (var i = 0; i < TextureAtlas.atlas.length; i++) {
            var a = TextureAtlas.atlas[i];
            for (var k in a) {
                if (k.indexOf(_framePrefix) != -1) {
                    num++;
                }
            }
        }
        return num;
    },

    createMovieClip: function (_framePrefix) {
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
