// src/modules/admin/pages/CourseManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CourseManagement.css';
import AdminLayout from '../components/AdminLayout';
const CourseManagement = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <AdminLayout>
        <div className="course-management">
            <h2>Course Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Department</th>
                        <th>Credits</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.courseId}>
                            <td>{course.courseName}</td>
                            <td>{course.department?.departmentName}</td>
                            <td>{course.credits}</td>
                            <td>{course.courseDuration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AdminLayout>
    );
};

export default CourseManagement;
