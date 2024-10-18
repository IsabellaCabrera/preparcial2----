// Importamos las acciones para eliminar y cambiar el estado de una tarea.
import { removeTask, toggleTask } from "../../store/actions"; 
import { addObserver, dispatch } from "../../store/store"; // addObserver para manejar el estado global, y dispatch para despachar acciones.

// Enumeración que define las propiedades observadas (atributos) para el componente TaskItem.
export enum TaskItemProps {
	'uid' = 'uid',          // Identificador único de la tarea.
	'tasktitle' = 'tasktitle', // Título de la tarea.
	'state' = 'state',        // Estado de la tarea (completada o no).
}

// Definimos la clase TaskItem que extiende de HTMLElement para crear un componente personalizado.
class TaskItem extends HTMLElement {
	// Propiedades de la clase que representan los atributos del componente.
	uid?: number;
	tasktitle?: string;
	state?: boolean;

	constructor() {
		super(); // Llamada al constructor de HTMLElement.
		this.attachShadow({ mode: 'open' }); // Adjunta el Shadow DOM para encapsular el estilo y la estructura del componente.
		addObserver(this); // Se registra como observador para reaccionar a los cambios en el estado global.
	}

	// Especificamos qué atributos HTML serán observados para detectar cambios.
	static get observedAttributes() {
		const attrs: Record<TaskItemProps, null> = {
			uid: null,          // El ID de la tarea.
			tasktitle: null,    // El título de la tarea.
			state: null,        // El estado (completada o no) de la tarea.
		};
		return Object.keys(attrs); // Devuelve los nombres de las propiedades observadas.
	}

	// Se ejecuta cuando el componente se añade al DOM.
	connectedCallback() {
		this.render(); // Llama a la función render para construir la interfaz del componente.
	}

	// Se ejecuta cuando uno de los atributos observados cambia.
	attributeChangedCallback(propName: TaskItemProps, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case TaskItemProps.uid:
				// Convierte el valor del atributo 'uid' a número.
				this.uid = newValue ? Number(newValue) : undefined;
				break;

			case TaskItemProps.state:
				// Convierte el valor del atributo 'state' a booleano.
				this.state = newValue ? newValue === 'true' : undefined;
				break;

			default:
				// Para otros atributos, simplemente asigna el nuevo valor.
				this[propName] = newValue;
				break;
		}
		this.render(); // Vuelve a renderizar el componente cuando cambian los atributos.
	}

	// Método que renderiza la estructura HTML del componente.
	render() {
		// Inyecta el HTML en el Shadow DOM del componente.
		if (this.shadowRoot) this.shadowRoot.innerHTML = `
			<article>
				<h3>${this.tasktitle}</h3> 
				<!-- Muestra el título de la tarea -->
				<button class="delete-task">Delete</button> 
				<!-- Botón para eliminar la tarea -->
				<input type="checkbox" ${this.state ? 'checked' : ''} class="check-task"> 
				<!-- Checkbox para marcar si la tarea está completada o no -->
			</article>
		`;

		// Selecciona el botón de eliminar tarea dentro del Shadow DOM.
		const deleteButton = this.shadowRoot?.querySelector('.delete-task');
		// Selecciona el checkbox para marcar la tarea como completada o no.
		const checkButton = this.shadowRoot?.querySelector('.check-task');

		// Añade un listener para el evento de clic en el botón de eliminar.
		deleteButton?.addEventListener('click', () => {
			console.log("click", this.uid);
			// Despacha la acción removeTask con el uid de la tarea para eliminarla del estado global.
			dispatch(removeTask(this.uid!));
		});

		// Añade un listener para el evento de cambio en el checkbox (marcar/desmarcar la tarea).
		checkButton?.addEventListener('change', () => {
			// Despacha la acción toggleTask con el uid de la tarea para cambiar su estado (completada o no).
			dispatch(toggleTask(this.uid!));
		});
	}
}

// Definimos el elemento personalizado 'task-item' para que pueda ser utilizado en HTML.
customElements.define('task-item', TaskItem);
export default TaskItem; // Exportamos la clase para su uso en otros módulos.
