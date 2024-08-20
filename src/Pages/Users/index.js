import React, { useState } from 'react';
import "./index.css";
 

// Dummy data for users
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', contact: '123-456-7890', address: '123 Main St', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', contact: '987-654-3210', address: '456 Elm St', role: 'Customer' },
  // Add more users as needed
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '', contact: '', address: '', role: 'Customer' });
  const [editUser, setEditUser] = useState(null);

  // Function to add a new user
  const addUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', contact: '', address: '', role: 'Customer' });
  };

  // Function to handle editing a user
  const handleEdit = user => {
    setEditUser(user);
  };

  // Function to save edited user
  const saveUser = () => {
    setUsers(users.map(user => (user.id === editUser.id ? editUser : user)));
    setEditUser(null);
  };

  // Function to delete a user
  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Function to handle input change
  const handleInputChange = (e, key) => {
    if (editUser) {
      setEditUser({ ...editUser, [key]: e.target.value });
    } else {
      setNewUser({ ...newUser, [key]: e.target.value });
    }
  };

  return (
    <div className='user-container'>
      <h1>User Management</h1>

      {/* Add New User */}
      <div>
        <h2>Add New User</h2>
        <div className='user-input'>
        <input className='order-in'
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={e => handleInputChange(e, 'name')}
        />
        <input className='user-in'
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={e => handleInputChange(e, 'email')}
        />
        <input className='user-in'
          type="text"
          placeholder="Contact Number"
          value={newUser.contact}
          onChange={e => handleInputChange(e, 'contact')}
        />
        <input className='user-in'
          type="text"
          placeholder="Address"
          value={newUser.address}
          onChange={e => handleInputChange(e, 'address')}
        />
        </div>
        <select
          value={newUser.role}
          onChange={e => handleInputChange(e, 'role')}
        >
          <option value="Admin">Admin</option>
          <option value="Customer">Customer</option>
        </select>
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Edit User */}
      {editUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            value={editUser.name}
            onChange={e => handleInputChange(e, 'name')}
          />
          <input
            type="email"
            value={editUser.email}
            onChange={e => handleInputChange(e, 'email')}
          />
          <input
            type="text"
            value={editUser.contact}
            onChange={e => handleInputChange(e, 'contact')}
          />
          <input
            type="text"
            value={editUser.address}
            onChange={e => handleInputChange(e, 'address')}
          />
          <select
            value={editUser.role}
            onChange={e => handleInputChange(e, 'role')}
          >
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>
          <button onClick={saveUser}>Save</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
