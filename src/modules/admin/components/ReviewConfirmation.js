// components/ReviewConfirmation.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ReviewConfirmation.css'; // Add styling as needed

const ReviewConfirmation = ({ data, labels, onConfirm, onCancel }) => {
  return (
    <div className="review-confirm-container">
      <h2>Review Details</h2>
      <div className="review-details">
        {Object.keys(data).map((key) => (
          <p key={key}>
            <strong>{labels[key]}:</strong> {data[key] || ' '}
          </p>
        ))}
      </div>
      <div className="review-actions">
        <button className="confirm-btn" onClick={onConfirm}>
          Confirm and Submit
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

ReviewConfirmation.propTypes = {
  data: PropTypes.object.isRequired,
  labels: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ReviewConfirmation;
