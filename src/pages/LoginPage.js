import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css'; // Make sure this path matches your CSS file location
import apiConfig from '../config/apiConfig';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleLogin = async () => {
        try {
            const response = await axios.get(`${apiConfig.baseURL}/api/users/username/${email}`);
            
            if (response.data && response.data.password === password) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setSuccess(true);
                setError('');
                const role = response.data.role;
                switch (role) {
                    case 'Student':
                        navigate('/admin/student/view');
                        break;
                    case 'Admin':
                        navigate('/admin/dashboard');
                        break;
                    default:
                        navigate('/');
                        break;
                }
                
            } else {
                setError('Invalid email or password');
                setSuccess(false);
            }
        } catch (err) {
            setError('Invalid email or password');
            setSuccess(false);
        }
    };

    return (
        <div className="main">
            <div className="Login_div" id="credentials">
                <div className="Login_Credential_div">
                    <div className="login_logo"></div>
                    <h2>Welcome Back</h2>
                    <p>Get access to your profile<br/>and have full transparency and control over your data</p>
                    <br/>
                    <p>Email</p>
                    <input 
                        className="Login_Credential" 
                        type="text" 
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br/>
                    <p>Password</p>
                    <input 
                        className="Login_Credential" 
                        type="password" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="checkbox_container">
                        <input type="checkbox" id="remember_me"/>
                        <label htmlFor="remember_me">Remember me</label>
                    </div>
                    <br/>
                    <input 
                        className="Login_Credential" 
                        id="Login_button" 
                        type="button" 
                        value="Login" 
                        onClick={handleLogin}
                    />
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">Login successful!</div>}
                </div>
            </div>
            <div className="Login_div" id="image"></div>
        </div>
    );
};

export default LoginPage;
