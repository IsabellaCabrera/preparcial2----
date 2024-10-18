// Importamos acciones y funcionalidades de otros módulos relacionados con la gestión de tareas y el estado de la aplicación.
import { addTask } from "../../store/actions"; // Acción para añadir una tarea
import { addObserver, appState, dispatch } from "../../store/store"; // Funciones para manejar el estado global y despacho de acciones
import { Task } from "../../types/task"; // Tipos para definir el modelo de datos de una tarea

// Creamos una clase que extiende de HTMLElement para definir un nuevo componente personalizado llamado "TaskForm".
class TaskForm extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de HTMLElement
        this.attachShadow({ mode: 'open' }); // Adjunta el Shadow DOM, lo que encapsula el estilo y estructura del componente.
        addObserver(this); // Se registra este componente como observador para actualizarse si el estado global cambia.
    }

    // Se ejecuta cuando el componente se agrega al DOM.
    connectedCallback() {
        this.render(); // Llama a la función render para construir la interfaz del componente.
    }

    // Esta función se encarga de generar el HTML que se mostrará dentro del componente.
    render() {
        // Si el shadowRoot está disponible, inyecta el HTML dentro de él.
        if (this.shadowRoot) this.shadowRoot.innerHTML = `
        <h2>PreParcial 2</h2>
        <form class="task-form">
            <input type="text" id="text-input" placeholder="Nombre de tarea" required /> 
            <!-- Campo de entrada para que el usuario escriba el nombre de la tarea -->
            <button type="submit" id="add-btn">Agregar</button> 
            <!-- Botón para enviar el formulario y agregar una nueva tarea -->
        </form>
        `;

        // Seleccionamos el formulario dentro del Shadow DOM y añadimos un listener al evento "submit".
        const formElement = this.shadowRoot?.querySelector('.task-form');
        formElement?.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevenimos que la página se recargue al enviar el formulario.

            // Obtenemos el valor ingresado por el usuario en el campo de texto.
            const inputValue = this.shadowRoot?.querySelector("#text-input") as HTMLInputElement;

            // Creamos un nuevo objeto de tarea con un ID único basado en la fecha actual, el título (nombre de tarea) y el estado inicial (sin completar).
            const newTask: Task = {
                id: new Date().getTime(), // Genera un ID único basado en el tiempo actual.
                title: inputValue.value, // Toma el valor del input como el título de la tarea.
                state: false // El estado inicial de la tarea es "incompleto".
            };

            // Usamos el dispatch para despachar la acción addTask, que enviará la nueva tarea al store global.
            dispatch(addTask(newTask));            
        });
    }
}

// Definimos el elemento personalizado 'task-form' para que pueda ser usado en HTML.
customElements.define('task-form', TaskForm);
export default TaskForm; // Exportamos la clase para que pueda ser utilizada en otros módulos.
