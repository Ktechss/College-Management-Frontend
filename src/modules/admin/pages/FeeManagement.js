// src/modules/admin/pages/FeeManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FeeManagement.css';
import AdminLayout from '../components/AdminLayout';

const FeeManagement = () => {
    const [fees, setFees] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch fee data
        const fetchFeeData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/fees'); // Replace with your actual API endpoint
                setFees(response.data);
            } catch (error) {
                console.error("Error fetching fee data:", error);
                setError('Failed to fetch fee data. Please try again.');
            }
        };

        fetchFeeData();
    }, []);

    const handleUpdateFeeStatus = async (feeId, status) => {
        try {
            await axios.put(`http://localhost:8080/api/fees/${feeId}`, { status });
            setFees(fees.map(fee => fee.feeId === feeId ? { ...fee, status } : fee));
        } catch (error) {
            console.error("Error updating fee status:", error);
            setError('Failed to update fee status.');
        }
    };

    return (
        <AdminLayout>
        <div className="fee-management">
            <h2>Fee Management</h2>
            {error && <div className="error-message">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Course</th>
                        <th>Amount Due</th>
                        <th>Amount Paid</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fees.map(fee => (
                        <tr key={fee.feeId}>
                            <td>{fee.student.firstName} {fee.student.lastName}</td>
                            <td>{fee.course.courseName}</td>
                            <td>${fee.amountDue}</td>
                            <td>${fee.amountPaid}</td>
                            <td>{new Date(fee.dueDate).toLocaleDateString()}</td>
                            <td>{fee.status}</td>
                            <td>
                                {fee.status !== 'Paid' && (
                                    <button onClick={() => handleUpdateFeeStatus(fee.feeId, 'Paid')}>Mark as Paid</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AdminLayout>
    );
};

export default FeeManagement;
