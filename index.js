"use strict";
const aggiungiPiatti = document.querySelector('.aggiungi-piatto');
const piatti = document.querySelector('.piatti');
const listaOrdini = JSON.parse(localStorage.getItem('ordini')) || [];
aggiungiPiatti.addEventListener('submit', aggiungiPiatto);
function aggiungiPiatto(event) {
    event.preventDefault();
    const nome = (this.querySelector('[name="piatto"]')).value;
    const piatto = {
        nome,
        portato: false
    };
    listaOrdini.push(piatto);
    popolaLista();
    localStorage.setItem('ordini', JSON.stringify(listaOrdini));
    this.reset();
}
function popolaLista() {
    piatti.innerHTML = listaOrdini.map((ordine, index) => {
        return `
			<li>
				<input type="checkbox" data-index="${index}" id="item${index}" ${ordine.portato ? 'checked' : ''} />
				<label for="item${index}">${ordine.nome}</label>
			</li>
		`;
    }).join('');
}
piatti.addEventListener('click', togglePortato);
function togglePortato(event) {
    const el = event.target;
    if (el.matches('input')) {
        const index = Number(el.dataset.index);
        listaOrdini[index].portato = !listaOrdini[index].portato;
        localStorage.setItem('ordini', JSON.stringify(listaOrdini));
        popolaLista();
    }
}
popolaLista();
