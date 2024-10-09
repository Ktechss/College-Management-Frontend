import React from 'react';
import { Route } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';

const StudentRoutes = () => {
    return (
        <>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
        </>
    );
};

export default StudentRoutes;
