//turn this into a scene, and create a scenesStack	 
class TemplateLoader {

    static init(_placementFiles) {
        this.scenes = [];
        this.valsToSetArr = [];

        for (var i = 0; i < _placementFiles.length; i++) {
            var _placementsObj = _placementFiles[i];
            var templates = this.getAllAssets(_placementsObj, {});
            this.scenes.push({
                placementsObj: _placementsObj,
                templates: templates
            });
        }
    }

    static get(tempName) {

        for (var i = 0; i < this.scenes.length; i++) {
            var scene = this.scenes[i];

            var baseNode = scene.templates[tempName];
            if (baseNode) {
                var mc;
                if (baseNode.frames) {
                    mc = new TimelineSprite();
                    mc.setFrames(this.fixRotation(baseNode.frames));
                } else {
                    mc = new PIXI.Container();
                }

                mc.name = baseNode.instanceName;

                this.createAsset(mc, baseNode);

                this.valsToSetArr.reverse();
                for (var i = 0; i < this.valsToSetArr.length; i++) {
                    var val = this.valsToSetArr[i];
                    val.mc.width = val.w;
                    val.mc.height = val.h;
                }
                this.valsToSetArr.splice(0);

                return mc;
            }

        }

        return null;
    }

    static getAllAssets(o, allAssets) {
        for (var k in o) {
            if (k == "type" && o[k] == "asset") {
                allAssets[o["name"]] = o;
            }

            if (o[k] instanceof Object) {
                this.getAllAssets(o[k], allAssets);
            }


        }
        return allAssets;
    }




    static degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }


    static createAsset(mc, baseNode) {
        for (var i = 0; i < baseNode.children.length; i++) {
            var child = baseNode.children[i];

            var _name = child.name;
            var _x = parseInt(child.x);
            var _y = parseInt(child.y);
            var _w = parseInt(child.width);
            var _h = parseInt(child.height);
            var _sx = child.scaleX;
            var _sy = child.scaleY;
            var matrix = child.matrix;
            var _a = 0;
            var type = child.type;
            var asset;


            /*'123,456,789M', {
    font: '50px AvenirNextRoundedProBold_16676463_96',
    align: 'right'
});*/
            if (type == "bmpTextField") {
                var tfType = child.tfType;
                var tf = new GameBitmapTextField(child.text + "", {
                    font: child.size + "px " + child.font,
                    align: 'center'
                }, _w, _h);

                //child.font, child.size, child.color

                tf.name = _name;
                tf.x = _x;
                tf.y = _y;
                mc[_name] = tf;
                mc.addChild(tf);
            }
            if (type == "textField") {
                var tfType = child.tfType;
                var tf = new GameTextField(_w, _h, child.text + "", child.font, child.size, child.color);

                tf.name = _name;
                tf.x = _x;
                tf.y = _y;
                mc[_name] = tf;
                mc.addChild(tf);
            }
            if (type == "img") {
                var texName = _name;

                texName = texName.substr(0, texName.indexOf("_"));
                var img = TextureAtlas.createFrame(texName);

                mc[texName] = img;
                mc.addChild(img);
                img.x = _x;
                img.y = _y;
                img.width = _w;
                img.height = _h;

            }
            if (type == "btn") {
                asset = new GameButton();
                asset.name = child.instanceName;

                _x = parseInt(child.x);
                _y = parseInt(child.y);
                _w = parseInt(child.width);
                _h = parseInt(child.height);
                _a = child.alpha;

                asset.x = _x;
                asset.y = _y;
                //asset.scale.x = _sx;
                //asset.scale.y = _sy;
                asset.interactive = true;
                asset.interactiveChildren = true;
                //asset.rotation = this.degreesToRadians(child.rotation); //this causes bugs!!
                asset.alpha = _a;


                var m = new PIXI.Matrix();
                m.a = matrix.a;
                m.b = matrix.b;
                m.c = matrix.c;
                m.d = matrix.d;
                m.tx = matrix.tx;
                m.ty = matrix.ty;

                asset.transform.setFromMatrix(m);

                mc[asset.name] = asset;
                mc.addChild(asset);
                this.valsToSetArr.push({
                    mc: asset,
                    w: _w,
                    h: _h
                });


            }
            if (type == "asset") {

                if (child.frames) {
                    asset = new TimelineSprite();
                    asset.setFrames(this.fixRotation(child.frames));
                } else {
                    asset = new PIXI.Container();
                }


                asset.name = child.instanceName;

                _x = parseInt(child.x);
                _y = parseInt(child.y);
                _w = parseInt(child.width);
                _h = parseInt(child.height);
                _sx = child.scaleX;
                _sy = child.scaleY;

                _a = child.alpha;

                asset.x = _x;
                asset.y = _y;


                //asset.rotation = this.degreesToRadians(child.rotation);
                asset.alpha = _a;

                var m = new PIXI.Matrix();
                m.a = matrix.a;
                m.b = matrix.b;
                m.c = matrix.c;
                m.d = matrix.d;
                m.tx = matrix.tx;
                m.ty = matrix.ty;

                asset.transform.setFromMatrix(m);

                //asset.scale.x = _sx;
                //asset.scale.y = _sy;


                mc[asset.name] = asset;
                mc.addChild(asset);

                this.valsToSetArr.push({
                    mc: asset,
                    w: _w,
                    h: _h
                });


            }

            if (child.children) {
                if (asset) {
                    this.createAsset(asset, child);
                } else {
                    this.createAsset(mc, child);
                }
            }
        }
    }

    static fixRotation(_frames) {
        for (var k in _frames) {
            for (var i = 0; i < _frames[k].length; i++) {
                if (_frames[k][i]) {
                    if (_frames[k][i].rotation != undefined) {
                        var rotation = _frames[k][i].rotation;
                        _frames[k][i].rotation = this.degreesToRadians(rotation);
                    }

                }
            }
        }

        return _frames;
    }
}

TemplateLoader.valsToSetArr = [];
