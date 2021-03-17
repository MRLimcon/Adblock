const blocked_domains = [
	"*://*.doubleclick.net/*",
	"*//*partner.googleadservices.com/*",
	"*//*.googlesyndication.com/*",
	"*//*.google-analytics.com/*",
	"*//*creative.ak.fbcdn.net/*",
	"*//*.adbrite.com/*",
	"*//*.exponential.com/*",
	"*//*.quantserve.com/*",
	"*//*.scorecardresearch.com/*",
	"*//*.zedo.com/*",
]
var enabled = true;
//função para verificar os sites antes da request
chrome.webRequest.onBeforeRequest.addListener(
	//se o site for igual a um dos sites do blocked_domains (está em blocked_domains.js), a request é cancelada
	function(details) { return {cancel: true}},
	{urls: blocked_domains},
	["blocking"]
)
