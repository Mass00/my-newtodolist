import React, {useState} from 'react';
import './App.css';
import {Todo} from "./components/Todo/Todo";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./ReduxStore/RootStore";
import {addTodoAC, TodoReducerStateTypes} from "./ReduxStore/Reducers/TodoReducer";

function App() {
    const [inputTitle, setInputTitle] = useState<string>("")
    const todos:TodoReducerStateTypes[] = useSelector((state: RootReducerType) => state.todo)
    const todosId = todos.map(todo => todo.id)
    const dispatch = useDispatch()
    const onClickAddTodoHandler = () => {
        dispatch(addTodoAC(inputTitle))
    }
    return (
        <>
            <div className="Add">
                <input
                    type={"text"}
                    value={inputTitle}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputTitle(e.currentTarget.value)}
                />
                <button
                    onClick={onClickAddTodoHandler}
                >+</button>
            </div>
            <div className="App">
                {todosId.map((todoId => <Todo key={todoId} todoId={todoId}/>))}
            </div>
        </>
    );
}

export default App;
