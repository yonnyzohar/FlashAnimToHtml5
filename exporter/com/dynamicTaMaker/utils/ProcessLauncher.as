package com.dynamicTaMaker.utils 
{
	import flash.desktop.NativeProcess;
	import flash.desktop.NativeProcessStartupInfo;
	import flash.events.EventDispatcher;
	import flash.events.NativeProcessExitEvent;
	import flash.events.ProgressEvent;
	import flash.filesystem.File;
	
	public class ProcessLauncher extends EventDispatcher
	{
		private var m_processOutput : String;
		private var m_process : NativeProcess;
		private var completeCallback : Function;
		
		public function ProcessLauncher()
		{
		
		}
		
		public function execute( processFile:String, args:Vector.<String>, workingDirectory:File = null, _completeCallback : Function = null) : void
		{
			var file : File = new File(processFile);
			var nativeProcessStartupInfo : NativeProcessStartupInfo = new NativeProcessStartupInfo();
			nativeProcessStartupInfo.executable = file;
			nativeProcessStartupInfo.arguments = args;
			completeCallback = _completeCallback;
			
			if (workingDirectory)
			{
				trace("working dir is " + workingDirectory.nativePath);
				nativeProcessStartupInfo.workingDirectory = workingDirectory;
			}
			
			m_processOutput = "";
			
			m_process = new NativeProcess();
			m_process.addEventListener(ProgressEvent.STANDARD_ERROR_DATA, onErrorData);
			m_process.addEventListener(ProgressEvent.STANDARD_OUTPUT_DATA, onOutputData);
			m_process.addEventListener(NativeProcessExitEvent.EXIT, onProcessExit);
			m_process.start(nativeProcessStartupInfo);
		}
		
		private function onOutputData(event : ProgressEvent) : void
		{
			
			var certResponse : String = new String();
			certResponse = m_process.standardOutput.readUTFBytes(m_process.standardOutput.bytesAvailable);
			m_processOutput += certResponse;
			trace("onOutputData " + m_processOutput);
		}
		
		private function onProcessExit(event : NativeProcessExitEvent) : void
		{
			trace("onProcessExit " + event);
			var success : Boolean = false;
			if (event.exitCode == 0 || isNaN(event.exitCode))
			{
				success = true;
				trace("SUCCESS");
				if(completeCallback)
				{
					completeCallback();
				}
			}
		}
		
		private function onErrorData(event : ProgressEvent) : void
		{
			trace("onErrorData " + event);
			var certResponse : String = m_process.standardError.readUTFBytes(m_process.standardError.bytesAvailable);
			m_process.removeEventListener(ProgressEvent.STANDARD_ERROR_DATA, onErrorData);
			m_process.exit();
		}
	}
}