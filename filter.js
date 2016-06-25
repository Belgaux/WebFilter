chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var word_list = request.message.replace(/ /g, '').split(",");
	var status = request.status;
	if (status === "censor") word_list.forEach(censor);
	if (status === "enhance") word_list.forEach(enhance);
	if (status === "delete") word_list.forEach(hide);
});

function enhance(word) {
	filterTags(word, "<span class=\"enhance\">$&</span>");
}

function censor(word) {
	filterTags(word, "*".repeat(word.length));
}

function hide(word) {
	filterTags(word, "<span class=\"deleted\">$&</span>");
}

function filterTags(word, r_string) {
	var p_tags = document.getElementsByTagName("p");
	var a_tags = document.getElementsByTagName("a");	
	var h_tags = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
		
	if (p_tags !== 0) {
		filterElements(p_tags, word, r_string);
	}
	if (a_tags.length !== 0) {
		filterElements(a_tags, word, r_string);
	}
	if (h_tags.length !== 0) {
		filterElements(h_tags, word, r_string);
	}	
}

/*
	element_list: 		array of DOM elements
	search_word: 		word to be filtered
	replacement_string: string to replace the filtered word
*/
function filterElements(element_list, search_word, replacement_string) {
	for (var i = 0; i < element_list.length; i++) {
		var inner_string = element_list[i].innerHTML;
		console.log("test");
		element_list[i].innerHTML = replaceWords(inner_string, 
										search_word, 
										replacement_string);
	}
}

/*
	str:				any string
	keyword:			word to be filtered
	replacement_string: string to replace keyword
*/
function replaceWords(str, keyword, replacement_string) {
	// regex matches all whole words, ignoring case
	var re = new RegExp("\\b" + keyword + "\\b", "gi");
	return str.replace(re, replacement_string);
}

String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
}