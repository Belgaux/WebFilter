chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var word_list = request.message.replace(/ /g, '').split(",");
	console.log(word_list);
	word_list.forEach(applyToAllTags);
});

function applyToAllTags(word) {
	var p_tags = document.getElementsByTagName("p");
	var a_tags = document.getElementsByTagName("a");	
	var h_tags = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
		
	if (p_tags !== 0)
		applyToAllWords(p_tags, word, "affected");
		//sensorAllWords(p_tags, word);
	if (a_tags.length !== 0) {
		applyToAllWords(a_tags, word, "affected");
		//sensorAllWords(a_tags, word);
	}
	if (h_tags.length !== 0) {
		applyToAllWords(h_tags, word, "affected");
		//sensorAllWords(h_tags, word);
	}
}

function sensorAllWords(element_list, search_word) {
	for (var i = 0; i < element_list.length; i++) {
		var inner_string = element_list[i].innerHTML;
		element_list[i].innerHTML = sensorWords(inner_string, search_word);
	}
}

/*
	Takes a list of DOM elements and applies a span with a class name to each word matching the search word.
*/
function applyToAllWords(element_list, search_word, class_name) {
	for (var i = 0; i < element_list.length; i++) {
		var inner_string = element_list[i].innerHTML;
		element_list[i].innerHTML = wrapWords(inner_string, search_word, class_name);
	}
}

/*
	Find all instances of the keyword in the string and wrap them in spans with a classname
*/
function wrapWords(str, keyword, class_name) {
	// regex matches all whole words, ignoring case
	var re = new RegExp("\\b" + keyword + "\\b", "gi");
	return str.replace(re, "<span class=\"" + class_name + "\">$&</span>");
}

function sensorWords(str, keyword) {
	var re = new RegExp("\\b" + keyword + "\\b", "gi");
	return str.replace(re, keyword[0] + "*".repeat(keyword.length - 1));
}

function deleteWords(str, keyword) {
	var re = new RegExp("\\b" + keyword + "\\b", "gi");
	if (str.match(re)) {
		deleteRow(str);
	}
}

function deleteRow(e) {
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
}

String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
}