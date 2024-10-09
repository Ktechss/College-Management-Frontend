import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import '../../styles/AddStudents.css'; // Custom CSS for styling
import apiConfig from '../../../../config/apiConfig';
import ReviewConfirmation from '../../components/ReviewConfirmation';

function AddStudents() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState({
    departmentId: '',
    departmentName: ''
  });
  const [rollNumber, setRollNumber] = useState('');
  const [step, setStep] = useState('form'); // Manage steps between form and review
  const [studentDetails, setStudentDetails] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    admissionDate: '',
    address: '',
    guardianName: '',
    guardianContact: '',
    email: '',
    contactNumber: ''
  });

  const [labels] = useState({
    firstName: 'First Name',
    middleName: 'Middle Name',
    lastName: 'Last Name',
    dateOfBirth: 'Date of Birth',
    admissionDate: 'Admission Date',
    address: 'Address',
    guardianName: 'Guardian Name',
    guardianContact: 'Guardian Contact',
    email: 'Email',
    contactNumber: 'Contact Number',
    department: 'Department',
    rollNumber: 'Roll Number'
  });

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

  const handleDepartmentChange = async (e) => {
    const departmentId = e.target.value;
    const department = departments.find(dept => dept.departmentId === parseInt(departmentId));
    
    setSelectedDepartment({
      departmentId: department.departmentId,
      departmentName: department.departmentName,
    });

    try {
      const response = await axios.get(`${apiConfig.baseURL}/api/students/last-roll-number?departmentId=${departmentId}`);
      const lastRollNumber = response.data;
      const newRollNumber = generateNextRollNumber(lastRollNumber, department.departmentName);
      setRollNumber(newRollNumber);
    } catch (error) {
      console.error('Error generating roll number:', error);
    }
  };

  const generateNextRollNumber = (lastRollNumber, departmentName) => {
    const currentYear = new Date().getFullYear();
    const departmentPrefix = departmentName.substring(0, 3).toUpperCase();

    if (!lastRollNumber) {
      return `${departmentPrefix}${currentYear}0001`;
    }
    const numberPart = parseInt(lastRollNumber.slice(-4));
    const nextNumber = (numberPart + 1).toString().padStart(4, '0');
    return `${departmentPrefix}${currentYear}${nextNumber}`;
  };

  const handleEnrollStudent = async () => {
    try {
      const userPayload = {
        username: rollNumber,
        password: rollNumber,
        role: 'Student',
        email: studentDetails.email,
        contactNumber: studentDetails.contactNumber,
      };
      const userResponse = await axios.post(`${apiConfig.baseURL}/api/users`, userPayload);
      const userId = userResponse.data.userId;
  
      const studentPayload = {
        user: { userId },
        department: { departmentId: selectedDepartment.departmentId },
        rollNumber: rollNumber,
        ...studentDetails,
      };
      await axios.post(`${apiConfig.baseURL}/api/students`, studentPayload);
  
      alert('Student enrolled successfully');
  
      // Reset the form and go back to the initial form step
      setStudentDetails({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        admissionDate: '',
        address: '',
        guardianName: '',
        guardianContact: '',
        email: '',
        contactNumber: '',
      });
      setSelectedDepartment({
        departmentId: '',
        departmentName: ''
      });
      setRollNumber('');
      setStep('form'); // Go back to the form step
    } catch (error) {
      console.error('Error enrolling student:', error);
      alert('Failed to enroll student');
    }
  };
  

  const handleInputChange = (e) => {
    setStudentDetails({
      ...studentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep('review');
  };

  const handleGoBack = () => {
    setStep('form');
  };

  return (
    <AdminLayout>
      <div className="add-student-container">
        {step === 'form' && (
          <>
            <h2>Add New Student</h2>
            <form onSubmit={handleNextStep}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" value={studentDetails.firstName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <input type="text" name="middleName" value={studentDetails.middleName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" value={studentDetails.lastName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input type="date" name="dateOfBirth" value={studentDetails.dateOfBirth} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="admissionDate">Admission Date</label>
                <input type="date" name="admissionDate" value={studentDetails.admissionDate} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" name="address" value={studentDetails.address} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="guardianName">Guardian Name</label>
                <input type="text" name="guardianName" value={studentDetails.guardianName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="guardianContact">Guardian Contact</label>
                <input type="text" name="guardianContact" value={studentDetails.guardianContact} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={studentDetails.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input type="text" name="contactNumber" value={studentDetails.contactNumber} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select name="department" value={selectedDepartment.departmentId} onChange={handleDepartmentChange} required>
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.departmentId} value={department.departmentId}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="rollNumber">Roll Number</label>
                <input type="text" name="rollNumber" value={rollNumber} readOnly />
              </div>
              <button type="submit">Next</button>
            </form>
          </>
        )}

        {step === 'review' && (
          <ReviewConfirmation
            data={{ ...studentDetails, department: selectedDepartment.departmentName, rollNumber }}
            labels={labels}
            onConfirm={handleEnrollStudent}
            onCancel={handleGoBack}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default AddStudents;
