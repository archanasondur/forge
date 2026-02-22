import React from 'react';

function ActivityFeed({ data }) {
    if (!data) return null;

    const { upcomingInterview, weeklyApplications, suggestedTopic, studyStreak } = data;

    return (
        <div className="dashboard-section">
            <h3 className="section-title">Activity</h3>
            <div className="activity-grid">
                {/* Upcoming interview */}
                <div className="activity-card">
                    <span className="activity-icon">📅</span>
                    <div className="activity-body">
                        <div className="activity-label">Upcoming Interview</div>
                        <div className="activity-value">
                            {upcomingInterview
                                ? `${upcomingInterview.company} — ${upcomingInterview.role}`
                                : 'None scheduled'}
                        </div>
                        {upcomingInterview?.follow_up_date && (
                            <div className="activity-sub">
                                {new Date(upcomingInterview.follow_up_date).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                </div>

                {/* Suggested topic */}
                <div className="activity-card">
                    <span className="activity-icon">💡</span>
                    <div className="activity-body">
                        <div className="activity-label">Suggested Next Topic</div>
                        <div className="activity-value">
                            {suggestedTopic ? suggestedTopic.label : 'All done! 🎉'}
                        </div>
                        {suggestedTopic && (
                            <div className="activity-sub">{suggestedTopic.section}</div>
                        )}
                    </div>
                </div>

                {/* Weekly apps */}
                <div className="activity-card">
                    <span className="activity-icon">🚀</span>
                    <div className="activity-body">
                        <div className="activity-label">This Week</div>
                        <div className="activity-value">{weeklyApplications} applications</div>
                    </div>
                </div>

                {/* Study streak */}
                <div className="activity-card">
                    <span className="activity-icon">🔥</span>
                    <div className="activity-body">
                        <div className="activity-label">Study Streak</div>
                        <div className="activity-value">
                            {studyStreak} day{studyStreak !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActivityFeed;
