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
export type TodoReducerActionTypes = changeTodoFilterACTypes | addTodoACTypes | rmTodoACTypes | changeTodoTitleACTypes
export const TodoReducer = (state: TodoReducerStateTypes[] = initialState, action: TodoReducerActionTypes):TodoReducerStateTypes[] => {
    switch (action.type) {
        case "CHANGE-FILTER": {
            return state.map(todo => todo.id === action.payload.todoId ? {...todo,filter: action.payload.filter} : todo)
        }
        case "ADD-TODO": {
            return [...state,{id: action.payload.todoId, title: action.payload.title, filter: "all" }]
        }
        case "REMOVE-TODO": {
            return state.filter(todo => todo.id !== action.payload.todoId)
        }
        case "CHANGE-TODO-TITLE": {
            return state.map(todo => todo.id === action.payload.todoId
                ? {...todo,title: action.payload.title}
                : todo)
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
export type rmTodoACTypes = ReturnType<typeof rmTodoAC>
export const rmTodoAC = (todoId: string) => {
    return {type: "REMOVE-TODO", payload: {todoId}} as const
}
type changeTodoTitleACTypes = ReturnType<typeof changeTodoTitleAC>
export const changeTodoTitleAC = (todoId: string, title: string) => {
    return {type: "CHANGE-TODO-TITLE", payload: {todoId, title}} as const
}
