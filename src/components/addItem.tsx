import React, {useCallback, useState} from 'react';
type AddItemPropsType = {
    addItem: (title: string) => void
}
export const AddItem = ({addItem}:AddItemPropsType) => {
    const [title,setTitle] = useState<string>("")
    const [error,setError] = useState<string>("")
    const onClickAddItemHandler = () => {
        if(title.trim()){
            addItem(title)
            error && setError("")
        } else {
            setError("Title is required")
        }
    }
    return (
        <div>
            <input
                style={{borderColor: error ? "red" : "black", outline: "none", borderStyle: "solid", borderWidth: "1px"}}
                type={"text"}
                value={title}
                onChange={useCallback((e:React.ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)},[])}
            />
            <button
                onClick={onClickAddItemHandler}
            >Add</button>
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
};
