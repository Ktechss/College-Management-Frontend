import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import axios from 'axios';
import '../../styles/UpdateStudents.css';
import apiConfig from '../../../../config/apiConfig';

function UpdateStudents() {
  const [searchRollNumber, setSearchRollNumber] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch departments on component load
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/api/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, []);

  // Search for a student by roll number
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${apiConfig.baseURL}/api/students/rollNumber/${searchRollNumber}`);
      setStudentDetails(response.data);
      setSelectedDepartment(response.data.department.departmentId); // Set the student's current department
      setError('');
    } catch (error) {
      setError('Student not found.');
      setStudentDetails(null);
    }
    setLoading(false);
  };

  // Handle form submission for updating the student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedStudent = {
        ...studentDetails,
        department: { departmentId: selectedDepartment },
      };
      await axios.put(`${apiConfig.baseURL}/api/students/${studentDetails.studentId}`, updatedStudent);
      alert('Student updated successfully');
    } catch (error) {
      alert('Failed to update student');
    }
    setLoading(false);
  };

  // Update student details as form inputs change
  const handleInputChange = (e) => {
    setStudentDetails({
      ...studentDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AdminLayout>
      <div className="update-student-container">
        <h2>Update Student</h2>
        {/* Search Section */}
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="rollNumber">Search by Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              value={searchRollNumber}
              onChange={(e) => setSearchRollNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit">Search</button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Update Section */}
        {studentDetails && (
          <form onSubmit={handleUpdateStudent}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                value={studentDetails.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={studentDetails.middleName || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={studentDetails.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={studentDetails.dateOfBirth.split('T')[0]}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="admissionDate">Admission Date</label>
              <input
                type="date"
                name="admissionDate"
                value={studentDetails.admissionDate.split('T')[0]}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={studentDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="guardianName">Guardian Name</label>
              <input
                type="text"
                name="guardianName"
                value={studentDetails.guardianName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="guardianContact">Guardian Contact</label>
              <input
                type="text"
                name="guardianContact"
                value={studentDetails.guardianContact}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                name="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.departmentId} value={department.departmentId}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Update Student</button>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}

export default UpdateStudents;
