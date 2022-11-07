import {combineReducers, legacy_createStore as createStore} from 'redux';
import {TaskReducer} from "./Reducers/TaskReducer";
import {TodoReducer} from "./Reducers/TodoReducer";

const RootReducer = combineReducers({
    task: TaskReducer,
    todo: TodoReducer
})

export const Store = createStore(RootReducer)
export type RootReducerType = ReturnType<typeof RootReducer>