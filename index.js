// put your javascript code here, make sure you reference this with a script 
// at the just before the closing body tag:
// 
//     <script type="text/javascript" src="js/index.js"></script>

"use strict;" 

var userName;
var passWord;
var ammountToAdd;
var onShake = function() {
	//alert("onShake event");
	setBalance();
    setDetails;
}

var onShakeError = function() {
	alert("onShakeError occurred");
}

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	document.getElementById("deposit").style.display = "none";
	document.getElementById("accountDetail").style.display = "none";
	document.getElementById("depositLink").style.display = "none";
	document.getElementById("accountDetailLink").style.display = "none";
	
	if (typeof shake !== 'undefined') {
		// watch for device shaking, if we hit the unit threshold, call onShake
		shake.startWatch(onShake, 10, onShakeError);
	}
}

function login() {
	
	userName = document.getElementById("asuRite").value;
	passWord = document.getElementById("passWord").value;
	
	setBalance();
    setDetails();
    
    document.getElementById('accountDetailLink').click();
}

function addFunds() {
    ammountToAdd = document.getElementById("depositBox").value;
    
    MySql.Execute(
		"dmazzola.com", 
		"mgcreditunion", 
		"mgcred8755", 
		"test_db_mgcreditunion", 
		"update Students set Balance = Balance + "+ammountToAdd+" where ASURITE= '"+userName+"' and PWord = '"+passWord+"';", 
		function (data) {
		}
	);
    
    setBalance();
    setDetails();
    
    document.getElementById('accountDetailLink').click();
}

function processResult(returnedResult, id) {

    var table, tableBody, tableHeader, tableRow;

    body        = document.getElementById(id);
    table  	  	= document.createElement("table");
    tableBody 	= document.createElement("tbody");
    tableHeader = document.createElement("tr");

    for (var i=0; i<returnedResult.Result[0].length; i++) {
        var cell 	 = document.createElement("th");
        var cellText = document.createTextNode(returnedResult.Result[0].keys()[i]);
        cell.appendChild(cellText);
        tableHeader.appendChild(cell);
    }
    tableBody.appendChild(tableHeader);

    for (var i=0; i<returnedResult.Result.length; i++) {
        var tableRow = document.createElement("tr");

        for (var j=0; j<Object.keys(returnedResult.Result[i]).length; j++) {
            var cell 	 = document.createElement("td");
            var cellText = document.createTextNode(Object.values(returnedResult.Result[i])[j]);
            cell.appendChild(cellText);
            tableRow.appendChild(cell);
        }

        tableBody.appendChild(tableRow);
    }
    table.appendChild(tableBody);
    table.setAttribute("border", "2");
    body.appendChild(table);
}
	
function setBalance() {
	MySql.Execute(
		"dmazzola.com", 
		"mgcreditunion", 
		"mgcred8755", 
		"test_db_mgcreditunion", 
		"select Balance from Students where ASURite = '"+userName+"' and PWord = '"+passWord+"';", 
		function (data) {
                processResult(data, "balance");
		}
	);
}

function setDetails() {
    MySql.Execute(
		"dmazzola.com", 
		"mgcreditunion", 
		"mgcred8755", 
		"test_db_mgcreditunion", 
		"select Store, Cost from Transactions where ASURite = '"+userName+"';", 
		function (data) {
                processResult(data, "details");
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

function objArray2Table(objArray) {
	console.log(Object.keys(objArray[0]));
	for (i = 0; i<objArray.length; i++) {
		console.log(Object.values(objArray[i]));
	}
}
