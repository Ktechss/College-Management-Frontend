import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import axios from 'axios';
import apiConfig from '../../../../config/apiConfig';
import '../../styles/ViewStudents.css'; // Custom CSS for styling
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import AuthenticationCard from '../../components/AuthenticationCard'; // Import the AuthenticationCard


const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAuthCard, setShowAuthCard] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const loggedInUserPassword = loggedInUser.password;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get(`${apiConfig.baseURL}/api/students`);
        const departmentsResponse = await axios.get(`${apiConfig.baseURL}/api/departments`);

        const studentsWithDepartments = await Promise.all(
          studentsResponse.data.map(async (student) => {
            const departmentResponse = await axios.get(
              `${apiConfig.baseURL}/api/departments/${student.department.departmentId}`
            );
            return {
              ...student,
              departmentName: departmentResponse.data.departmentName,
              email: student.user.email,
              contactNumber: student.user.contactNumber,
            };
          })
        );

        setStudents(studentsWithDepartments);
        setDepartments(departmentsResponse.data); // Set department list
        setLoading(false);
      } catch (error) {
        setError('Error fetching students or departments');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredStudents = students.filter(
    (student) =>
      (selectedDepartment === '' || student.department.departmentId === parseInt(selectedDepartment)) &&
      student.rollNumber.toLowerCase().includes(searchQuery)
  );

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredStudents.map((student) => ({
        'First Name': student.firstName,
        'Middle Name': student.middleName || 'N/A',
        'Last Name': student.lastName,
        'Roll Number': student.rollNumber,
        Department: student.departmentName,
        'Date of Birth': new Date(student.dateOfBirth).toLocaleDateString(),
        'Admission Date': new Date(student.admissionDate).toLocaleDateString(),
        Email: student.email,
        'Contact Number': student.contactNumber,
        Address: student.address,
        'Guardian Name': student.guardianName,
        'Guardian Contact': student.guardianContact,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'students.xlsx');
  };

  const handleShowAuthCard = () => {
    setShowAuthCard(true);
  };

  const handleConfirmDownload = () => {
    setShowAuthCard(false);
    downloadExcel();
  };

  const handleCancelDownload = () => {
    setShowAuthCard(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="children">Loading...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="children">{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="children">
        <h2>View Students</h2>

        {/* Filter and Search Section */}
        <div className="filter-search-container">
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

          <div className="search-container">
            <label htmlFor="search"id="Search-by-roll">Search by Roll Number: </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Enter roll number"
            />
          </div>

          <button className="download-excel-btn" onClick={handleShowAuthCard}>
            Export Data
          </button>
        </div>

        {/* Students Table */}
        {/* Students Table */}
<div className="table-container">
  <table className="student-table">
    <thead>
      <tr>
        <th>Roll Number</th>
        <th>First Name</th>
        <th>Middle Name</th>
        <th>Last Name</th>
        <th>Department</th>
        <th>Date of Birth</th>
        <th>Admission Date</th>
        <th>Email</th>
        <th>Contact Number</th>
        <th>Address</th>
        <th>Guardian Name</th>
        <th>Guardian Contact</th>
      </tr>
    </thead>
    <tbody>
      {filteredStudents.map((student) => (
        <tr key={student.studentId}>
          <td>{student.rollNumber}</td>
          <td>{student.firstName}</td>
          <td>{student.middleName || 'N/A'}</td>
          <td>{student.lastName}</td>
          <td>{student.departmentName}</td>
          <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
          <td>{new Date(student.admissionDate).toLocaleDateString()}</td>
          <td>{student.email}</td>
          <td>{student.contactNumber}</td>
          <td>{student.address}</td>
          <td>{student.guardianName}</td>
          <td>{student.guardianContact}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      {/* Authentication Card for Password Confirmation */}
      {showAuthCard && (
        <AuthenticationCard
          loggedInUserPassword={loggedInUserPassword}
          onConfirm={handleConfirmDownload}
          onCancel={handleCancelDownload}
          confirmButtonText="Yes, Download"
          confirmButtonColor="#007bff" // Pass your desired button color
        />
      )}
    </AdminLayout>
  );
};

export default ViewStudents;
