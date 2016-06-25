document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("start").addEventListener("click", sendMessage);
});

function sendMessage() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var msg = document.getElementById("word").value;
		chrome.tabs.sendMessage(tabs[0].id, {message: msg});
	});	
}