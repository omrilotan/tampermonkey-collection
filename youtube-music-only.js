// ==UserScript==
// @name         Youtube Music only
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  darken video on youtube music
// @author       omrilotan
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

{
	const style = document.createElement("style");
	style.textContent = "video { filter: brightness(0) }";
	document.head.appendChild(style);
}
