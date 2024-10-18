import { reducer } from './reducer';
import { AppState, Observer } from '../types/store';
import storage, { PersistanceKeys } from '../utils/storage';

//El estado global, appState
export let emptyState: AppState = {
	tasks: []
};

export let appState = storage.get<AppState>({
	key: PersistanceKeys.STORE,
	defaultValue: emptyState,
  });

let observers: Observer[] = [];

const persistStore = (state: AppState) =>
	storage.set({ key: PersistanceKeys.STORE, value: state });

const notifyObservers = () => {
	observers.forEach((o) => o.render());
};

//Crear el dispatch
export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;

	persistStore(newState);
	notifyObservers()
};

//Agregar los observadores para los interesados, los suscritos
export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
