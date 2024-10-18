import { Actions } from '../types/store'; // Importamos un conjunto de tipos o constantes que representan las acciones disponibles.
import { Task } from '../types/task'; // Importamos la definición de un tipo Task, que representa la estructura de una tarea.

// Función que genera una acción para agregar una nueva tarea.
// Recibe como argumento un objeto `Task` que incluye detalles como el id, título, y estado de la tarea.
export const addTask = (payload: Task) => {
	return {
		action: Actions.ADD_TASK, // Tipo de acción: agregar tarea.
		payload, // El objeto tarea que se va a agregar.
	};
};

// Función que genera una acción para eliminar una tarea existente.
// Recibe como argumento el id (`number`) de la tarea que se desea eliminar.
export const removeTask = (payload: number) => {
	return {
		action: Actions.REMOVE_TASK, // Tipo de acción: eliminar tarea.
		payload, // El id de la tarea que se va a eliminar.
	};
};

// Función que genera una acción para alternar el estado de una tarea (completada o no completada).
// Recibe como argumento el id (`number`) de la tarea cuyo estado se desea alternar.
export const toggleTask = (payload: number) => {
	return {
		action: Actions.TOGGLE_TASK, // Tipo de acción: alternar el estado de la tarea.
		payload, // El id de la tarea cuyo estado será alternado.
	};
};
