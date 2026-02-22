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
    const [notes, setNotes] = useState('');

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

        // Load local notes
        const savedNotes = localStorage.getItem(`forge_notes_${topicId}`);
        if (savedNotes) setNotes(savedNotes);

        loadStatus();
    }, [topicId]);

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
        localStorage.setItem(`forge_notes_${topicId}`, e.target.value);
    };

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
                    <div className={`status-badge ${topicData?.completed ? 'completed' : ''}`}>
                        {topicData?.completed ? '✅ Completed' : '⏳ In Progress'}
                    </div>
                </div>
            </header>

            <div className="topic-content-grid">
                {/* Left Column */}
                <div className="main-content-column">
                    {content.patternSnapshot ? (
                        <>
                            <section className="detail-card pattern-card">
                                <h2>🎯 Pattern Snapshot</h2>
                                <p>{content.patternSnapshot}</p>
                            </section>

                            <section className="detail-card why-pattern-card">
                                <h2>💡 Why this pattern?</h2>
                                <ul>
                                    {content.whyPattern?.map((bullet, idx) => (
                                        <li key={idx}>{bullet}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="detail-card variations-card">
                                <h2>🔄 Typical Variations</h2>
                                <ul className="variation-list">
                                    {content.typicalVariations?.map((variant, idx) => (
                                        <li key={idx} className="variant-item">
                                            {variant}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="detail-card practice-card">
                                <h2>🏋️ Suggested LeetCode Problems</h2>
                                <ul className="practice-list">
                                    {content.externalProblems?.map((prob, idx) => (
                                        <li key={idx} className="external-prob-item">
                                            <div className="prob-header">
                                                <a href={prob.url} target="_blank" rel="noopener noreferrer" className="prob-link" aria-label={`Open ${prob.name} on LeetCode`}>
                                                    {prob.name} <span className="external-icon">↗</span>
                                                </a>
                                                <span className={`diff-badge diff-${prob.difficulty.toLowerCase()}`}>
                                                    {prob.difficulty}
                                                </span>
                                            </div>
                                            <p className="prob-note">{prob.note}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </>
                    ) : (
                        <>
                            <section className="detail-card theory-card">
                                <h2>📖 5-Minute Theory Summary</h2>
                                <p>{content.theory}</p>
                            </section>

                            <section className="detail-card bullets-card">
                                <h2>🔑 Key Takeaways</h2>
                                <ul>
                                    {content.keyBullets?.map((bullet, idx) => (
                                        <li key={idx}>{bullet}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="detail-card questions-card">
                                <h2>❓ Common Interview Questions</h2>
                                <ul>
                                    {content.questions?.map((q, idx) => (
                                        <li key={idx}>{q}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="detail-card task-card">
                                <h2>💻 Mini Implementation Task</h2>
                                <p className="task-text">{content.task}</p>
                            </section>
                        </>
                    )}

                    <section className="detail-card notes-card">
                        <h2>📝 Personal Notes</h2>
                        <textarea
                            value={notes}
                            onChange={handleNotesChange}
                            placeholder="Jot down formulas, ideas, or constraints here..."
                        />
                    </section>
                </div>

                {/* Right Column */}
                <div className="side-content-column">
                    <section className="detail-card complexity-card">
                        <h2>⏱ Complexity Snapshot</h2>
                        <div className="complexity-item" aria-label="Time Complexity">
                            <span className="complexity-label">Time:</span>
                            <span className="complexity-val">{content.complexity?.time || '—'}</span>
                        </div>
                        <div className="complexity-item" aria-label="Space Complexity">
                            <span className="complexity-label">Space:</span>
                            <span className="complexity-val">{content.complexity?.space || '—'}</span>
                        </div>
                    </section>

                    <section className="detail-card pitfalls-card">
                        <h2>⚠️ Common Pitfalls & Mistakes</h2>
                        <ul>
                            {(content.commonMistakes || content.pitfalls)?.map((pitfall, idx) => (
                                <li key={idx}>{pitfall}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="detail-card related-card">
                        <h2>🔗 Suggested Related Topics</h2>
                        <div className="related-tags">
                            {content.related?.map((topic, idx) => (
                                <span key={idx} className="related-tag">{topic}</span>
                            ))}
                        </div>
                    </section>

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
            </div>
        </div>
    );
}

export default TopicDetail;
