import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const addItem = () => {
    if (input.trim() === '') {
      setErrorMessage('Item cannot be empty!');
      return;
    }

    if (input.length > 1000) {
      setErrorMessage('Try string of less than 1000 characters!');
      return;
    }

    if (editIndex !== null) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[editIndex].text = input;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Add new item
      setItems([...items, { id: Date.now(), text: input }]);
    }
    setInput('');
    setErrorMessage('');
  };

  const editItem = (index) => {
    setInput(items[index].text);
    setEditIndex(index);
    setErrorMessage('');
  };

  const deleteItem = (index) => {
    if (editIndex !== null && editIndex === index) {
      setErrorMessage('Finish updating before deleting the item!');
      return;
    }

    // Delete the item
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setErrorMessage('');
  };

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter item..."
        />
        <button className="add-button" onClick={addItem}> {editIndex !== null ? 'Update' : 'Add'} </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {item.text}
            <div className="button-container">
              {editIndex !== index && <button className="update-button" onClick={() => editItem(index)}>Update</button>}
              <button className="delete-button" onClick={() => deleteItem(index)}> Delete </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;