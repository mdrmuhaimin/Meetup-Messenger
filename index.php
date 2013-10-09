<?php
	require_once ('Model\Util.php');
	require_once ('Model\Config.php');
	require_once ('View\View.php');
	$util = new Util;
	if(!(isset($_GET['redir']) && $_GET['redir']))
	{
		$util->reqAuthorization($CONSUMER_KEY, $RESPONSE_TYPE, $CONSUMER_RED_URI);
	}
	$renderer = new View;
	$renderer->setHtmlPath($HTML_PATH);
	$renderer->setJSPath($JS_PATH);
	$renderer->setCSSPath($CSS_PATH);
	$renderer->start();
	$renderer->loadJS("javascript.js");
	$renderer->loadCSS("style.css");
	$renderer->loadForm();
	$renderer->close();
?>