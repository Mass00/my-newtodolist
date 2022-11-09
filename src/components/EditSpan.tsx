import React, {useState} from 'react';
type EditSpanPropsTypes = {
    title: string
    editTitle: (title: string) => void
}

export const EditSpan = ({title, editTitle}: EditSpanPropsTypes) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editSpanTitle, setEditSpanTitle] = useState<string>("")
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && editSpanTitle.trim()) {
            editTitle(editSpanTitle)
            setIsEdit(false)
        }
    }
    const onDoubleClickHandler = () => {
        setEditSpanTitle(title)
        setIsEdit(true)
    }
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => setEditSpanTitle(e.currentTarget.value)

    return isEdit
        ? <input type={"text"} value={editSpanTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
        : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
};