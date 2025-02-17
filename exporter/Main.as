package  
{
	import flash.display.MovieClip;
	import com.dynamicTaMaker.loaders.*;
	
	public class Main extends MovieClip
	{

		public function Main() 
		{
			trace("yo");
			var str:String = "./assets/slotMachine.swf";
			//var d:DynamicTaCreator = new DynamicTaCreator();
			//d.init(new BallAssetsMC());
			var swfLoader:SWFLoader = new SWFLoader();
			swfLoader.loadSWF(str, onComplete);
			////new AssetsMC()//WrapperMC
			trace("yo")
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
