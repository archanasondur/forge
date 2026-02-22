import React from 'react';
import MetricCard from './MetricCard';

function PrepMetrics({ data }) {
    if (!data) return null;

    return (
        <div className="dashboard-section">
            <h3 className="section-title">Preparation</h3>
            <div className="metrics-grid">
                <MetricCard
                    icon="🧠"
                    label="Lab Progress"
                    value={`${data.progressPercent}%`}
                    accent="#8b5cf6"
                    sub={`${data.completedCount} of ${data.totalCount} topics`}
                />
                <MetricCard icon="✅" label="Topics Completed" value={data.completedCount} accent="#10b981" />
                <MetricCard icon="⚠️" label="Weakest Domain" value={data.weakestDomain || '—'} accent="#f59e0b" />
                <MetricCard icon="📖" label="Last Studied" value={data.lastStudiedTopic || '—'} accent="#3b82f6" />
            </div>
        </div>
    );
}

export default PrepMetrics;
