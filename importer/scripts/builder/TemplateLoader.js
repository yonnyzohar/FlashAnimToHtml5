	 class TemplateLoader {



	     static init(_placementsObj) {
	         this.valsToSetArr = [];
	         this.placementsObj = _placementsObj;
	         this.templates = this.placementsObj.templates;//this.getAllAssets(this.placementsObj, this.templates);
			 this.animTracks = this.placementsObj.animTracks;
	     }
/*
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
		 
*/
		 static getFrames(_templateName)
		 {
			var frames = {};
			var baseNode = this.templates[_templateName];
			var num = 0;
			 if(baseNode && baseNode.children)
			 {
				
				for(var i = 0; i < baseNode.children.length; i++)
				{
					var childInstanceName = baseNode.children[i].instanceName;
					if(this.animTracks[childInstanceName])
					{
						num++;
						frames[childInstanceName] = this.animTracks[childInstanceName];
					}
				}
			 }

			 return frames;
		 }


	     static spawn(tempName) {
	         var baseNode = this.templates[tempName];
			 if(!baseNode)
			 {
				return;
			 }
	         var mc;
			 var frames = this.getFrames(tempName);
			 

	         if (Object.keys(frames).length > 0) {
	             mc = new TimelineSprite();
	             mc.setFrames(this.fixRotation(frames));
	         } else {
	             mc = new PIXI.Container();
	         }

	         mc.name = baseNode.instanceName;

	         this.createAsset(mc, baseNode, " ");

	         //this.valsToSetArr.reverse();
	         //for (var i = 0; i < this.valsToSetArr.length; i++) {
	         //    var val = this.valsToSetArr[i];
	        //     val.mc.width = val.w;
	         //    val.mc.height = val.h;
	         //}
	        // this.valsToSetArr.splice(0);

	         return mc;
	     }


	     static degreesToRadians(degrees) {
	         return degrees * Math.PI / 180;
	     }


	     static createAsset(mc, baseNode, _space) {
			console.log(_space + baseNode.name);
	         for (var i = 0; i < baseNode.children.length; i++) {
	             var child = baseNode.children[i];
				 console.log(child);

	             var _name = child.name;
	             var _x = parseFloat(child.x);
	             var _y = parseFloat(child.y);
	             var _w = parseFloat(child.width);
	             var _h = parseFloat(child.height);
				 var _scaleX = parseFloat(child.scaleX);
				 var _scaleY = parseFloat(child.scaleY);
				 var matrix = child.matrix;
	             var _a = 0;
	             var type = child.type;
	             var asset;
				 

                


	             if (type == "textField") {
	                 var tfType = child.tfType;
					 var boundsObj = {x:_x, y:_y,w:_w,h:_h};
	                 var tf = new GameTextField(boundsObj, child.text + "", child.font, child.size, child.color);

	                tf.name = _name;
	                var left = boundsObj.x;
					var right = left + boundsObj.w;
					var top = boundsObj.y;
					var btm = top + boundsObj.h;
					tf.anchor.set(0.5);
					tf.x = (_w/2) + left;
					tf.y = (_h/2)+top;
					//asset.transform.setFromMatrix(m);

	                 mc[_name] = tf;
	                 mc.addChild(tf);

					 const border = new PIXI.Graphics();
					border.lineStyle(2, 0xFF0000); // Border color in hexadecimal and line thickness
					border.drawRect(left , top, _w , _h ); // Adjust border size
					mc.addChild(border);

					 

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
					 //asset.scale.x = _scaleX;
					 //asset.scale.y = _scaleY;
	                 _a = child.alpha;

	                 asset.x = _x;
	                 asset.y = _y;
	                 asset.interactive = true;
	                 asset.interactiveChildren = true;
	                 //asset.rotation = this.degreesToRadians(child.rotation);
	                 asset.alpha = _a;
	                 mc[asset.name] = asset;
	                 mc.addChild(asset);

					 var m = new PIXI.Matrix();
					m.a = matrix.a;
					m.b = matrix.b;
					m.c = matrix.c;
					m.d = matrix.d;
					m.tx = matrix.tx;
					m.ty = matrix.ty;
					 asset.transform.setFromMatrix(m);
	                 this.valsToSetArr.push({
	                     mc: asset,
	                     w: _w,
	                     h: _h
	                 });


	             }
	             if (type == "asset") {
					
					var frames = this.getFrames(child.name);

					if (Object.keys(frames).length > 0) {
	                     asset = new TimelineSprite();
	                     asset.setFrames(this.fixRotation(frames));
	                 } else {
	                     asset = new PIXI.Container();
	                 }


	                 asset.name = child.instanceName;
					 //asset.scale.x = _scaleX;
					 //asset.scale.y = _scaleY;
	                 _a = child.alpha;

	                 asset.x = _x;
	                 asset.y = _y;

	                 //asset.rotation = this.degreesToRadians(child.rotation);

					 console.log(_space + asset.name + " rot " + asset.rotation + " degrees " + child.rotation);
	                 asset.alpha = _a;
	                 mc[asset.name] = asset;
					 var m = new PIXI.Matrix();
					m.a = matrix.a;
					m.b = matrix.b;
					m.c = matrix.c;
					m.d = matrix.d;
					m.tx = matrix.tx;
					m.ty = matrix.ty;
					 asset.transform.setFromMatrix(m);
	                 mc.addChild(asset);

	                 this.valsToSetArr.push({
	                     mc: asset,
	                     w: _w,
	                     h: _h
	                 });


	             }

				 var childTempObj = this.templates[child.name];

	             if (childTempObj && childTempObj.children) {
	                 if (asset) {
	                     this.createAsset(asset, childTempObj, _space + " ");
	                 } else {
	                     this.createAsset(mc, childTempObj, _space + " ");
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

	 TemplateLoader.placementsObj = null;
	 TemplateLoader.templates = {};
	 TemplateLoader.valsToSetArr = [];
