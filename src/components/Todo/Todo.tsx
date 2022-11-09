import React, {useState} from 'react';
import st from './Todo.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../ReduxStore/RootStore";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, rmTaskAC} from "../../ReduxStore/Reducers/TaskReducer";
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
}
type TodoReduceType = {
    title: string,
    filter: FilterType | string
}
export const Todo = (
    {todoId}: TodoPropsTypes
) => {
    const tasks = useSelector((state: RootReducerType) => state.task[todoId])
    const todos  = useSelector<RootReducerType,TodoReducerStateTypes[]>(state=> state.todo)

    const {title,filter} = {...todos.reduce<TodoReduceType>((acc,curr)=>{
        if(curr.id === todoId){
            acc = {title: curr.title, filter: curr.filter}
        }
        return acc
    },{title: "", filter: ""})}


    let filtredTasks = tasks
    if(filter === "active") filtredTasks = tasks.filter(task => !task.isDone)
    if(filter === "complete") filtredTasks = tasks.filter(task => task.isDone)

    const dispatch = useDispatch()
    const onClickAddTaskHandler = (title: string) => {
         dispatch(addTaskAC(todoId,title))
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
    const onClickRmTodoHandler = () => {
        dispatch(rmTodoAC(todoId))
    }
    const onClickEditTaskTitle = (taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todoId,taskId,title))
    }
    const onClickEditTodoTitle = (title: string) => {
        dispatch(changeTodoTitleAC(todoId, title))
    }
    return (
        <div className={st.container}>
            <h2><EditSpan title={title} editTitle={(title: string) => onClickEditTodoTitle(title)}/><button onClick={onClickRmTodoHandler}>X</button></h2>
            <AddItem addItem={(title:string)=> onClickAddTaskHandler(title)}/>
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
};
