interface Piatto {
	nome: string;
	portato: boolean;
}

const aggiungiPiatti = document.querySelector( '.aggiungi-piatto' ) as HTMLFormElement;
const piatti = document.querySelector( '.piatti' ) as HTMLElement;
const listaOrdini: Piatto[] = JSON.parse(localStorage.getItem('ordini')!) || [];

aggiungiPiatti.addEventListener( 'submit', aggiungiPiatto );

function aggiungiPiatto( this: any, event: Event ) {
	event.preventDefault();
	const nome = ( this.querySelector( '[name="piatto"]' ) ).value;
	const piatto = {
		nome,
		portato: false
	}
	listaOrdini.push( piatto );
	popolaLista();
	localStorage.setItem( 'ordini', JSON.stringify( listaOrdini ) );
	this.reset();
}

function popolaLista() {
	piatti.innerHTML = listaOrdini.map( ( ordine, index ) => {
		return `
			<li>
				<input type="checkbox" data-index="${ index }" id="item${ index }" ${ ordine.portato ? 'checked' : '' } />
				<label for="item${ index }">${ ordine.nome }</label>
			</li>
		`
	} ).join( '' )
}

piatti.addEventListener('click', togglePortato);

function togglePortato(event: MouseEvent) {
	const el = event.target! as HTMLLIElement

	if (el.matches('input')) {
		const index = Number(el.dataset.index!);
		listaOrdini[index].portato = !listaOrdini[index].portato;
		localStorage.setItem('ordini', JSON.stringify(listaOrdini));
		popolaLista();
	}
}


popolaLista();
