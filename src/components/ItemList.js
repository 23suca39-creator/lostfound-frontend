import React, { useState } from "react";
import axios from "axios";

const ItemList = ({ items, fetchItems }) => {
  const [editingItem, setEditingItem] = useState(null);

  const markReturned = async (id) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/items/${id}/return`);
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/items/${id}`);
    fetchItems();
  };

  const startEdit = (item) => {
    setEditingItem({ ...item });
  };

  const handleEditChange = (e) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/items/${editingItem.id}`, editingItem);
    setEditingItem(null);
    fetchItems();
  };

  const cancelEdit = () => setEditingItem(null);

  
  return (
    <div>
      <h2>All Items</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Item</th>
            <th>Description</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              {editingItem && editingItem.id === item.id ? (
                <>
                  <td><input name="userName" value={editingItem.userName} onChange={handleEditChange} /></td>
                  <td><input name="phoneNumber" value={editingItem.phoneNumber} onChange={handleEditChange} /></td>
                  <td><input name="itemName" value={editingItem.itemName} onChange={handleEditChange} /></td>
                  <td><input name="description" value={editingItem.description} onChange={handleEditChange} /></td>
                  <td>
                    <select name="type" value={editingItem.type} onChange={handleEditChange}>
                      <option value="LOST">LOST</option>
                      <option value="FOUND">FOUND</option>
                    </select>
                  </td>
                  <td>
                    <select name="status" value={editingItem.status} onChange={handleEditChange}>
                      <option value="NOT_RETURNED">NOT_RETURNED</option>
                      <option value="RETURNED">RETURNED</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.userName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.itemName}</td>
                  <td>{item.description}</td>
                  <td>{item.type}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={() => startEdit(item)}>Edit</button>
                    {item.status === "NOT_RETURNED" && <button onClick={() => markReturned(item.id)}>Mark Returned</button>}
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
