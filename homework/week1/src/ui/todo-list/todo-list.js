import React, { Fragment, useState } from 'react';
import styles from './todo-list.module.css';

export const ToDoList = (props) => {
    const [itemValue, setItemValue] = useState('');

    const onkeyDownHandler = (ev) => {
        if (ev.key === 'Enter' && ev.target.value) {
            props.addItem(ev.target.value);
            setItemValue('');
          }
    }

    const onChangeHandler = (ev) => {
        setItemValue(ev.target.value);
    }


    return <Fragment>
        <div className="text-3xl font-bold underline">ToDo List:</div>
        <div className="py-6 flex justify-between flex-col sp">
            <input type="text" name="add-item"
                className="w-full mb-2 text-slate-800"
                value={itemValue} onChange={onChangeHandler}
                onKeyDown={onkeyDownHandler} placeholder="add item..."/>
            {props.children}
        </div>
        
    </Fragment>
}