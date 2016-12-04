// put your javascript code here, make sure you reference this with a script 
// at the just before the closing body tag:
// 
//     <script type="text/javascript" src="js/index.js"></script>

"use strict;" 

var userName;
var passWord;
var tbl;
var obj;
var onShake = function () {
    refresh();
}

var onShakeError = function() {
	alert("onShakeError occurred");
}

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	showLoginTab();
    
	if (typeof shake !== 'undefined') {
		// watch for device shaking, if we hit the unit threshold, call onShake
		shake.startWatch(onShake, 10, onShakeError);
	}
}

function login() {
	
	userName = document.getElementById("asuRite").value;
	passWord = document.getElementById("passWord").value;
	
    refresh();
}

function refresh() {
document.getElementById("detailsDiv").innerHTML = " "; 
setDetails();
    
tbl = prettyPrint(obj.Result);
document.getElementById("detailsDiv").appendChild(tbl);

document.getElementById('accountDetailLink').click();
}

function setDetails() {
    MySql.Execute(
		"dmazzola.com", 
		"mgcreditunion", 
		"mgcred8755", 
		"test_db_mgcreditunion", 
		"SELECT S.Balance, T.Store, T.Cost FROM Students S INNER JOIN Transactions T ON S.ASURite = T.ASURite AND S.ASURite = '"+userName+"' AND S.pword = '"+passWord+"';", 
		function (data) {
            obj = data;
		}
	); 
}

function showLoginTab() {
	document.getElementById('loginLink').click();
}

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
