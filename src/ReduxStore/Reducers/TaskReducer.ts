import {v1} from "uuid";
import {addTodoACTypes} from "./TodoReducer";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TaskReducerStateTypes = {
    [key: string] : TaskType[]
}
const initialState:TaskReducerStateTypes = {
    ["test1"] : [
        {id: "1", title: "Test1", isDone: false},
        {id: "2", title: "Test2", isDone: true},
        {id: "3", title: "Test3", isDone: true}
    ],
    ["test2"] : [
        {id: "1", title: "1Test", isDone: false},
        {id: "2", title: "2Test", isDone: true},
        {id: "3", title: "3Test", isDone: true}
    ]
}
export type TaskReducerActionTypes = addTaskACTypes | rmTaskACTypes | changeTaskStatusACTypes | addTodoACTypes
export const TaskReducer = (state: TaskReducerStateTypes = initialState, action: TaskReducerActionTypes) => {
    switch (action.type) {
        case "ADD-TASK": {
            return {...state,
                [action.payload.todoId] :
                    [...state[action.payload.todoId],
                        {id: action.payload.taskId, title: action.payload.taskTitle, isDone: false}
                    ]}
        }
        case "REMOVE-TASK": {
            return {...state,
                [action.payload.todoId]:
                    state[action.payload.todoId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {...state,
                [action.payload.todoId]:
                    state[action.payload.todoId].map(todo => todo.id === action.payload.taskId ? {...todo,isDone: action.payload.isDone} : todo)
            }
        }
        case "ADD-TODO": {
            return {...state,
                [action.payload.todoId]: []
            }
        }
        default: return state;
    }
};
type addTaskACTypes = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoId: string, taskTitle: string) => {
    return {type: "ADD-TASK", payload: {todoId, taskTitle, taskId: v1()}} as const
}
type rmTaskACTypes = ReturnType<typeof rmTaskAC>
export const rmTaskAC = (todoId: string, taskId: string) => {
    return {type: "REMOVE-TASK", payload: {todoId, taskId}} as const
}
type changeTaskStatusACTypes = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean) => {
    return {type: "CHANGE-TASK-STATUS", payload: {todoId, taskId, isDone}} as const
}
