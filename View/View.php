<?php
	class View
	{
		private $htmlPath ;
		private $jsPath ;
		private $cssPath ;
		public function setHtmlPath($path)
		{
			$this->htmlPath = $path;
		}
		public function setJSPath($path)
		{
			$this->jsPath = $path;
		}
		public function setCSSPath($path)
		{
			$this->cssPath = $path;
		}
		public function start()
		{
			echo "<html>\n\t<body>\n";
		}
		public function loadJS($fileName)
		{
			echo "\t\t";
			echo "<script type='text/javascript' src='".$this->jsPath.$fileName."'></script>\n";
		}
		public function loadCSS($fileName)
		{
			echo "\t\t";
			echo "<link rel='stylesheet' type='text/css' href='".$this->cssPath.$fileName."'>\n";
		}
		public function loadForm()
		{
			echo "\t";
			include($this->htmlPath.'form.html');
		}
		public function close()
		{
			echo "\n\t</body>\n</html>";
		}
		
		
	}
?>