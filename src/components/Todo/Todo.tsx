import React, {useState} from 'react';
import st from './Todo.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../ReduxStore/RootStore";
import {addTaskAC, changeTaskStatusAC, rmTaskAC} from "../../ReduxStore/Reducers/TaskReducer";
import {changeTodoFilterAC, FilterType, TodoReducerStateTypes} from "../../ReduxStore/Reducers/TodoReducer";


type TodoPropsTypes = {
    todoId: string
}
export const Todo = (
    {todoId}: TodoPropsTypes
) => {
    const [inputTitle, setInputTitle] = useState<string>("")
    const todos:TodoReducerStateTypes[]  = useSelector((state: RootReducerType)=> state.todo)
    const {title, filter} = {...todos.find(todo => todo.id === todoId)}
    const tasks = useSelector((state: RootReducerType) => state.task[todoId])

    let filtredTasks = tasks
    if(filter === "active") filtredTasks = tasks.filter(task => !task.isDone)
    if(filter === "complete") filtredTasks = tasks.filter(task => task.isDone)

    const dispatch = useDispatch()
    const onKeyDownEnterHandler = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') dispatch(addTaskAC(todoId,inputTitle))
    }
    const onClickRmTaskHandler = (taskId: string) => {
        dispatch(rmTaskAC(todoId,taskId))
    }
    const onClickChangeFilterHandler = (filter: FilterType) => {
        dispatch(changeTodoFilterAC(todoId,filter))
    }
    const onClickChangeTaskStatusHandler = (isDone: boolean, taskId: string) => {
        dispatch(changeTaskStatusAC(todoId,taskId, isDone))
    }
    return (
        <div className={st.container}>
            <h2>{title}</h2>
            <input
                type={"text"}
                value={inputTitle}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputTitle(e.currentTarget.value)}
                onKeyDown={onKeyDownEnterHandler}
            />
            <ul className={st.list}>
                {filtredTasks?.map(task =>
                    <li key={task.id}>
                        <input
                            type={"checkbox"}
                            checked={task.isDone}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onClickChangeTaskStatusHandler(e.currentTarget.checked,task.id)}
                        />
                         {task.title}
                        <button onClick={()=>onClickRmTaskHandler(task.id)}>X</button></li>
                )}
            </ul>
            <div className={st.btngrp}>
                <button
                    style={{color: filter==="all" ? "red" : "black"}}
                    onClick={()=>onClickChangeFilterHandler("all")}
                >All</button>
                <button
                    style={{color: filter==="active" ? "red" : "black"}}
                    onClick={()=>onClickChangeFilterHandler("active")}
                >Active</button>
                <button
                    style={{color: filter==="complete" ? "red" : "black"}}
                    onClick={()=>onClickChangeFilterHandler("complete")}
                >Complete</button>
            </div>
        </div>
    );
};
