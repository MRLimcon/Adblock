let checkBox = 0;
let whiteList = [];

//configurações de privacidade, 
//cookies de terceiros foi mudado para essa configuração aqui
chrome.privacy.websites.thirdPartyCookiesAllowed.set({value: false});
chrome.privacy.websites.hyperlinkAuditingEnabled.set({value: false});
chrome.privacy.websites.doNotTrackEnabled.set({value: true});
chrome.privacy.websites.referrersEnabled.set({value: false});
chrome.privacy.network.networkPredictionEnabled.set({value: false});

//com o envio da mensagem pelo popup com as opções, são alteradas temporariamente as configurações
chrome.runtime.onMessage.addListener(
	function(message) {
		//colocar as opções para whitelist, blocklist e adicionar favorito (faço depois)
		if (message.greeting == 10) {
			//window.alert(tabTitle)
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function(tabs) {
				chrome.bookmarks.create({
					'title': tabs[0].title,
					'url': tabs[0].url,
				});
			});
		} else if (message.greeting == 9) {
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function(tabs) {
				let localBlockList = tabs[0].url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
				blocked_domains.push(localBlockList);
			});
		} else if (message.greeting == 8) {
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function(tabs) {
				let localWhitelist = tabs[0].url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
				whiteList.push(localWhitelist);
			});
		} else {
			checkBox = message.greeting
			//alterando as configurações de privacidade
			if (checkBox == 0 || checkBox == 7 || checkBox == 5 || checkBox == 3) {
				chrome.privacy.websites.thirdPartyCookiesAllowed.set({value: false});
				chrome.privacy.websites.hyperlinkAuditingEnabled.set({value: false});
				chrome.privacy.websites.doNotTrackEnabled.set({value: true});
				chrome.privacy.websites.referrersEnabled.set({value: false});
				chrome.privacy.network.networkPredictionEnabled.set({value: false});
			} else {
				chrome.privacy.websites.thirdPartyCookiesAllowed.set({value: true});
				chrome.privacy.websites.hyperlinkAuditingEnabled.set({value: true});
				chrome.privacy.websites.doNotTrackEnabled.set({value: false});
				chrome.privacy.websites.referrersEnabled.set({value: true});
				chrome.privacy.network.networkPredictionEnabled.set({value: true});
			}
		}
	}
)

//cada request é analizado e adicionado um listener
chrome.webRequest.onBeforeRequest.addListener(
	//rodando a função
	function(details) {
		if (checkBox == 4 || checkBox == 6 || checkBox == 7 || checkBox == 0) {
			//é pego o dominio e a url para checar o dominio (blocked_domains.js)
			// e para bloquear parte do site (blocked_parts.js)
			var domain = details.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
			var part_check = details.url;
			
			//checagem e bloqueio, caso esteja nos dominios bloqueados
			if (blocked_domains.includes(domain) && whiteList.includes(domain) == false) {
				return {cancel: true}; 
			} else if (whiteList.includes(domain) == false) {
				//caso não esteja, é checada se a parte do site está nas partes bloqueadas
				for (let i = 0; i < blocked_parts.length; i++) {
					if (part_check.includes(blocked_parts[i]) == true) {
						return {cancel: true};
					}
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
	if (checkBox == 2 || checkBox == 5 || checkBox == 6 || checkBox == 0) {
		chrome.tabs.executeScript(tab.id, {
			code: 'var blocked_js = ' + JSON.stringify(blocked_js) + "\n var blocked_adunit = "+ JSON.stringify(blocked_adunit) + "\n var blocked_ids = "+ JSON.stringify(blocked_ids) + "\n var blocked_classes = "+ JSON.stringify(blocked_classes)
		}, function() {
			chrome.tabs.executeScript(tab.id, {
				file: 'script.js',
				runAt: "document_idle",
				allFrames: true
			})
		})
	}
};

chrome.tabs.onUpdated.addListener(scanTabs);
