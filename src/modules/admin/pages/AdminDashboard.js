// src/modules/admin/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout'; // Import the AdminLayout component
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        students: 0,
        faculty: 0,
        courses: 0,
        enrollments: 0,
        feesCollected: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const studentsResponse = await axios.get('http://localhost:8080/api/students');
                const facultyResponse = await axios.get('http://localhost:8080/api/faculty');
                const coursesResponse = await axios.get('http://localhost:8080/api/courses');
                const enrollmentsResponse = await axios.get('http://localhost:8080/api/enrollments');
                const feeResponse = await axios.get('http://localhost:8080/api/students');

                setStats({
                    students: studentsResponse.data.length,
                    faculty: facultyResponse.data.length,
                    courses: coursesResponse.data.length,
                    enrollments: enrollmentsResponse.data.length,
                    feesCollected: feeResponse.data.reduce((total, fee) => total + fee.amount_paid, 0),
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <AdminLayout> {
            <div className="children">
                <h1>Admin Dashboard</h1>
                <div className="stats-container">
                    <div className="stat-card">
                        <h3>Students</h3>
                        <p>{stats.students}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Faculty</h3>
                        <p>{stats.faculty}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Courses</h3>
                        <p>{stats.courses}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Enrollments</h3>
                        <p>{stats.enrollments}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Fees Collected</h3>
                        <p>${stats.feesCollected}</p>
                    </div>
                </div>
            </div>
            }</AdminLayout>
    );
};

export default AdminDashboard;
