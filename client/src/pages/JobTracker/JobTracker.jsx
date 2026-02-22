// JobTracker.jsx — Full CRUD management module
import React, { useState, useEffect, useMemo } from "react";
import JobModal from "./components/JobModal";
import KanbanView from "./components/KanbanView";
import { LayoutGrid, Table as TableIcon, Filter, ArrowUpDown } from "lucide-react";
import "./JobTracker.css";

const STATUS_OPTIONS = ['All', 'Wishlist', 'Applied', 'OA', 'Interview Scheduled', 'Interview', 'Offer', 'Accepted', 'Rejected'];

function JobTracker() {
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("table");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortField, setSortField] = useState("created_at");
    const [sortDir, setSortDir] = useState("desc");

    useEffect(() => { fetchJobs(); }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3001/api/jobs");
            if (response.ok) {
                const data = await response.json();
                setJobs(data.map(job => ({ ...job, id: job.id.toString() })));
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (jobId, newStatus) => {
        const previousJobs = [...jobs];
        setJobs(jobs.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
        try {
            const job = jobs.find(j => j.id === jobId);
            const response = await fetch(`http://localhost:3001/api/jobs/${jobId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...job, status: newStatus }),
            });
            if (!response.ok) throw new Error("Failed");
        } catch {
            setJobs(previousJobs);
        }
    };

    const handleSaveJob = async (jobData) => {
        try {
            const url = jobToEdit
                ? `http://localhost:3001/api/jobs/${jobToEdit.id}`
                : "http://localhost:3001/api/jobs";
            const method = jobToEdit ? "PUT" : "POST";

            const body = {
                company: jobData.company,
                role: jobData.role,
                status: jobData.status,
                notes: jobData.notes || "",
                applied_at: jobData.dateApplied || null,
                deadline: null,
                location: null,
                salary_range: jobData.pay || null,
                job_url: null,
                resume_url: null,
                resume_version: jobData.resumeVersion || null,
                follow_up_date: jobData.followUpDate || null,
            };

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                fetchJobs();
            } else {
                alert("Failed to save job.");
            }
        } catch (error) {
            console.error("Error saving job:", error);
            alert("Error saving job.");
        }
    };

    const openAddModal = () => { setJobToEdit(null); setShowModal(true); };
    const openEditModal = (job) => { setJobToEdit(job); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setJobToEdit(null); };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDir(d => d === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDir("asc");
        }
    };

    // Filtered + sorted jobs
    const processed = useMemo(() => {
        let list = statusFilter === "All" ? [...jobs] : jobs.filter(j => j.status === statusFilter);
        list.sort((a, b) => {
            let va = a[sortField] || "";
            let vb = b[sortField] || "";
            if (sortField === "applied_at" || sortField === "follow_up_date" || sortField === "created_at") {
                va = va ? new Date(va).getTime() : 0;
                vb = vb ? new Date(vb).getTime() : 0;
            } else {
                va = String(va).toLowerCase();
                vb = String(vb).toLowerCase();
            }
            if (va < vb) return sortDir === "asc" ? -1 : 1;
            if (va > vb) return sortDir === "asc" ? 1 : -1;
            return 0;
        });
        return list;
    }, [jobs, statusFilter, sortField, sortDir]);

    // Stage analytics
    const analytics = useMemo(() => {
        const total = jobs.length;
        if (total === 0) return null;
        const stages = STATUS_OPTIONS.slice(1).map(s => ({
            status: s,
            count: jobs.filter(j => j.status === s).length,
        }));
        const interviews = jobs.filter(j => ['Interview', 'Interview Scheduled'].includes(j.status)).length;
        const offers = jobs.filter(j => ['Offer', 'Accepted'].includes(j.status)).length;
        const conversionRate = total > 0 ? ((offers / total) * 100).toFixed(1) : 0;
        return { stages, conversionRate, total, interviews, offers };
    }, [jobs]);

    const SortHeader = ({ field, children }) => (
        <th onClick={() => handleSort(field)} style={{ cursor: "pointer" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {children}
                <ArrowUpDown size={12} style={{ opacity: sortField === field ? 1 : 0.3 }} />
            </span>
        </th>
    );

    return (
        <div className="job-tracker">
            <div className="job-tracker-header">
                <div className="header-left">
                    <h2>Job Tracker</h2>
                    <div className="view-toggle">
                        <button className={`toggle-btn ${view === 'table' ? 'active' : ''}`} onClick={() => setView('table')} title="Table View">
                            <TableIcon size={18} />
                        </button>
                        <button className={`toggle-btn ${view === 'kanban' ? 'active' : ''}`} onClick={() => setView('kanban')} title="Board View">
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                </div>
                <div className="header-right">
                    {/* Status filter */}
                    <div className="status-filter">
                        <Filter size={16} />
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <button className="add-job-button" onClick={openAddModal}>+ Add Job</button>
                </div>
            </div>

            {/* Stage analytics bar */}
            {!loading && analytics && (
                <div className="stage-analytics">
                    <div className="stage-bar">
                        {analytics.stages.filter(s => s.count > 0).map(s => (
                            <div
                                key={s.status}
                                className={`stage-segment status-${s.status.toLowerCase().replace(' ', '-')}-bg`}
                                style={{ flex: s.count }}
                                title={`${s.status}: ${s.count}`}
                            />
                        ))}
                    </div>
                    <div className="stage-legend">
                        <span>Conversion: <strong>{analytics.conversionRate}%</strong></span>
                        <span>{analytics.total} total · {analytics.interviews} interviewing · {analytics.offers} offers</span>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="loading">Loading jobs...</div>
            ) : jobs.length === 0 ? (
                <div className="no-jobs">
                    <h3>No Jobs Yet</h3>
                    <p>You haven't added any job applications yet.</p>
                    <button className="add-first-job-button" onClick={openAddModal}>Add Your First Job</button>
                </div>
            ) : (
                <div className="view-container">
                    {view === 'table' ? (
                        <div className="jobs-table-container">
                            <table className="jobs-table">
                                <thead>
                                    <tr>
                                        <SortHeader field="company">Company</SortHeader>
                                        <SortHeader field="role">Role</SortHeader>
                                        <th>Status</th>
                                        <SortHeader field="applied_at">Date Applied</SortHeader>
                                        <th>Pay</th>
                                        <th>Resume Ver.</th>
                                        <SortHeader field="follow_up_date">Follow-up</SortHeader>
                                        <th>Notes</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {processed.map((job) => (
                                        <tr key={job.id}>
                                            <td className="company-cell">{job.company}</td>
                                            <td className="role-cell">{job.role}</td>
                                            <td>
                                                <span className={`status-badge status-${(job.status || "default").toLowerCase().replace(" ", "-")}`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td>{job.applied_at ? new Date(job.applied_at).toLocaleDateString() : "N/A"}</td>
                                            <td>{job.salary_range || "N/A"}</td>
                                            <td>{job.resume_version || "—"}</td>
                                            <td>{job.follow_up_date ? new Date(job.follow_up_date).toLocaleDateString() : "—"}</td>
                                            <td className="notes-cell">
                                                {job.notes ? (
                                                    <span title={job.notes}>
                                                        {job.notes.length > 40 ? job.notes.substring(0, 40) + "..." : job.notes}
                                                    </span>
                                                ) : "—"}
                                            </td>
                                            <td>
                                                <button className="edit-button" onClick={() => openEditModal(job)}>Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <KanbanView jobs={processed} onStatusChange={handleStatusChange} />
                    )}
                </div>
            )}

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
