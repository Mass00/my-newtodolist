import React, {useCallback, useState} from 'react';
import './App.css';
import {Todo} from "./components/Todo/Todo";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./ReduxStore/RootStore";
import {addTodoAC, TodoReducerStateTypes} from "./ReduxStore/Reducers/TodoReducer";
import {AddItem} from "./components/addItem";

function App() {
    const todos = useSelector<RootReducerType,TodoReducerStateTypes[]>(state => state.todo)
    const tasks = useSelector((state: RootReducerType) => state.task)
    // const todosId = todos.map(todo => todo.id)
    const dispatch = useDispatch()
    const onClickAddTodoHandler = useCallback((title:string) => {
            dispatch(addTodoAC(title))
    },[dispatch])
    return (
        <>
            <div className="Add">
                <AddItem addItem={onClickAddTodoHandler}/>
            </div>
            <div className="App">
                {todos.map((todo => <Todo
                    key={todo.id}
                    todoId={todo.id}
                    title={todo.title}
                    filter={todo.filter}
                    tasks={tasks[todo.id]}
                />))}
            </div>

        </>
    );
}

export default App;
