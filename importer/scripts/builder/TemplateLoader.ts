import * as PIXI from 'pixi.js';
import GameBitmapTextField from './GameBitmapTextField'; // Make sure to provide the correct path to your files
import GameTextField from './GameTextField'; // Make sure to provide the correct path to your files
import GameButton from './GameButton'; // Make sure to provide the correct path to your files
import TimelineSprite from './TimelineSprite'; // Make sure to provide the correct path to your files
import TextureAtlas from "./TextureAtlas";

     
class TemplateLoader {

    static valsToSetArr: any[] = [];
    static scenes: { placementsObj: any; templates: any; animTracks:any}[] = [];

	static init(_placementFiles: any[]) {
	    this.valsToSetArr = [];

        for (let i = 0; i < _placementFiles.length; i++) {
            const _placementsObj = _placementFiles[i];
            this.scenes.push({
                placementsObj: _placementsObj,
                templates: _placementsObj.templates,
                animTracks : _placementsObj.animTracks
            });
        }
	}
		 
	static getFrames(_templateName)
	{
		var frames = {};
        var templates = this.scenes[0].templates; 
        var animTracks = this.scenes[0].animTracks; 
        var baseNode = templates[_templateName];
        var num = 0;
        if(baseNode && baseNode.children)
        {
            
            for(var i = 0; i < baseNode.children.length; i++)
            {
                var childInstanceName = baseNode.children[i].instanceName;
                if(animTracks[childInstanceName])
                {
                    num++;
                    frames[childInstanceName] = animTracks[childInstanceName];
                }
            }
        }
       
		return frames;
	}


	static spawn(tempName: string): any 
    { 
        var templates = this.scenes[0].templates; 
        var animTracks = this.scenes[0].animTracks; 
	    var baseNode = templates[tempName];
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
	     this.createAsset(mc, baseNode);
	     return mc;
	}

    static getAllAssets(o: any, allAssets: any): any {
        for (const k in o) {
            if (k === "type" && o[k] === "asset") {
                allAssets[o["name"]] = o;
            }

            if (o[k] instanceof Object) {
                this.getAllAssets(o[k], allAssets);
            }
        }
        return allAssets;
    }


	static degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }


	     static createAsset(mc: any, baseNode: any): void {
			console.log(baseNode.name);
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

                 if (type == "bmpTextField") {

                    const tfType = child.tfType;
    
                   var fntPath:string = "./../assets/"+child.font+".xml";
    
                    const bitmapTextStyle: PIXI.IBitmapTextStyle = {
                        tint: 0xff0000, // Red tint color
                        align: 'center',
                        maxWidth: 200,
                        letterSpacing: 2,
                        fontName:child.font,
                        fontSize:child.size
                    };
    
                    ///
                    const xmlUrl = fntPath;
                    const fontName = bitmapTextStyle.fontName;
                    const fontSize = bitmapTextStyle.fontSize;
    
                    if(PIXI.BitmapFont.available[fontName])
                    {
                        const tf = new GameBitmapTextField(child.text + "",
                        bitmapTextStyle);
    
                        tf.name = _name;
                        tf.x = _x;
                        tf.y = _y;
                        mc[_name] = tf;
                        mc.addChild(tf);
                    }
                    else
                    {
                        this.createBitmapTextFromXML(xmlUrl, child.text + "", fontName, fontSize, ()=>{
                             ///for loading bitmap fonts:
                             const tf = new GameBitmapTextField(child.text + "",
                             bitmapTextStyle);
         
                             tf.name = _name;
                             tf.x = _x;
                             tf.y = _y;
                             mc[_name] = tf;
                             mc.addChild(tf);
                        });
                    }
    
                    
                }
				 

                


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

					 console.log(asset.name + " rot " + asset.rotation + " degrees " + child.rotation);
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
                 var templates = this.scenes[0].templates; 
				 var childTempObj = templates[child.name];

	             if (childTempObj && childTempObj.children) {
	                 if (asset) {
	                     this.createAsset(asset, childTempObj);
	                 } else {
	                     this.createAsset(mc, childTempObj);
	                 }
	             }
	         }
	     }

	     static fixRotation(_frames: any): any {
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

         static async createBitmapTextFromXML(
            xmlUrl: string,
            textToDisplay: string,
            fontName: string,
            fontSize: number,
            callback:Function
          ) {
            // Load the texture atlas referenced in your XML
    
            const response = await fetch(xmlUrl);
            if (!response.ok) {
              throw new Error(`Failed to fetch XML font data: ${response.statusText}`);
            }
            const xmlData = await response.text();
            //grab the ta file name
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
            // Extract the page.file attribute from the XML
            const pageElement = xmlDoc.querySelector('page');
            if (!pageElement) {
                throw new Error('Page element not found in XML');
            }
            const fileAttribute = pageElement.getAttribute('file');
            if (!fileAttribute) {
                throw new Error('Page file attribute not found in XML');
            }
    
            var textureUrl:string = "./../assets/"+ fileAttribute;
    
            this.loadTexture(textureUrl)
            .then((texture) => {
    
                 PIXI.BitmapFont.install(xmlDoc, texture);
                console.log("yo");
    
                if(PIXI.BitmapFont.available[fontName])
                {
                    callback() ;
                }
            })
            .catch((error) => {
              console.error('Error loading texture:', error);
            });
    
            return null;
          }
    
          static loadTexture(textureUrl: string): Promise<PIXI.Texture> {
            return new Promise((resolve, reject) => {
              const texture = PIXI.Texture.from(textureUrl);
              // Listen for the "update" event to check when the texture is fully loaded
              texture.on("update", () => {
                if (texture.valid) {
                  resolve(texture); // Resolve the promise when the texture is ready
                } else {
                  reject(new Error("Failed to load texture."));
                }
              });
            });
          }
	 }

     export default TemplateLoader;