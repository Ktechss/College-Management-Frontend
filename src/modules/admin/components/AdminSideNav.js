// src/components/AdminSideNav.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/AdminSideNav.css'; // Custom CSS for styling

const AdminSideNav = () => {
    const [openMenus, setOpenMenus] = useState({
        userManagement: false,
        courseManagement: false,
        studentManagement: false,
    });

    const toggleMenu = (menu) => {
        setOpenMenus({
            ...openMenus,
            [menu]: !openMenus[menu]
        });
    };

    return (
        <nav className="admin-sidenav">
            <ul>
                <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>

                <li>
                    <button onClick={() => toggleMenu('userManagement')}>
                        User Management
                    </button>
                    {openMenus.userManagement && (
                        <ul>
                            <li><NavLink to="/admin/user/view">View All Users</NavLink></li>
                            <li><NavLink to="/admin/user/add">Add New User</NavLink></li>
                            <li><NavLink to="/admin/user/update">Update User</NavLink></li>
                            <li><NavLink to="/admin/user/remove">Remove User</NavLink></li>
                        </ul>
                    )}
                </li>

                <li>
                    <button onClick={() => toggleMenu('facultyManagement')}>
                        Faculty Management
                    </button>
                    {openMenus.facultyManagement && (
                        <ul>
                            <li><NavLink to="/admin/faculty/view">View Faculty</NavLink></li>
                            <li><NavLink to="/admin/faculty/add">Add New Faculty</NavLink></li>
                            <li><NavLink to="/admin/faculty/update">Update Faculty</NavLink></li>
                            <li><NavLink to="/admin/faculty/remove">Remove Faculty</NavLink></li>
                        </ul>
                    )}
                </li>

                <li>
                    <button onClick={() => toggleMenu('studentManagement')}>
                        Student Management
                    </button>
                    {openMenus.studentManagement && (
                        <ul>
                            <li><NavLink to="/admin/student/view">View All Students</NavLink></li>
                            <li><NavLink to="/admin/student/add">Add New Student</NavLink></li>
                            <li><NavLink to="/admin/student/update">Update Student</NavLink></li>
                            <li><NavLink to="/admin/student/remove">Remove Student</NavLink></li>
                        </ul>
                    )}
                </li>
                <li>
                    <button onClick={() => toggleMenu('courseManagement')}>
                        Course Management
                    </button>
                    {openMenus.courseManagement && (
                        <ul>
                            <li><NavLink to="/admin/course/view">View Courses</NavLink></li>
                            <li><NavLink to="/admin/course/add">Add New Course</NavLink></li>
                            <li><NavLink to="/admin/course/update">Update Course</NavLink></li>
                            <li><NavLink to="/admin/course/remove">Remove Course</NavLink></li>
                        </ul>
                    )}
                </li>

                <li><NavLink to="/admin/fee-management">Fee Management</NavLink></li>
                <li><NavLink to="/admin/reports">Reports</NavLink></li>
                <li><NavLink to="/admin/library-management">Library Management</NavLink></li>
            </ul>
        </nav>
    );
};

export default AdminSideNav;
