// src/modules/admin/pages/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserManagement.css';
import AdminLayout from '../components/AdminLayout';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedAction, setSelectedAction] = useState("view-all");

    useEffect(() => {
        if (selectedAction === "view-all") {
            fetchUsers();
        }
    }, [selectedAction]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${userId}`);
            setUsers(users.filter(user => user.userId !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleActionChange = (event) => {
        setSelectedAction(event.target.value);
    };

    return (
        <AdminLayout>
            <div className="user-management">
                <h2>User Management</h2>
                
                {/* Dropdown Menu for selecting actions */}
                <div className="action-dropdown">
                    <label htmlFor="action-select">Choose Action: </label>
                    <select id="action-select" value={selectedAction} onChange={handleActionChange}>
                        <option value="view-all">View All Users</option>
                        {/* You can add more options here in the future */}
                    </select>
                </div>

                {selectedAction === "view-all" && (
                    <div className="user-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user.userId}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button onClick={() => deleteUser(user.userId)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default UserManagement;
