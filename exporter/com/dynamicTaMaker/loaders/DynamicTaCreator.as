package com.dynamicTaMaker.loaders
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.Loader;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	import flash.utils.ByteArray;
	import flash.utils.getQualifiedClassName;
	import flash.utils.setTimeout;
	
	import com.dynamicTaMaker.utils.PNGEncoder;
	import com.rectanglePacker.utils.*

	/**
	 * ...
	 * @author Yonny Zohar
	 */
	public class DynamicTaCreator extends EventDispatcher
	{
		private var rejectsArr:Array = [];
		
		private var brk:String = '\n';
		private var lastY:int = 0;
		private var lastX:int = 0;
		private var widestInRow:int = 0;
		private var count:int = 0;
		private var dimentionsW:int = 1024;
		private var dimentionsH:int = 1024;
		
		private var view:MovieClip;
		private var imagesData:Array = [];
		private var chosenArr:Array;
		private var taMC:MovieClip = new MovieClip();
		
		public var taPlacements:String;
		public var TAbitmapData:BitmapData;
		//public var placementsXML:String = "";
		public var viewHeirarchyObj:Object;
		private var mPacker:RectanglePacker;
		

		private var outputType:String = "JSON";//Starling / JSON
		
		
		private static var exportFile:Boolean = true;
		
		public function DynamicTaCreator() 
		{
			trace("YO YO YO")
		}

		
		public function init(_view:MovieClip):void
		{
			view = _view;
			// we are stopping all the mc's recursively in the loaded movie clip, because otherwise, some of the code could have run already (like cuePoint) and this would mess the anim tracks.
			stopAllMCs(view);
			
			//printLine("<?xml version='1.0' encoding='UTF-16'?>")
			//printLine("<assets>");
			viewHeirarchyObj = {};
			parse(view, viewHeirarchyObj);
			//traceJSON.stringify(viewHeirarchyObj));
			//printLine("</assets>");
			
			chosenArr = imagesData;
			
			chosenArr.sortOn("area",Array.NUMERIC);
			chosenArr.reverse();
			createTA();
			view = null;
		}
		
		
		
		private function createTA():void 
		{
			if (outputType == "Starling")
			{
				taPlacements = '<?xml version="1.0" encoding="utf-8"?>' + brk;
				taPlacements += '<TextureAtlas imagePath="ta.png">'+ brk;
			}
			else
			{
				taPlacements = '{"frames":{';
			}


			displayImages();


			if (outputType == "Starling")
			{
				taPlacements += '</TextureAtlas>';
			}
			else
			{
				taPlacements += '},"meta":{"image": "ta.png","format": "RGBA8888","size": {"w":'+taMC.width+',"h":'+taMC.height+'},"scale": "1"}}';
			}
			
            TAbitmapData = new BitmapData(taMC.width, taMC.height, true, 0x0);
            TAbitmapData.draw(taMC, new Matrix(1, 0, 0, 1, -taMC.x, -taMC.y));
			
			if(exportFile)
			{
				saveOutTA(TAbitmapData, "ta.png");

				if (outputType == "Starling")
				{
					saveXML(taPlacements, "ta.xml");
				}
				else
				{
					saveXML(taPlacements, "ta.json");
				}

				saveXML(JSON.stringify(viewHeirarchyObj), "placements.json");
			}
			
			//
			dispatchEvent(new Event("TA_CREATED"))
		}
		
			
		///addding rectangle packer!!!
		private function displayImages():void 
		{
			var chosenArrLen:int = chosenArr.length;
			
			if (mPacker == null)
            {
                mPacker = new RectanglePacker(dimentionsW, dimentionsH, 1);
            }
            else
            {
                mPacker.reset(dimentionsW, dimentionsH, 1);
            }
			
			var bmp:Bitmap;
			
			for (var i:int = 0; i < chosenArrLen; i++)
            {
				bmp = new Bitmap(chosenArr[i].img);
				
                mPacker.insertRectangle(bmp.width, bmp.height, i);
            }

            mPacker.packRectangles();
			
			var rect:Rectangle = new Rectangle();
			for (var j:int = 0; j < mPacker.rectangleCount; j++)
            {
				rect = mPacker.getRectangle(j, rect);
				
				bmp = new Bitmap(chosenArr[j].img);
				var m_name:String = chosenArr[j].parentLikage;
				taMC.addChild(bmp);
				bmp.y = rect.y;
				bmp.x = rect.x;
				
                var index:int = mPacker.getRectangleId(j);
				
				if (outputType == "Starling")
				{
					taPlacements += '<SubTexture name="' +m_name + '" x="' + bmp.x + '" y="' + bmp.y + '" width="' + bmp.width + '" height="' + bmp.height + '" pivotX="1" pivotY="1"/>'+ brk;
				}
				else
				{
					var comma:String = ',';
					if(j == chosenArrLen-1)
					{
						comma = '';
					}
					
					taPlacements += '"' + m_name + '":{"frame":{"x":' + bmp.x + ',"y":' + bmp.y + ',"w":' + bmp.width + ',"h":' + bmp.height + '},' + brk;
					taPlacements += '"rotated": false,' + brk;
					taPlacements += '"trimmed": true,'+ brk;
					taPlacements += '"spriteSourceSize": {"x":0,"y":0,"w":' + bmp.width + ',"h":' + bmp.height + '},'+ brk;
					taPlacements += '"sourceSize": {"w":' + bmp.width + ',"h":' + bmp.height + '}'+ brk;
					taPlacements += '}'+comma + ''+ brk;
				}
				
            }
			
			/*for (var i:int = 0; i < chosenArrLen; i++ )
			{
				var bmp:Bitmap = new Bitmap(chosenArr[i].img);
				var m_name:String = chosenArr[i].parentLikage;
				taMC.addChild(bmp);
				bmp.y = lastY;
				bmp.x = lastX;
				
				if (bmp.width > widestInRow)
				{
					widestInRow = bmp.width ;
				}
				
				if (bmp.y + bmp.height > dimentionsH)
				{
					lastY = 0;
					lastX += widestInRow;
					widestInRow = 0;
				}
				else
				{
					lastY += bmp.height;
				}
				
			}*/
		}
		
	
		
		protected function stopAllMCs(view : MovieClip) : void
		{
			view.gotoAndStop(1);
			var child : MovieClip;
			var numOfChildren:int = view.numChildren
			for (var i : int = 0; i < numOfChildren; ++i)
			{
				child = view.getChildAt(i) as MovieClip;
				if (child)
				{
					stopAllMCs(child);
				}
			}
		}
		
		private function parse(mc:MovieClip, parentObj:Object):void //spacer:String
		{
			var obj:Object = {};
			for (var i:int = 0; i < mc.numChildren; i++ )
			{
				if (mc.getChildAt(i) is MovieClip)
				{
					var child:MovieClip = MovieClip(mc.getChildAt(i));
					var templateItem:Boolean = false;
					var nodeName:String = child.name;
					
					if (getQualifiedClassName(child) != "flash.display::MovieClip")
					{
						nodeName = getQualifiedClassName(child);
						templateItem = true;
					}
					
					if(nodeName.indexOf("BTN") != -1 ) //child.name.indexOf("BTN")
					{
						obj = {};
						obj.type = "btn";
						obj.name = nodeName;
						obj.template = templateItem;
						obj.instanceName = child.name;
						obj.x = int(child.x);
						obj.y=  int(child.y);
						obj.rotation= int(child.rotation);
						obj.width=int(child.width);
						obj.height=int(child.height);
						obj.alpha=Number(child.alpha);
						
						addObj(parentObj, obj);
						parse(child, obj);
					}
					else
					{
						
						obj = {};
						obj.type = "asset";
						obj.name = nodeName;
						obj.template = templateItem;
						obj.instanceName = child.name;
						obj.x = int(child.x);
						obj.y=  int(child.y);
						obj.rotation= int(child.rotation);
						obj.width=int(child.width);
						obj.height=int(child.height);
						obj.alpha=Number(child.alpha);
						
						if(mc.totalFrames> 1)
						{
							if(parentObj.frames == undefined)
							{
								//traceparentObj.name , parentObj.instanceName);
								parentObj.frames = getAnimTrack(mc);
							}
							
						}
						
						addObj(parentObj, obj);
						parse(child, obj);
					}
				}
				else if(mc.getChildAt(i) is TextField)
				{
					var tf:TextField = TextField(mc.getChildAt(i));
					
					obj = {};
					obj.type = "textField";
					obj.name = tf.name;
					obj.template = templateItem;
					obj.x = int(tf.x);
					obj.y=  int(tf.y);
					obj.rotation= int(tf.rotation);
					obj.width=int(tf.width);
					obj.height=int(tf.height);
					obj.alpha=Number(tf.alpha);
					obj.text = tf.text;
					obj.tfType = tf.type;
					obj.size = tf.defaultTextFormat.size;
					obj.align = tf.defaultTextFormat.align;
					obj.font = tf.defaultTextFormat.font;
					obj.color = tf.defaultTextFormat.color;
					obj.z = i;
					
					addObj(parentObj, obj);
				}
				else 
				{
					if (mc.getChildAt(i) is Shape)
					{
						var shp:Shape = Shape(mc.getChildAt(i));
						var bounds:Rectangle = shp.getBounds(shp);
						
						var parentTempName:String = getQualifiedClassName(mc);
						
						
						obj = {};
						obj.type = "img";
						obj.name = parentTempName + "_IMG";
						obj.x = bounds.x;
						obj.y = bounds.y;
						obj.width=int(shp.width);
						obj.height=int(shp.height);
						
						addObj(parentObj, obj);
						tryToPush(getImage(shp), mc);
					}
					
				}
			}
		}
		
		private function addObj(parentObj:Object, obj:Object):void
		{
			if(parentObj.children == undefined)
			{
				parentObj.children = [];
			}
			parentObj.children.push(obj);
			
		}	
		
		private function playMCFrame( mc:MovieClip):void
		{
			mc.gotoAndStop(mc.currentFrame==mc.totalFrames ? 1 : mc.currentFrame+1);
			
			if(mc.numChildren)
			{
				for(var i:int = 0 ; i <mc.numChildren; i++ )
				{
					if(mc.getChildAt(i) is MovieClip)
					{
						playMCFrame( MovieClip(mc.getChildAt(i)));
					}
				}
			}
		}
		
		private function getAnimTrack(mc:MovieClip):Object
		{
			var layers:Object = {};
			var lastPlacements:Object = {};
			
			var child:MovieClip;
			for(var j:int = 1; j <= mc.totalFrames; j++)
			{
				mc.gotoAndStop(j);
				//playMCFrame(mc);
				
				for(var i:int = 0; i < mc.numChildren; i++)
				{
					if(mc.getChildAt(i) is MovieClip)
					{
						child = MovieClip(mc.getChildAt(i));
						
						if(child)
						{
							var currX:int = int(child.x);
							var currY:int = int(child.y);
							var rot:int = int(child.rotation);
							var sX:Number = child.scaleX;
							var sY:Number = child.scaleY;
							var a:Number = child.alpha;
							var firstTime:Boolean = false;
							var o:Object =  {frame:true};
							
							if(layers[child.name] == undefined)
							{
								layers[child.name]=[];
							}
							
							
							
							if(lastPlacements[child.name] == undefined)
							{
								firstTime = true;
								lastPlacements[child.name]={"x": currX, "y":currY, "rotation": rot, "scaleX": sX,"scaleY" : sY, "alpha": a , frame:true};
								layers[child.name].push({"x": currX, "y":currY, "rotation": rot, "scaleX": sX,"scaleY" : sY, "alpha": a , frame:true});
								
							}
							else
							{
								if(lastPlacements[child.name].x  != currX)
								{
									o.x = currX;
									lastPlacements[child.name].x = currX;
								}
								if(lastPlacements[child.name].y  != currY)
								{
									o.y =  currY;
									lastPlacements[child.name].y = currY;
								}
								if(lastPlacements[child.name].rotation != rot)
								{
									o.rotation= rot;
									lastPlacements[child.name].rotation = rot;
								}
								if(lastPlacements[child.name].scaleX != sX)
								{
									o.scaleX = sX;
									lastPlacements[child.name].scaleX = sX;
								}
								if(lastPlacements[child.name].scaleY != sY)
								{
									o.scaleY = sY;
									lastPlacements[child.name].scaleY = sY;
								}
								if(lastPlacements[child.name].alpha != a)
								{
									o.alpha = a;
									lastPlacements[child.name].alpha = a;
								}
										
								
								layers[child.name].push(o);
							}
						}
					}
				}
			}
			
			//traceJSON.stringify(layers));
			return layers;
		}
		
		
		
		private function tryToPush(bd:BitmapData, parentMC:MovieClip):void 
		{
			var exists:Boolean = false;
			var _parentLikage:String = getQualifiedClassName(parentMC);
			
			
	
			
			//if this linkage exists, don't bother
			for (var i:int = 0; i < imagesData.length; i++ )
			{
				if (_parentLikage == imagesData[i].parentLikage)
				{
					exists = true;
					break;
				}
			}
			
			for (i = 0; i < imagesData.length; i++ )
			{
				if (imagesData[i].img.compare(bd) == 0)
				{
					//trace"exists!");
					rejectsArr.push({parentLikage: _parentLikage, img: bd , area: int(bd.width )});
					exists = true;
					break;
				}
				
			}
			
			if (exists == false)
			{
				imagesData.push({parentLikage: _parentLikage, img: bd , area: int(bd.width )});
			}
			
		}
		private function printLine(str:String):void
		{
			//placementsXML += str;
		}
		
		private function getOnlyText(text:String):String 
		{
			return text.substr(0, text.lastIndexOf(" "));
		}
		
		private function getImage(d:DisplayObject):BitmapData
		{
			var oldMatrix:Matrix = d.parent.transform.matrix;
			d.parent.transform.matrix = new Matrix();
			var rect:Rectangle = d.getBounds(d.parent);
			var sourceBMD:BitmapData = new BitmapData(rect.width, rect.height, true, 0);
			var matrix:Matrix = new Matrix();
			matrix.translate(-rect.x, -rect.y);
			sourceBMD.draw(d, matrix);
			d.parent.transform.matrix = oldMatrix;
			return sourceBMD;
		}
		
		private function saveOutTA(_bd:BitmapData, fileName:String):void
		{
			// use adobe’s encoder to create a byteArray
			var byteArray:ByteArray = PNGEncoder.encode(_bd);
			var file:File = File.desktopDirectory.resolvePath(fileName);
			var wr:File = new File(file.nativePath);
			var stream:FileStream = new FileStream();
			stream.open( wr , FileMode.UPDATE);
			stream.writeBytes( byteArray, 0, byteArray.length );

		}
		
		private function saveXML(str:String, fileName:String):void
		{
			var wr:File = File.desktopDirectory.resolvePath(fileName);
			var stream:FileStream = new FileStream();
			stream.open( wr , FileMode.WRITE);
			stream.writeUTFBytes(str);
			stream.close();
			
		}	

	}

}