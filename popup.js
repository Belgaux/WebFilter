var button_status;
document.addEventListener("DOMContentLoaded", function() {
	// button click
	document.getElementById("start").addEventListener("click", sendMessage);
});

function sendMessage() {
	// radio buttons
	var radio_buttons = document.getElementsByTagName("input");
	for (var i = 0; i < radio_buttons.length; i++) {
		if (radio_buttons[i].type === "radio" && radio_buttons[i].checked) {
			button_status = radio_buttons[i].value;
		}
	}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var msg = document.getElementById("word").value;
		if (msg) {
			chrome.tabs.sendMessage(tabs[0].id, {
				message: msg,
				status: button_status
			});
		}
		
	});	
}