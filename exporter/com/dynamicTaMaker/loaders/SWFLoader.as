package com.dynamicTaMaker.loaders
{
	import flash.display.Loader;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.IOErrorEvent;
	import flash.net.URLLoader;
	import flash.net.URLLoaderDataFormat;
	import flash.net.URLRequest;
	import flash.system.ApplicationDomain;
	import flash.system.LoaderContext;
	import flash.events.Event;
	import flash.events.ErrorEvent;
	import flash.events.IOErrorEvent;
	import flash.events.UncaughtErrorEvent;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.net.URLLoader;
	import flash.net.URLLoaderDataFormat;
	import flash.net.URLRequest;
	import flash.system.ApplicationDomain;
	import flash.system.LoaderContext;
	import flash.utils.ByteArray;

	public class SWFLoader extends EventDispatcher
	{
		private var loader : Loader = new Loader();
		private var loadedSwf:MovieClip;
		private var completeCallback:Function;
		private var path:String;
		
		public function SWFLoader()
		{
		}
		
		public function loadSWF(animSWF : String, _completeCallback:Function) : void
		{
			completeCallback = _completeCallback;
			
			var f:File = File.applicationDirectory.resolvePath(animSWF);
			//var f: File = new File(animSWF);

			if (f.exists) {
				animSWF = f.nativePath;
				loadAnimSWF(animSWF);
			} else {
				var message: String = f.nativePath + " does not exist on disk!!!"
				trace(message);
			}
		
			
		}
		
		protected function loadAnimSWF(animSWF: String): void {
			// this is a hack to get around the security domain restrictions
			// first we load the swf as a byte array from the remote locations
			// and then in swfLoaded() we will use that byte array to load the swf into the application domain
			path = animSWF;

			var f: File = new File(animSWF);
			var myfileStream: FileStream = new FileStream();
			myfileStream.open(f, FileMode.READ);
			var swfBytes: ByteArray = new ByteArray();
			myfileStream.readBytes(swfBytes);
			myfileStream.close();


			var loaderContext: LoaderContext = new LoaderContext();
			loaderContext.allowLoadBytesCodeExecution = true;
			var loader: Loader = new Loader();
			loader.loadBytes(swfBytes, loaderContext);
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, completeHandler);
			loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, failedHandler);
			//we have an issue with corrupt swf files failing on something in base validation, which does not throw an error. (BaseFLAValidation.as:22)
			//the following line catches it!
			loader.contentLoaderInfo.uncaughtErrorEvents.addEventListener(UncaughtErrorEvent.UNCAUGHT_ERROR, handleUncaughtErrors);


		}

		function handleUncaughtErrors(e: UncaughtErrorEvent): void {
			e.preventDefault();
			var swfPath: String = path;
			var message: String = "Failed to open file: '";
			message += swfPath;
			message += "'";
			message += " Your swf is probably broken. Within Animate, look at the output & error panels to see why your swf is broken.";
			trace(message);
		}


		protected function failedHandler(event: IOErrorEvent): void {
			if (event.errorID == 2032) {
				var swfPath: String = path;
				var message: String = "Failed to open file: '";
				message += swfPath;
				message += "'";
				trace(message);

			} else {
				trace(event.text);
			}
		}

		/**
		 * We go over all the BaseExportingItems on stage and get the relvant xmls and bitmap data.
		 * We create a .scene file with the name of the loaded swf.ב
		 * @param	event
		 */
		protected function completeHandler(event: Event): void {
			// get the root movie clip of the fla
			trace("load complete");
			var mc:MovieClip = event.target.content as MovieClip;
			event.target.removeEventListener(Event.COMPLETE, completeHandler);
			event.target.removeEventListener(IOErrorEvent.IO_ERROR, failedHandler);
			event.target.uncaughtErrorEvents.removeEventListener(UncaughtErrorEvent.UNCAUGHT_ERROR, handleUncaughtErrors);

			// we are stopping all the mc's recursively in the loaded movie clip, because otherwise, some of the code could have run already (like cuePoint) and this would mess the anim tracks.

			// get stage parameterssizeitem
			
			completeCallback(mc);
			
		}
		
	}
}