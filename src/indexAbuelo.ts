import './components/indexPadre'
import { addObserver } from './store/store';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this)

	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `
		<task-form></task-form>
		<task-list></task-list>
		`;

	}
}


customElements.define('app-container', AppContainer);
