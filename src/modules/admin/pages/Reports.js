// src/modules/admin/pages/Reports.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Reports.css';
import AdminLayout from '../components/AdminLayout';

const Reports = () => {
    const [attendanceReport, setAttendanceReport] = useState([]);
    const [gradesReport, setGradesReport] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReportsData = async () => {
            try {
                // Fetch attendance data
                const attendanceResponse = await axios.get('http://localhost:8080/api/attendance');
                setAttendanceReport(attendanceResponse.data);

                // Fetch grades data
                const gradesResponse = await axios.get('http://localhost:8080/api/results');
                setGradesReport(gradesResponse.data);
            } catch (error) {
                console.error("Error fetching reports data:", error);
                setError('Failed to fetch reports data. Please try again.');
            }
        };

        fetchReportsData();
    }, []);

    return (
        <AdminLayout>
        <div className="reports">
            <h2>Reports</h2>
            {error && <div className="error-message">{error}</div>}

            <div className="report-section">
                <h3>Attendance Report</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Course</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceReport.map((record, index) => (
                            <tr key={index}>
                                <td>{record.student.firstName} {record.student.lastName}</td>
                                <td>{record.course.courseName}</td>
                                <td>{new Date(record.date).toLocaleDateString()}</td>
                                <td>{record.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="report-section">
                <h3>Grades Report</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Course</th>
                            <th>Exam</th>
                            <th>Marks Obtained</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gradesReport.map((record, index) => (
                            <tr key={index}>
                                <td>{record.student.firstName} {record.student.lastName}</td>
                                <td>{record.course.courseName}</td>
                                <td>{record.exam.examName}</td>
                                <td>{record.marksObtained}</td>
                                <td>{record.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </AdminLayout>
    );
};

export default Reports;
