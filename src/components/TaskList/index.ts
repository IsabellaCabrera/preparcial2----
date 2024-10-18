// Importamos funciones y estados desde el store.
import { addObserver, appState } from "../../store/store"; // addObserver para observar cambios en el estado global, y appState para acceder al estado actual.
import TaskItem, { TaskItemProps } from "../TaskItem/index"; // Importamos el componente TaskItem y sus propiedades.
import "../TaskItem/index"; // Aseguramos que el TaskItem esté registrado como componente web.

class TaskList extends HTMLElement {
	// Definimos una lista de elementos TaskItem que contendrá las tareas.
	taskItems: TaskItem[] = []

	constructor() {
		super(); // Llamada al constructor de HTMLElement.
		this.attachShadow({ mode: 'open' }); // Adjuntamos el Shadow DOM para encapsular el componente.
		addObserver(this); // Registramos este componente como observador de los cambios en el estado global.

		// Recorremos las tareas en el estado global y creamos un TaskItem por cada una.
		appState.tasks.forEach((task) => {
			const { id, title, state } = task; // Desestructuramos las propiedades de la tarea (id, title, state).
			
			// Creamos un nuevo elemento personalizado 'task-item' para cada tarea.
			const taskItem = this.ownerDocument.createElement('task-item') as TaskItem;

			// Establecemos los atributos del TaskItem utilizando las propiedades de la tarea.
			taskItem.setAttribute(TaskItemProps.uid, id); // Asignamos el id de la tarea como atributo 'uid'.
			taskItem.setAttribute(TaskItemProps.tasktitle, title); // Asignamos el título de la tarea como atributo 'tasktitle'.
			taskItem.setAttribute(TaskItemProps.state, state); // Asignamos el estado de la tarea como atributo 'state' (true o false).

			// Añadimos el TaskItem creado a la lista de taskItems.
			this.taskItems.push(taskItem);
		});
	}

	// Se ejecuta cuando el componente se agrega al DOM.
	connectedCallback() {
		this.render(); // Llamamos al método render para construir el HTML del componente.
	}

	// Método encargado de renderizar los TaskItems en el Shadow DOM.
	render() {
		// Verificamos si el Shadow DOM está disponible.
		if (this.shadowRoot) {
			// Iteramos sobre la lista de TaskItems y los añadimos al Shadow DOM.
			this.taskItems.forEach((taskItem) => {
				this.shadowRoot?.appendChild(taskItem); // Añadimos cada TaskItem al DOM.
			});
		}
	}
}

// Registramos el componente personalizado 'task-list' para que pueda ser utilizado en HTML.
customElements.define('task-list', TaskList);
export default TaskList; // Exportamos la clase para su uso en otros módulos.
