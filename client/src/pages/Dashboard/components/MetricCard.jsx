import React from 'react';

/**
 * Reusable metric tile used across all Dashboard sections.
 * Props: icon, label, value, accent (CSS color), sub (optional subtext)
 */
function MetricCard({ icon, label, value, accent, sub }) {
    return (
        <div className="metric-card" style={{ '--accent': accent }}>
            <div className="metric-icon">{icon}</div>
            <div className="metric-body">
                <div className="metric-value">{value}</div>
                <div className="metric-label">{label}</div>
                {sub && <div className="metric-sub">{sub}</div>}
            </div>
        </div>
    );
}

export default MetricCard;
