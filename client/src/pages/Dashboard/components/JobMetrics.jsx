import React from 'react';
import MetricCard from './MetricCard';

function JobMetrics({ data }) {
    if (!data) return null;

    return (
        <div className="dashboard-section">
            <h3 className="section-title">Job Metrics</h3>
            <div className="metrics-grid">
                <MetricCard icon="📊" label="Total Applications" value={data.total} accent="#8b5cf6" />
                <MetricCard icon="💼" label="Interviews" value={data.interviewing} accent="#f59e0b" />
                <MetricCard icon="🎉" label="Offers" value={data.offers} accent="#10b981" />
                <MetricCard icon="❌" label="Rejected" value={data.rejected} accent="#ef4444" />
                <MetricCard
                    icon="📈"
                    label="Response Rate"
                    value={`${data.responseRate}%`}
                    accent="#3b82f6"
                    sub={`${data.interviewing + data.offers + data.rejected} of ${data.total} responded`}
                />
            </div>
        </div>
    );
}

export default JobMetrics;
