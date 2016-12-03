// put your javascript code here, make sure you reference this with a script 
// at the just before the closing body tag:
// 
//     <script type="text/javascript" src="js/index.js"></script>

"use strict;" 

var userName;
var passWord;
var amountToAdd;
var onShake = function() {
	document.getElementById("detailsDiv").innerHTML = ""; 
    
    setDetails();
    
    document.getElementById('accountDetailLink').click();
}

var onShakeError = function() {
	alert("onShakeError occurred");
}

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
    showLoginTab();
}

function onDeviceReady() {
	document.getElementById("accountDetail").style.display = "none";
	document.getElementById("accountDetailLink").style.display = "none";
    
	if (typeof shake !== 'undefined') {
		// watch for device shaking, if we hit the unit threshold, call onShake
		shake.startWatch(onShake, 10, onShakeError);
	}
}

function login() {
	
	userName = document.getElementById("asuRite").value;
	passWord = document.getElementById("passWord").value;
	
    document.getElementById("detailsDiv").innerHTML = ""; 
    setDetails();
    
    document.getElementById('accountDetailLink').click();
}


function processResult(data) {
    
    var body, table, tableBody, tableHeader, tableRow;

    body        = document.getElementById("detailsDiv");
    table  	  	= document.createElement("table");
    tableBody 	= document.createElement("tbody");
    tableHeader = document.createElement("tr");

    for (var i=0; i<Object.keys(data.Result[0]).length; i++) {
        var cell 	 = document.createElement("th");
        var cellText = document.createTextNode(Object.keys(data.Result[0])[i]);
        cell.appendChild(cellText);
        tableHeader.appendChild(cell);
    }
    tableBody.appendChild(tableHeader);

    for (var i=0; i<data.Result.length; i++) {
        var tableRow = document.createElement("tr");

        for (var j=0; j<Object.keys(data.Result[i]).length; j++) {
            var cell 	 = document.createElement("td");
            var cellText = document.createTextNode(Object.values(data.Result[i])[j]);
            cell.appendChild(cellText);
            tableRow.appendChild(cell);
        }

        tableBody.appendChild(tableRow);
    }
    table.appendChild(tableBody);
    table.setAttribute("border", "2");
    body.appendChild(table);
}

function setDetails() {
    MySql.Execute(
		"dmazzola.com", 
		"mgcreditunion", 
		"mgcred8755", 
		"test_db_mgcreditunion", 
		"SELECT S.Balance, T.Store, T.Cost FROM Students S INNER JOIN Transactions T ON S.ASURite = T.ASURite AND S.ASURite = '"+userName+"' AND S.pword = '"+passWord+"';", 
		function (data) {
                processResult(data);
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
