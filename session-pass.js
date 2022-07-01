// ==UserScript==
// @name         Session pass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Password protect websites for a session
// @author       omrilotan
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

{
	const PIN = "1234";
	const SALT = "teZbURmqqNQsjZHl8Vrv6vzjdClwVBsN";
	const SITES = ["www.youtube.com"];

	const { hostname } = location;
	if (!SITES.includes(hostname)) {
		return;
	}
	const key = [hostname, SALT].join(":");

	if (sessionStorage.getItem(key)) {
		return;
	}

	const div = document.createElement("div");
	div.setAttribute(
		"style",
		[
			"position: fixed",
			"left: 0",
			"top: 0",
			"width: 100%",
			"height: 100%",
			"background: #111",
			"z-index: 2147483647",
			"font-size: 100px",
			"display: flex",
			"justify-content: center",
			"align-items: center",
			"color: #333",
		].join(";")
	);
	div.appendChild(document.createTextNode("Protected"));
	document.body.appendChild(div);

	function protec() {
		const password = window.prompt("password");
		if (password === null) {
			return block();
		}
		if (password === PIN) {
			sessionStorage.setItem(key, Date.now());
			div.parentNode?.removeChild(div);
			return;
		} else {
			return protec();
		}
	}
	function block() {
		document.body.innerHTML = "";
		document.body.appendChild(div);
	}
	setTimeout(protec);
}
