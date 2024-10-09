// src/pages/UserManagement/ViewAllUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import '../../styles/ViewAllUsers.css'; // Import the CSS
import apiConfig from '../../../../config/apiConfig';

const ViewAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filterRole, setFilterRole] = useState('All');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        // Fetch users from API
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${apiConfig.baseURL}/api/users`);
                setUsers(response.data);
                setFilteredUsers(response.data); // Set initial filtered users to all users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Filter users by role
    useEffect(() => {
        if (filterRole === 'All') {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(user => user.role === filterRole));
        }
    }, [filterRole, users]);

    return (
        <AdminLayout>
            <div className='user-management-container' id="children">
                <h2>View All Users</h2>

                {/* Filter Section */}
                <div className="filter-container">
                    <label htmlFor="role-filter">Filter by Role: </label>
                    <select
                        id="role-filter"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                {/* Table to display users */}
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.userId}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.contactNumber}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default ViewAllUsers;
