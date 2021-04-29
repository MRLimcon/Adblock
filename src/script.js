function hideAds() {
	//o script pega todos os scripts do site (blocked_js.js)
	let scripts = document.getElementsByTagName("script");

	//e analisa para ver se contém algo que vai lançar anuncios
	for (let i = 0; i < scripts.length; i++) {
		//criar lista de elementos de anuncio e colocar algoritmo aqui
		for (let k = 0; k < blocked_js.length; k++) {
			if (scripts[i].innerHTML.includes(blocked_js[k]) == true) {
				//excluindo todo o script e escondendo ele
				scripts[i].setAttribute("style", "display: none !important;");
				scripts[i].innerHTML = " ";
			}
		}
	}

	//também pega todos os divs (para analise) e todos os elementos
	// que tem nome de anuncio (blocked_cosmetic.js)
	let divs = document.getElementsByTagName("div");
	//criar lista de elementos com nome de anuncio e colocar algoritmo aqui
	for (let k = 0; k < blocked_adunit.length; k++) {
		let adunit = document.getElementsByTagName(blocked_adunit[k]);
		//os que tem nome de anuncio sao bloqueados
		for (let i = 0; i < adunit.length; i++) {
			adunit[i].setAttribute("style", "display: none !important;");
		}
	}

	//os anuncios sao analisados
	for (let i = 0; i < divs.length; i++) {
		let id = divs[i].getAttribute('id');
		let classes = divs[i].getAttribute('class');
		//se o id ou a classe do div estao nas listas de bloqueio, eles sao bloqueados
		if (blocked_ids.includes(id) == true || blocked_classes.includes(classes) == true) {
			divs[i].setAttribute("style", "display: none !important;");
		}
	}
}

hideAds();
