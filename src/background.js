var enabled = true;

//configurações de privacidade, 
//cookies de terceiros foi mudado para essa configuração aqui
chrome.privacy.websites.thirdPartyCookiesAllowed.set({value: false});
chrome.privacy.websites.hyperlinkAuditingEnabled.set({value: false});
chrome.privacy.websites.doNotTrackEnabled.set({value: true});
chrome.privacy.websites.referrersEnabled.set({value: false});
chrome.privacy.network.networkPredictionEnabled.set({value: false});

//cada request é analizado e adicionado um listener
chrome.webRequest.onBeforeRequest.addListener(
	//rodando a função
	function(details) {
		//é pego o dominio e a url para checar o dominio (blocked_domains.js)
		// e para bloquear parte do site (blocked_parts.js)
		var domain = details.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
		var part_check = details.url;
		
		//checagem e bloqueio, caso esteja nos dominios bloqueados
		if (blocked_domains.includes(domain)) {
			return {cancel: true}; 
		} else { 
			//caso não esteja, é checada se a parte do site está nas partes bloqueadas
			for (let i = 0; i < blocked_parts.length; i++) {
				if (part_check.includes(blocked_parts[i]) == true) {
					return {cancel: true};
				}
			}
		}	
	},
	{urls: ["<all_urls>"]},
	["blocking"]
);

/* caso o html esteja pronto pra rodar, é colocado um listener para rodar um script
de conteúdo para checar o html*/

function scanTabs(tab) {
	chrome.tabs.executeScript(tab.id, {
		file: 'script.js',
		runAt: "document_idle",
		allFrames: true
	})
};

chrome.tabs.onUpdated.addListener(scanTabs);
chrome.tabs.onCreated.addListener(scanTabs);

/*
para enviar a mensagem para o content script: não está dando para ler o blocked_js e essas coisas

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message == "js") {
		sendResponse(sender,blocked_js);
	} else if (message == "classes") {
		sendResponse(sender,blocked_classes);
	} else if (message == "ids") {
		sendResponse(sender,blocked_ids);
	} else if (message == "adunit") {
		sendResponse(sender,blocked_adunit);
	}
});
*/
