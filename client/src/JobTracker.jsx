// JobTracker.jsx
import React, { useState, useEffect } from "react";
import "./JobTracker.css";

function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: '',
    notes: ''
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJobs([...jobs, formData]);
    setFormData({ company: "", role: "", status: "", notes: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10">
      <div className="w-full max-w-xl text-white">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">Job Tracker</h2>
  
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-lg shadow-lg">
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Status (Applied/Interviewing...)"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
  
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded">
            Add Job
          </button>
        </form>
  
        <div className="mt-6 space-y-4">
          {jobs.map((job, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-xl font-semibold text-purple-300">{job.company}</h3>
              <p><strong>Role:</strong> {job.role}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <p className="text-sm text-gray-400">{job.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  

}

export default JobTracker;
