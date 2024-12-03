import { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ handleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (description) {
      const newItem = {
        id: Date.now(),
        description: description,
        quantity: quantity,
        packed: false,
      };
      handleAddItem(newItem);
      setDescription("");
      setQuantity(1);
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[...Array(11).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </label>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function Item({ item, togglePacked, updateQuantity, deleteItem }) {
  return (
    <div className="item">
      <label>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => togglePacked(item.id)}
        />
        <span
          style={{
            textDecoration: item.packed ? "line-through" : "none",
          }}
        >
          {item.quantity}x {item.description}
        </span>
      </label>
      <select
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
      >
        {[...Array(11).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </select>
      <button
        className="delete-button"
        onClick={() => deleteItem(item.id)}
        style={{ color: "white" }}
      >
        ❌
      </button>
    </div>
  );
}

function PackingList({ items, togglePacked, updateQuantity, deleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Item
              item={item}
              togglePacked={togglePacked}
              updateQuantity={updateQuantity}
              deleteItem={deleteItem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  // Calculate the total number of items
  const totalItems = items.length;

  // Calculate the number of packed items
  const packedItems = items.filter((item) => item.packed).length;

  // Calculate the percentage of packed items
  const percentagePacked =
    totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100 ? "You got everything!" : `You have ${totalItems} items in the list. You already packed ${packedItems} (${percentagePacked}%).`}
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([
    { id: 1, description: "Shirt", quantity: 5, packed: false },
    { id: 2, description: "Pants", quantity: 2, packed: true },
  ]);

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function togglePacked(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function updateQuantity(id, quantity) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  }

  function deleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        togglePacked={togglePacked}
        updateQuantity={updateQuantity}
        deleteItem={deleteItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;