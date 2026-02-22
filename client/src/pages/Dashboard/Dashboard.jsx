import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../hooks/useApi';
import JobMetrics from './components/JobMetrics';
import PrepMetrics from './components/PrepMetrics';
import ActivityFeed from './components/ActivityFeed';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const [jobMetrics, setJobMetrics] = useState(null);
    const [prepMetrics, setPrepMetrics] = useState(null);
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const [jm, pm, act] = await Promise.all([
                    api.get('/dashboard/job-metrics'),
                    api.get('/dashboard/prep-metrics'),
                    api.get('/dashboard/activity'),
                ]);
                setJobMetrics(jm);
                setPrepMetrics(pm);
                setActivity(act);
            } catch (err) {
                console.error('Dashboard load error:', err);
                setError('Could not load dashboard data. Is the server running?');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-header-text">
                    <h2>Dashboard</h2>
                    <p>Your command center — everything at a glance.</p>
                </div>
            </header>

            {loading && (
                <div className="dashboard-loading">
                    <div className="spinner" />
                    <p>Loading insights…</p>
                </div>
            )}

            {error && (
                <div className="dashboard-error">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="dashboard-grid">
                    <JobMetrics data={jobMetrics} />
                    <PrepMetrics data={prepMetrics} />
                    <ActivityFeed data={activity} />
                </div>
            )}

            {/* Quick-nav buttons */}
            {!loading && !error && (
                <div className="quick-nav">
                    <button className="quick-nav-btn" onClick={() => navigate('/job-tracker')}>
                        Go to Job Tracker →
                    </button>
                    <button className="quick-nav-btn quick-nav-btn--alt" onClick={() => navigate('/interview-lab')}>
                        Go to Interview Lab →
                    </button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
