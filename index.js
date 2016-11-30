// put your javascript code here, make sure you reference this with a script 
// at the just before the closing body tag:
// 
//     <script type="text/javascript" src="js/index.js"></script>

"use strict;" 

var username;
var givenUName;
var password;
var givenPWord;
var balance;

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	showTab(event, login);
	document.getElementById("deposit").style.display = "none";
	document.getElementById("accountDetail").style.display = "none";
	document.getElementById("depositLink").style.display = "none";
	document.getElementById("accountDetailLink").style.display = "none";
	
	if (typeof shake !== 'undefined') {
		// watch for device shaking, if we hit the unit threshold, call onShake
		shakeNode.innerHTML = "or you can shake me!"
		shake.startWatch(onShake, 10, onShakeError);
	}
}

var onShake = function() {
	//alert("onShake event");
	setBalance();
}

var onShakeError = function() {
	alert("onShakeError occurred");
}

function login() {
	
	givenUName = document.getElementById("asuRite").value;
	givenPWord = document.getElementById("password").value;
	
	MySql.Execute(
		"dmazzola.com", 
		"mgcreditunion", 
		"mgcred8755", 
		"test_db_mgcreditunion", 
		"select count(ASURite) from Students where ASURite = "+givenUName+";", 
		function (data) {
			if (data > 1)
			{
				username = givenUName;
			}
			else
			{
				alert("Wrong username, try again");
			}
			
			console.log(data)
		}
	);
	
	MySql.Execute(
		"dmazzola.com", 
		"mgcreditunion", 
		"mgcred8755", 
		"test_db_mgcreditunion", 
		"select PWord from Students where ASURite = "+username+";", 
		function (data) {
			if (data == givenPWORD)
			{
				password = givenPWord;
			}
			else
			{
				alert("Wrong password, try again");
			}
			
			console.log(data)
		}
	);
	
	MySql.Execute(
		"dmazzola.com", 
		"mgcreditunion", 
		"mgcred8755", 
		"test_db_mgcreditunion", 
		"select Balance from Students where ASURite = "+username+" and Password = "+password+";", 
		function (data) {
			
			
			console.log(data)
		}
	);
}
	
function setBalance() {
	MySql.Execute(
		"dmazzola.com", 
		"mgcreditunion", 
		"mgcred8755", 
		"test_db_mgcreditunion", 
		balance = "select Balance from Students where ASURite = "+ username +";", 
		function (data) {
			balance = data;
			document.getElementById("balance").innerHTML = balance;
			
			console.log(data)
		}
	);
}

/*function showLoginTab() {
	document.getElementById('login').click();
}*/

function showTab(event, tabName) {
    // Declare all variables
    var i, tabContentElems, tabLinkElems;

    // Get all elements with class="tabContent" and hide them
    tabContentElems = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContentElems.length; i++) {
        tabContentElems[i].style.display = "none";
    }

    // Get all elements with class="tabLink" and remove the class "active"
    tabLinkElems = document.getElementsByClassName("tabLink");
    for (i = 0; i < tabLinkElems.length; i++) {
        tabLinkElems[i].className = 
        	tabLinkElems[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}
