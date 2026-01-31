import React, { useState } from "react";
import axios from "axios";

const AddItem = ({ fetchItems }) => {
  const [item, setItem] = useState({
    userName: "",
    phoneNumber: "",
    itemName: "",
    description: "",
    type: "LOST"
  });

  const handleChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/api/items`, item);
    setItem({ userName: "", phoneNumber: "", itemName: "", description: "", type: "LOST" });
    fetchItems();
  };

  return (
    <div>
      <h2>Report Lost / Found Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="userName" placeholder="Your Name" value={item.userName} onChange={handleChange} required />
        <input name="phoneNumber" placeholder="Phone Number" value={item.phoneNumber} onChange={handleChange} required />
        <input name="itemName" placeholder="Item Name" value={item.itemName} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={item.description} onChange={handleChange} required />
        <select name="type" value={item.type} onChange={handleChange}>
          <option value="LOST">LOST</option>
          <option value="FOUND">FOUND</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddItem;
