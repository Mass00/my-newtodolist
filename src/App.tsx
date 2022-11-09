import React, {useState} from 'react';
import './App.css';
import {Todo} from "./components/Todo/Todo";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./ReduxStore/RootStore";
import {addTodoAC, TodoReducerStateTypes} from "./ReduxStore/Reducers/TodoReducer";
import {AddItem} from "./components/addItem";

function App() {
    const todos:TodoReducerStateTypes[] = useSelector((state: RootReducerType) => state.todo)
    const todosId = todos.map(todo => todo.id)
    const dispatch = useDispatch()
    const onClickAddTodoHandler = (title:string) => {
            dispatch(addTodoAC(title))
    }
    return (
        <>
            <div className="Add">
                <AddItem addItem={(title:string) => onClickAddTodoHandler(title)}/>
            </div>
            <div className="App">
                {todosId.map((todoId => <Todo key={todoId} todoId={todoId}/>))}
            </div>

        </>
    );
}

export default App;
