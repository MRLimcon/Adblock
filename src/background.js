var enabled = true;

//cada request é analizado e adicionado um listener
chrome.webRequest.onBeforeRequest.addListener(
	//rodando a função
	function(details) {
		//é pego o dominio e a url para checar o dominio (blocked_domains.js)
		// e para bloquear parte do site (blocked_parts.js)
		var domain = details.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
		var part_check = details.url
		
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
		
		//checagem de se a url da request é a mesma da aba, para bloquear os cookies de terceiros
		chrome.tabs.query({currentWindow: true}, tabs => {
			let url = tabs[0].url;
			if (url.includes(domain) == true) {
				chrome.contentSettings.cookies.set({
				primaryPattern: domain,
				secondaryPattern: domain,
				setting: 'block'
				})
			}
			else {
				chrome.contentSettings.cookies.set({
				primaryPattern: domain,
				secondaryPattern: domain,
				setting: 'allow'
				})
			}
		});

	
	},
	{urls: ["<all_urls>"]},
	["blocking"]
);

/* caso o html esteja pronto pra rodar, é colocado um listener para rodar um script
de conteúdo para checar o html*/
chrome.webNavigation.onCommitted.addListener(function (tab) {
	//colocar sendmessage aqui
	chrome.tabs.executeScript(tab.ib, {
		file: 'script.js'
	});
});
