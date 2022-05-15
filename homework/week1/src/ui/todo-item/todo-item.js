import React from 'react';

export const ToDoItem = (props) => {

    const onChangeHandler = (ev) => {
        props.selectedItem(props.index);
    };

    const deleteItem = () => {
        props.deleteItem(props.index);
    }

    return <div className="flex flex-row justify-between mb-1 border-2 border-slate-50 p-1 border-bottom-0 last:border-bottom-2">
        <div className="w-8 mx-1 hover:bg-slate-300">
            <input
                type="checkbox"
                className="mx-2"
                name={`selected_${props.index}`}
                checked={props.item.selected}
                onChange={onChangeHandler}/>
        </div>
        <div className="flex-grow mx-1">{props.children}</div>
        <div className="w-8 mx-1 hover:bg-slate-300" onClick={deleteItem}><span className="text-sm">[X]</span></div>
    </div>
}