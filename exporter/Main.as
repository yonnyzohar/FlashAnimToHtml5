﻿package  
{
	import flash.display.MovieClip;
	import com.dynamicTaMaker.loaders.*;
	
	public class Main extends MovieClip
	{

		public function Main() 
		{
			trace("yo");
			var str:String = "./assets/Lavalink.swf";
			var swfLoader:SWFLoader = new SWFLoader();
			swfLoader.loadSWF(str, onComplete);
		}
	
		private function onComplete(mc:MovieClip):void
		{
			var d:DynamicTaCreator = new DynamicTaCreator();
			d.init(mc);
			//stage.scaleMode = StageScaleMode.NO_SCALE;
			//stage.frameRate = view.loaderInfo.frameRate;
			//stage.stageWidth = view.loaderInfo.width;
			//stage.stageHeight = view.loaderInfo.height;
			//stage.addChild(mc);
		}

	}
	
}
