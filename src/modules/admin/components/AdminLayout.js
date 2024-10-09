// src/modules/admin/components/AdminLayout.js
import React from 'react';
import AdminSideNav from './AdminSideNav'; // Import your AdminSideNav component
import '../styles/AdminLayout.css'; // Ensure the CSS path is correct
import '../styles/commonstyle.css'

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <AdminSideNav/>
            <div className="admin-content">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
