package com.dynamicTaMaker.utils 
{
	import flash.filesystem.File;
	

	public class ExternalProcessRunner 
	{
		
		public static function runProcess(fileBasePath:String, fileName : String,  args : Vector.<String>, completeCallback : Function = null, workingDir:File = null) : void
		{

			var processFile : File = new File(fileBasePath + File.separator + fileName);

			var pl : ProcessLauncher = new ProcessLauncher();

			try {
				pl.execute(processFile.nativePath, args, workingDir, completeCallback);
			}
			catch (e:Error)
			{
				trace(e.message);
			}
			
		}
		
	}

}

/*



*/