package  
{
	import flash.display.MovieClip;
	import com.dynamicTaMaker.loaders.*;
	
	public class Main extends MovieClip
	{

		public function Main() 
		{
			trace("yo")
			var d:DynamicTaCreator = new DynamicTaCreator();
			d.init(new BallAssetsMC());//new AssetsMC()//WrapperMC
			trace("yo")
		}

	}
	
}
