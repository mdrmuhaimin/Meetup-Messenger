<?php
	class Util
	{
		public function reqAuthorization($key, $res_type, $red_uri ){
			$authURL = "https://secure.meetup.com/oauth2/authorize?scope=messaging&client_id=".$key."&response_type=".$res_type."&redirect_uri=".$red_uri."";
			header("Location: ".$authURL); /* Redirect browser */
			die();
		}
		
	}
?>