import { Actions } from '../types/store'; // Importamos los tipos de acciones disponibles.
import { Task } from '../types/task'; // Importamos la definición del tipo Task, que representa la estructura de una tarea.

export const reducer = (currentAction: any, currentState: any) => {
	// Desestructuramos la acción y el payload (datos) de currentAction.
	const { action, payload } = currentAction;

	// Dependiendo del tipo de acción, modificamos el estado actual.
	switch (action) {
		// Caso: Agregar una tarea nueva.
		case Actions.ADD_TASK:
			return {
				...currentState, // Mantenemos el resto del estado igual.
				tasks: [...currentState.tasks, payload], // Añadimos la nueva tarea al arreglo de tareas.
			};

		// Caso: Eliminar una tarea.
		case Actions.REMOVE_TASK:
			return {
				...currentState, // Mantenemos el resto del estado igual.
				// Filtramos la lista de tareas para remover aquella cuyo id coincida con el payload.
				tasks: currentState.tasks.filter((task: Task) => task.id !== payload),
			};

		// Caso: Alternar el estado de una tarea (completada o no).
		case Actions.TOGGLE_TASK:
			return {
				...currentState, // Mantenemos el resto del estado igual.
				// Mapeamos sobre las tareas y cambiamos el estado de la tarea que coincide con el id del payload.
				tasks: currentState.tasks.map((task: Task) => {
					if (task.id === payload) {
						return {
							...task, // Mantenemos las demás propiedades de la tarea iguales.
							state: !task.state, // Invertimos el estado actual de la tarea.
						};
					}
					return task; // Si la tarea no coincide, la dejamos sin cambios.
				}),
			};

		// Si la acción no coincide con ningún caso, devolvemos el estado actual sin cambios.
		default:
			return currentState;
	}
};
