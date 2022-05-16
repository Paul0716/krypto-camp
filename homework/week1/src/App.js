import logo from './logo.svg';
import './App.css';
import { ToDoList } from './ui/todo-list/todo-list';
import { ToDoItem } from './ui/todo-item/todo-item';
import { useState, useEffect } from 'react';

export const App = () => {
  const [itemList, setItemList] = useState([]);
  const [showActionItem, setActionItem] = useState(false);

  const addItem = (value) => {
    itemList.push({
      selected: false,
      value
    }); 
    setItemList([...itemList]);
  }

  const selectedItem = (index) => {
    itemList[index].selected = !itemList[index].selected;
    setItemList([...itemList]);
  }

  const deleteItem = (index) => {
    itemList.splice(index, 1);
    setItemList([...itemList]);
  }
  
  // eslint-disable-next-line
  const getSelectedItem = () => {
    return itemList.filter(o => o.selected);
  };


  const deleteSelectedItem = () => {
    let newItmeList = itemList.reduce((acc, value) => {
      if (!value.selected) {
        acc.push(value);
      }
      return acc;
    }, []);
    setItemList([...newItmeList]);
  }

  useEffect(() => {
    const showActionItem = getSelectedItem().length > 0;
    setActionItem(showActionItem);
    return () => {};
  }, [getSelectedItem]);  


  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        
            <ToDoList addItem={addItem}>
              {
                itemList.map((item, index) => {
                  return <ToDoItem
                    key={index}
                    index={index}
                    item={item}
                    deleteItem={deleteItem}
                    selectedItem={selectedItem}>{item.value}</ToDoItem>
                })  
              }
            </ToDoList>
            {showActionItem && <p><button type="button" className="px-4 bg-orange-400 rounded-full"onClick={deleteSelectedItem}>Delete All</button></p>}
        <div className="py-4 footer">
          <p>
            <span>Total: {itemList.length}.</span>
            <span>Selected: {getSelectedItem().length}</span>
          </p>
          
        </div>

    </div>
  );
}

export default App;
