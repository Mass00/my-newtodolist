import {v1} from "uuid";

export type FilterType = "all" | "active" | "complete"
export type TodoReducerStateTypes = {
    id: string
    title: string
    filter: FilterType
}
const initialState:TodoReducerStateTypes[] = [
    {id: "test1", title: "TEST1", filter: "all"},
    {id: "test2", title: "TEST2", filter: "complete"},
]
export type TodoReducerActionTypes = changeTodoFilterACTypes | addTodoACTypes
export const TodoReducer = (state: TodoReducerStateTypes[] = initialState, action: TodoReducerActionTypes) => {
    switch (action.type) {
        case "CHANGE-FILTER": {
            return state.map(todo => todo.id === action.payload.todoId ? {...todo,filter: action.payload.filter} : todo)
        }
        case "ADD-TODO": {
            const tempTodo = {id: action.payload.todoId, title: action.payload.title, filter: "all" }
            return [...state,tempTodo]
        }
        default: return state;
    }
};

type changeTodoFilterACTypes = ReturnType<typeof changeTodoFilterAC>
export const changeTodoFilterAC = (todoId: string, filter: FilterType) => {
    return {type: "CHANGE-FILTER", payload: {todoId, filter}} as const
}
export type addTodoACTypes = ReturnType<typeof addTodoAC>
export const addTodoAC = (title: string) => {
    return {type: "ADD-TODO", payload: {todoId: v1(), title}} as const
}
