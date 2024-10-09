import React, { useState } from 'react';
import '../styles/AuthenticationCard.css'

const AuthenticationCard = ({ loggedInUserPassword, onConfirm, onCancel, confirmButtonText, confirmButtonColor }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirm = () => {
        if (password === loggedInUserPassword) {
            onConfirm();
        } else {
            setError('Incorrect password');
        }
    };

    return (
        <div className="auth-card-overlay">
            <div className="auth-card">
                <h3>Authentication Required</h3>
                <p>Enter your password to confirm the operation.</p>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="auth-input"
                />

                {error && <p className="auth-error">{error}</p>}

                <div className="auth-actions">
                    <button
                        className="auth-btn auth-confirm"
                        onClick={handleConfirm}
                        style={{ backgroundColor: confirmButtonColor }} // Apply dynamic color
                    >
                        {confirmButtonText || "Yes, Confirm"}
                    </button>
                    <button className="auth-btn auth-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationCard;
