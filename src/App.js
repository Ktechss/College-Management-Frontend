import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AddCourse from './modules/admin/pages/CourseManagement/AddCourse';
import RemoveCourse from './modules/admin/pages/CourseManagement/RemoveCourse';
import UpdateCourse from './modules/admin/pages/CourseManagement/UpdateCourse';
import ViewCourse from './modules/admin/pages/CourseManagement/ViewCourse';
import AddStudents from './modules/admin/pages/StudentManagement/AddStudents';
import RemoveStudents from './modules/admin/pages/StudentManagement/RemoveStudents';
import UpdateStudents from './modules/admin/pages/StudentManagement/UpdateStudents';
import ViewStudents from './modules/admin/pages/StudentManagement/ViewStudents';
import AddUser from './modules/admin/pages/UserManagement/AddUser';
import RemoveUser from './modules/admin/pages/UserManagement/RemoveUser';
import UpdateUser from './modules/admin/pages/UserManagement/UpdateUser';
import ViewAllUsers from './modules/admin/pages/UserManagement/ViewAllUsers';
import AddFaculty from './modules/admin/pages/FacultyManagement/AddFaculty';
import ViewFaculty from './modules/admin/pages/FacultyManagement/ViewFaculty';
import RemoveFaculty from './modules/admin/pages/FacultyManagement/RemoveFaculty';
import UpdateFaculty from './modules/admin/pages/FacultyManagement/RemoveFaculty';
import AdminDashboard from './modules/admin/pages/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/course/view" element={<ViewCourse />} />
                <Route path="/admin/course/add" element={<AddCourse />} />
                <Route path="/admin/course/remove" element={<RemoveCourse />} />
                <Route path="/admin/course/update" element={<UpdateCourse />} />
                
                <Route path="/admin/student/view" element={<ViewStudents />} />
                <Route path="/admin/student/add" element={<AddStudents />} />
                <Route path="/admin/student/remove" element={<RemoveStudents />} />
                <Route path="/admin/student/update" element={<UpdateStudents />} />

                <Route path="/admin/user/view" element={<ViewAllUsers />} />
                <Route path="/admin/user/add" element={<AddUser />} />
                <Route path="/admin/user/remove" element={<RemoveUser />} />
                <Route path="/admin/user/update" element={<UpdateUser />} />

                <Route path="/admin/faculty/view" element={<ViewFaculty />} />
                <Route path="/admin/faculty/add" element={<AddFaculty />} />
                <Route path="/admin/faculty/remove" element={<RemoveFaculty />} />
                <Route path="/admin/faculty/update" element={<UpdateFaculty />} />
            </Routes>
        </Router>
    );
};

export default App;
