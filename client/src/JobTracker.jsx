// JobTracker.jsx
import React, { useState, useEffect, useMemo } from "react";
import JobModal from "./components/JobModal";
import "./JobTracker.css";

function JobTracker() {
  // Simple state management
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Simple function to fetch jobs from backend
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/jobs");
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Simple function to add a new job
  const handleAddJob = async (jobData) => {
    try {
      const response = await fetch("http://localhost:3001/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: jobData.company,
          role: jobData.role,
          status: jobData.status,
          notes: jobData.notes || "",
          applied_at: jobData.dateApplied || null,
          deadline: null,
          location: null,
          salary_range: jobData.pay || null,
          job_url: null,
          resume_url: null
        }),
      });

      if (response.ok) {
        // Refresh the jobs list
        fetchJobs();
      } else {
        alert("Failed to add job. Please try again.");
      }
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Error adding job. Please try again.");
    }
  };

  // Simple function to update an existing job
  const handleUpdateJob = async (jobData) => {
    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${jobToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: jobData.company,
          role: jobData.role,
          status: jobData.status,
          notes: jobData.notes || "",
          applied_at: jobData.dateApplied || null,
          deadline: null,
          location: null,
          salary_range: jobData.pay || null,
          job_url: null,
          resume_url: null
        }),
      });

      if (response.ok) {
        // Refresh the jobs list
        fetchJobs();
      } else {
        alert("Failed to update job. Please try again.");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Error updating job. Please try again.");
    }
  };

  // Simple function to handle both add and update
  const handleSaveJob = (jobData) => {
    if (jobToEdit) {
      handleUpdateJob(jobData);
    } else {
      handleAddJob(jobData);
    }
  };

  // Simple function to open modal for adding new job
  const openAddModal = () => {
    setJobToEdit(null);
    setShowModal(true);
  };

  // Simple function to open modal for editing job
  const openEditModal = (job) => {
    setJobToEdit(job);
    setShowModal(true);
  };

  // Simple function to close modal
  const closeModal = () => {
    setShowModal(false);
    setJobToEdit(null);
  };

  // Simple function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Simple function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied": return "status-applied";
      case "Interview": return "status-interview";
      case "Interview Scheduled": return "status-interview-scheduled";
      case "Offer": return "status-offer";
      case "Rejected": return "status-rejected";
      case "Accepted": return "status-accepted";
      case "Wishlist": return "status-wishlist";
      default: return "status-default";
    }
  };

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalApps = jobs.length;
    const interviews = jobs.filter(job =>
      job.status === "Interview" || job.status === "Interview Scheduled"
    ).length;
    const offers = jobs.filter(job =>
      job.status === "Offer" || job.status === "Accepted"
    ).length;
    const rejected = jobs.filter(job => job.status === "Rejected").length;
    const successRate = totalApps > 0 ? ((offers / totalApps) * 100).toFixed(1) : 0;

    // Calculate weekly trends
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeek = jobs.filter(job =>
      job.applied_at && new Date(job.applied_at) >= oneWeekAgo
    ).length;

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const lastWeek = jobs.filter(job => {
      if (!job.applied_at) return false;
      const appliedDate = new Date(job.applied_at);
      return appliedDate >= twoWeeksAgo && appliedDate < oneWeekAgo;
    }).length;

    const weeklyTrend = lastWeek > 0
      ? (((thisWeek - lastWeek) / lastWeek) * 100).toFixed(0)
      : thisWeek > 0 ? 100 : 0;

    return {
      totalApps,
      interviews,
      offers,
      rejected,
      successRate,
      thisWeek,
      weeklyTrend: parseInt(weeklyTrend)
    };
  }, [jobs]);

  return (
    <div className="job-tracker">
      <div className="job-tracker-header">
        <h2>Job Tracker</h2>
        <button className="add-job-button" onClick={openAddModal}>
          + Add Job
        </button>
      </div>

      {/* Statistics Dashboard */}
      {!loading && jobs.length > 0 && (
        <div className="statistics-section">
          <div className="stats-grid">
            <div className="stat-card stat-card-primary">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">{statistics.totalApps}</div>
                <div className="stat-label">Total Applications</div>
              </div>
            </div>

            <div className="stat-card stat-card-warning">
              <div className="stat-icon">💼</div>
              <div className="stat-content">
                <div className="stat-value">{statistics.interviews}</div>
                <div className="stat-label">Active Interviews</div>
              </div>
            </div>

            <div className="stat-card stat-card-success">
              <div className="stat-icon">🎉</div>
              <div className="stat-content">
                <div className="stat-value">{statistics.offers}</div>
                <div className="stat-label">Offers Received</div>
              </div>
            </div>

            <div className="stat-card stat-card-info">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <div className="stat-value">{statistics.successRate}%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Trends Section */}
          <div className="trends-section">
            <h3 className="trends-title">Recent Activity</h3>
            <div className="trends-grid">
              <div className="trend-card">
                <div className="trend-label">This Week</div>
                <div className="trend-value-container">
                  <span className="trend-value">{statistics.thisWeek}</span>
                  <span className="trend-label-small">applications</span>
                </div>
                {statistics.weeklyTrend !== 0 && (
                  <div className={`trend-indicator ${statistics.weeklyTrend > 0 ? 'trend-up' : 'trend-down'}`}>
                    <span className="trend-arrow">{statistics.weeklyTrend > 0 ? '↑' : '↓'}</span>
                    <span className="trend-percentage">{Math.abs(statistics.weeklyTrend)}%</span>
                  </div>
                )}
              </div>

              <div className="trend-card">
                <div className="trend-label">Response Rate</div>
                <div className="trend-value-container">
                  <span className="trend-value">
                    {statistics.totalApps > 0
                      ? ((statistics.interviews / statistics.totalApps) * 100).toFixed(0)
                      : 0}%
                  </span>
                </div>
                <div className="trend-subtext">
                  {statistics.interviews} of {statistics.totalApps} responded
                </div>
              </div>

              <div className="trend-card">
                <div className="trend-label">Rejection Rate</div>
                <div className="trend-value-container">
                  <span className="trend-value">
                    {statistics.totalApps > 0
                      ? ((statistics.rejected / statistics.totalApps) * 100).toFixed(0)
                      : 0}%
                  </span>
                </div>
                <div className="trend-subtext">
                  {statistics.rejected} rejections
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="no-jobs">
          <h3>No Jobs Yet</h3>
          <p>You haven't added any job applications yet.</p>
          <button className="add-first-job-button" onClick={openAddModal}>
            Add Your First Job
          </button>
        </div>
      ) : (
        <div className="jobs-table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Pay</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="company-cell">{job.company}</td>
                  <td className="role-cell">{job.role}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td>{formatDate(job.applied_at)}</td>
                  <td>{job.salary_range || "N/A"}</td>
                  <td className="notes-cell">
                    {job.notes ? (
                      <span title={job.notes}>
                        {job.notes.length > 50
                          ? job.notes.substring(0, 50) + "..."
                          : job.notes
                        }
                      </span>
                    ) : (
                      "No notes"
                    )}
                  </td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => openEditModal(job)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Job Modal component */}
      <JobModal
        isOpen={showModal}
        onClose={closeModal}
        onSaveJob={handleSaveJob}
        jobToEdit={jobToEdit}
      />
    </div>
  );
}

export default JobTracker;
