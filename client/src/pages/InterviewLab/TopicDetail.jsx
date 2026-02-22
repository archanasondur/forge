import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../hooks/useApi';
import { topicContent } from './topicContent';
import './TopicDetail.css';

function TopicDetail() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const content = topicContent[topicId];

    const [topicData, setTopicData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStatus = async () => {
            try {
                const data = await api.get('/study-progress');
                const matched = data.find(t => t.topic_id === topicId);
                if (matched) {
                    setTopicData(matched);
                }
            } catch (err) {
                console.error("Failed to fetch topic status", err);
            } finally {
                setLoading(false);
            }
        };
        loadStatus();
    }, [topicId]);

    const handleToggleComplete = async () => {
        try {
            const updated = await api.put(`/study-progress/${topicId}`, {});
            setTopicData(updated);
        } catch (err) {
            console.error("Failed to toggle completion", err);
        }
    };

    if (!content) {
        return (
            <div className="topic-detail-container not-found">
                <h2>Topic Not Found</h2>
                <button onClick={() => navigate('/interview-lab')}>Return to Lab</button>
            </div>
        );
    }

    return (
        <div className="topic-detail-container fade-in">
            <header className="topic-header">
                <button className="back-btn" onClick={() => navigate('/interview-lab')}>← Back to Lab</button>
                <div className="header-content">
                    <h1>{content.title}</h1>
                    <div className="status-badge">
                        {topicData?.completed ? '✅ Completed' : '⏳ In Progress'}
                    </div>
                </div>
            </header>

            <div className="topic-content-grid">
                <section className="detail-card theory-card">
                    <h2>📖 Theory & Concepts</h2>
                    <p>{content.theory}</p>
                </section>

                <section className="detail-card questions-card">
                    <h2>❓ Common Interview Questions</h2>
                    <ul>
                        {content.questions.map((q, idx) => (
                            <li key={idx}>{q}</li>
                        ))}
                    </ul>
                </section>

                <section className="detail-card task-card">
                    <h2>💻 Mini Implementation Task</h2>
                    <p>{content.task}</p>
                </section>
            </div>

            <div className="topic-actions">
                <button
                    className={`mark-complete-btn ${topicData?.completed ? 'completed' : ''}`}
                    onClick={handleToggleComplete}
                    disabled={loading}
                >
                    {topicData?.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                </button>
            </div>
        </div>
    );
}

export default TopicDetail;
