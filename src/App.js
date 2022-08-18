import React, { useState } from "react";
import "./App.css";
//State hook -'useState'

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");
  //Helper function
  function addItem() {
    if (!newItem) {
      alert("Enter an item.");
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  }
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }
  /* Edit an item text after creating it. */
  function editItem(id, newText) {
    // Get the current item
    const currentItem = items.filter((item) => item.id === id);

    // Create a new item with same id
    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    // Replace item in the item list
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  return (
    <div className="App">
      {/* 1.Header */}
      <h1> Todo List App</h1>

      {/* 2.İnput(input and button) */}
      <input
        type="text"
        placeholder="Add an item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      ></input>
      <button onClick={() => addItem()}>Add</button>
      {/* 3.List of ıtems (unordered list with list ıtem) */}
      <ul>
        {items.map((item) => {
          return (
            <div>
              <li key={item.id} onClick={() => setShowEdit(item.id)}>
                {item.value}{" "}
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  <img src="https://img.icons8.com/external-anggara-filled-outline-anggara-putra/20/000000/external-delete-ui-basic-anggara-filled-outline-anggara-putra.png" />
                </button>
              </li>
              {showEdit == item.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button onClick={() => editItem(item.id, updatedText)}>
                    <img src="https://img.icons8.com/external-soft-fill-juicy-fish/20/000000/external-edit-folders-soft-fill-soft-fill-juicy-fish.png" />
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
