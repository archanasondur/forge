import React, { useState, useEffect } from 'react';

function JobModal({ isOpen, onClose, onSaveJob, jobToEdit }) {
  // Simple state for form data
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    pay: '',
    dateApplied: new Date().toISOString().split('T')[0], // Today's date
    notes: ''
  });

  // Update form when editing a job
  useEffect(() => {
    if (jobToEdit) {
      setFormData({
        company: jobToEdit.company || '',
        role: jobToEdit.role || '',
        status: jobToEdit.status || 'Applied',
        pay: jobToEdit.salary_range || '',
        dateApplied: jobToEdit.applied_at || new Date().toISOString().split('T')[0],
        notes: jobToEdit.notes || ''
      });
    } else {
      // Reset form for new job
      setFormData({
        company: '',
        role: '',
        status: 'Applied',
        pay: '',
        dateApplied: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
  }, [jobToEdit]);

  // Simple function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Simple function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation - just check if company and role are filled
    if (!formData.company.trim() || !formData.role.trim()) {
      alert('Please fill in company name and role title');
      return;
    }

    // Call the parent function to save the job (add or update)
    onSaveJob(formData);
    
    // Reset form and close modal
    setFormData({
      company: '',
      role: '',
      status: 'Applied',
      pay: '',
      dateApplied: new Date().toISOString().split('T')[0],
      notes: ''
    });
    onClose();
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  const isEditing = !!jobToEdit;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{isEditing ? 'Edit Job' : 'Add New Job'}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="form-group">
            <label>Role Title *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter job title"
              required
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Wishlist">Wishlist</option>
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>

          <div className="form-group">
            <label>Pay/Salary</label>
            <input
              type="text"
              name="pay"
              value={formData.pay}
              onChange={handleChange}
              placeholder="e.g., $50,000 or $25/hour"
            />
          </div>

          <div className="form-group">
            <label>Date Applied</label>
            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes about this job..."
              rows="3"
            ></textarea>
          </div>

          <div className="form-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              {isEditing ? 'Update Job' : 'Save Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobModal;

