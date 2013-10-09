	
	var authorized; 
	var tokenType;
	var acess_token;
	var debug = true;
	window.onload=function()
	{
		authorized = checkAuthorizationStatus();
		if(debug) console.log("Authorization status = "+authorized);
		if(authorized){
			var query_string = (window.location.hash).split("&"); 
			tokenType = (query_string[2]).split("=")[1];
			acess_token = (query_string[3]).split("=")[1];
		}
		else{
			document.getElementById("form").innerHTML = "";
			setStatusMessage("Acess Denied", "red");
			
		}
	};
	function checkAuthorizationStatus()
	{
		if(debug) console.log(window.location);
		if(window.location.hash.lastIndexOf("#error", 0) === 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	function sendMessage()
	{
		var member_id = document.forms["messageForm"]["memId"].value; 
		var group_id = document.forms["messageForm"]["groupId"].value; 
		var subj = document.forms["messageForm"]["subj"].value;
		var message = document.forms["messageForm"]["message"].value;
		var url = "https://api.meetup.com/2/message.json?access_token="+acess_token+"";
		if(isValidateData(member_id, group_id, subj, message))
		{
			var postReq = "member_id="+member_id+"&group_id="+group_id+"&subject="+subj+"&message="+message ;
			if(debug) console.log(url);
			if(debug) console.log(postReq);
			var xmlhttp;
			if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			xmlhttp.onreadystatechange=function()
			{
				if(debug) console.log("Ready state = "+xmlhttp.readyState);
				if (xmlhttp.readyState==4)
				{
					
					if(xmlhttp.status == 202)
					{
						setStatusMessage("Message successfully send", "green");
					}
					else if(xmlhttp.status == 400)
					{
						var response = JSON.parse(xmlhttp.responseText);
						if(debug) console.log("Response :"+response.code);
						showError(response);
					}
					else
					{
						if(debug) console.log("Status Code :"+xmlhttp.status);
					}
					
				}
			};
			xmlhttp.open("POST",url,true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send(postReq);
		}
		
	}
	
	function setStatusMessage(message, color)
	{
		var statusMessage;
		var messageDisplayTime = 10000; // In Microsecond
		statusMessage = document.getElementById("statusMessage");
		statusMessage.innerHTML = "<h2>"+message+"</h2>";
		if (arguments.length == 2)
		{
			statusMessage.style.color = color;
		}
		setInterval(function(){statusMessage.innerHTML = "";},messageDisplayTime);
	}
	
	function showError(error)
	{
		setStatusMessage("Error :"+error.details.valueOf(), "red");
	}
	
	function isValidateData(member_id, group_id, subject, message)
	{
		var validationError;
		hideValidationError();
		if(isNaN(member_id) || member_id === "")
		{
			validationError = document.getElementById("member_id_input_error");
			if(debug) console.log("Invalid Member ID");
		}
		else if(isNaN(group_id) || group_id === "")
		{
			validationError = document.getElementById("group_id_input_error");
			if(debug) console.log("Invalid Group ID");
		}
		else if(subject.length > 50 || subject === "")
		{
			validationError = document.getElementById("subject_input_error");
			if(debug) console.log("Invalid Subject ");
		}
		else if(message.length >= 5000 || message === "")
		{
			validationError = document.getElementById("message_input_error");
			if(debug) console.log("Invalid message");
		}
		else
		{
			return true;
		}
		validationError.style.display = "block";
		return false;
	}
	function hideValidationError()
	{
		document.getElementById("member_id_input_error").style.display = "none";
		document.getElementById("group_id_input_error").style.display = "none";
		document.getElementById("subject_input_error").style.display = "none";
		document.getElementById("message_input_error").style.display = "none";
	}