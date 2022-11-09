import React, {memo, useCallback, useMemo, useState} from 'react';
import st from './Todo.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../ReduxStore/RootStore";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    rmTaskAC,
    TaskReducerStateTypes, TaskType
} from "../../ReduxStore/Reducers/TaskReducer";
import {
    changeTodoFilterAC,
    changeTodoTitleAC,
    FilterType,
    rmTodoAC,
    TodoReducerStateTypes
} from "../../ReduxStore/Reducers/TodoReducer";
import {AddItem} from "../addItem";
import {EditSpan} from "../EditSpan";


type TodoPropsTypes = {
    todoId: string
    title: string
    filter: FilterType
    tasks:TaskType[]
}
type TodoReduceType = {
    title: string,
    filter: FilterType | string
}
export const Todo = memo((
    {todoId}: TodoPropsTypes
) => {
    console.log("Rerender Todo")
    const tasks = useSelector((state: RootReducerType) => state.task[todoId])
    const {title,filter}  = useSelector<RootReducerType,TodoReducerStateTypes>(state=> state.todo.filter(todo => todo.id === todoId)[0])



    let filtredTasks = tasks
    if(filter === "active") filtredTasks = tasks.filter(task => !task.isDone)
    if(filter === "complete") filtredTasks = tasks.filter(task => task.isDone)

    const dispatch = useDispatch()
    const onClickAddTaskHandler = useCallback((title: string) => {
         dispatch(addTaskAC(todoId,title))
    },[dispatch])
    const onClickRmTaskHandler = useCallback((taskId: string) => {
        dispatch(rmTaskAC(todoId,taskId))
    },[dispatch])
    const onClickChangeFilterHandler = useCallback((filter: FilterType) => {
        dispatch(changeTodoFilterAC(todoId,filter))
    },[dispatch])
    const onClickChangeTaskStatusHandler = useCallback((isDone: boolean, taskId: string) => {
        dispatch(changeTaskStatusAC(todoId,taskId, isDone))
    },[dispatch])
    const onClickRmTodoHandler = useCallback(() => {
        dispatch(rmTodoAC(todoId))
    },[dispatch])
    const onClickEditTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todoId,taskId,title))
    },[dispatch])
    const onClickEditTodoTitle = useCallback((title: string) => {
        dispatch(changeTodoTitleAC(todoId, title))
    },[dispatch])
    return (
        <div className={st.container}>
            <h2><EditSpan title={title} editTitle={(title: string) => onClickEditTodoTitle(title)}/><button onClick={onClickRmTodoHandler}>X</button></h2>
            <AddItem addItem={onClickAddTaskHandler}/>
            <ul className={st.list}>
                {filtredTasks?.map(task =>
                    <li key={task.id}>
                        <input
                            type={"checkbox"}
                            checked={task.isDone}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onClickChangeTaskStatusHandler(e.currentTarget.checked,task.id)}
                        />
                         <EditSpan title={task.title} editTitle={(title) => onClickEditTaskTitle(task.id, title)}/>
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
})
