// a place for hacks


var isIE = window.navigator.userAgent.indexOf("MSIE") != -1;

if (isIE) {

	if (typeof(Element) != "object") {
		Element = function () {};
	}

	if (typeof(Node) != "object") {
		Node = function () {};
	}
}

