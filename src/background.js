var enabled = true;
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
	  return {cancel: details.url != -1};
	},
	{urls: blocked_domains},
	["blocking"]
);
