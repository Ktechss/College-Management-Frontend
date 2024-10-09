import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import axios from 'axios';
import apiConfig from '../../../../config/apiConfig';
import '../../styles/RemoveStudents.css'; // Add styles for this component
import AuthenticationCard from '../../components/AuthenticationCard';

const RemoveStudents = () => {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAuthCard, setShowAuthCard] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Get the current logged-in user's password from local storage
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const loggedInUserPassword = loggedInUser.password;

  // Fetch all students and departments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get(`${apiConfig.baseURL}/api/students`);
        const departmentsResponse = await axios.get(`${apiConfig.baseURL}/api/departments`);

        setStudents(studentsResponse.data);
        setDepartments(departmentsResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching students or departments');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle showing authentication card for password verification
  const handleShowAuthCard = (student) => {
    setSelectedStudent(student);
    setShowAuthCard(true);
  };

  // Handle student and user deletion after password confirmation
  const handleConfirmRemove = async () => {
    try {
      const { studentId, user } = selectedStudent;
      // Delete the student first
      await axios.delete(`${apiConfig.baseURL}/api/students/${studentId}`);
      // Delete the associated user
      await axios.delete(`${apiConfig.baseURL}/api/users/${user.userId}`);

      // Update the UI by removing the deleted student from the list
      setStudents(students.filter((student) => student.studentId !== studentId));
      setSuccess('Student and associated user removed successfully.');
      setError('');
      setShowAuthCard(false); // Close authentication card after removal
    } catch (error) {
      setError('Error removing student or associated user.');
      setSuccess('');
      setShowAuthCard(false);
    }
  };

  const handleCancelRemove = () => {
    setShowAuthCard(false); // Close authentication card if removal is canceled
  };

  // Handle department change for sorting
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  // Handle search query change for filtering
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter and sort students based on selected department and search query
  const filteredStudents = students.filter(
    (student) =>
      (selectedDepartment === '' || student.department.departmentId === parseInt(selectedDepartment)) &&
      student.rollNumber.toLowerCase().includes(searchQuery)
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="remove-student">Loading...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="remove-student">{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="remove-student">
        <h2>Remove Students</h2>
        {success && <div className="success-message">{success}</div>}

        {/* Filter and Search Section */}
        <div className="filter-search-container">
          {/* Sort by Department */}
          <div className="filter-container">
            <label htmlFor="department-filter">Filter by Department: </label>
            <select id="department-filter" value={selectedDepartment} onChange={handleDepartmentChange}>
              <option value="">All Departments</option>
              {departments.map((department) => (
                <option key={department.departmentId} value={department.departmentId}>
                  {department.departmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Search by Roll Number */}
          <div className="search-container">
            <label htmlFor="search" id="Search-by-roll">Search by Roll Number: </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Enter roll number"
            />
          </div>
        </div>

        {/* Students Table */}
        {filteredStudents.length > 0 ? (
          <table className="student-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Roll Number</th>
                <th>Department</th>
                <th>Date of Birth</th>
                <th>Admission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.firstName}</td>
                  <td>{student.middleName || 'N/A'}</td>
                  <td>{student.lastName}</td>
                  <td>{student.user.email}</td> {/* User's email */}
                  <td>{student.user.contactNumber}</td> {/* User's phone */}
                  <td>{student.rollNumber}</td>
                  <td>{student.department.departmentName}</td> {/* Department name */}
                  <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                  <td>{new Date(student.admissionDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => handleShowAuthCard(student)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No students available to remove.</div>
        )}

        {/* Authentication Card for Password Confirmation */}
        {showAuthCard && (
          <AuthenticationCard
            loggedInUserPassword={loggedInUserPassword}
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
            confirmButtonText="Yes, Remove"
            confirmButtonColor="#d9534f" // Red color for remove button
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default RemoveStudents;
