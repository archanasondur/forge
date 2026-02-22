import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../hooks/useApi';
import './InterviewLab.css';

const topicMetadata = {
    'arrays': { difficulty: 'Easy', time: '30 mins' },
    'two-pointers': { difficulty: 'Medium', time: '45 mins' },
    'sliding-window': { difficulty: 'Medium', time: '45 mins' },
    'stacks': { difficulty: 'Medium', time: '40 mins' },
    'binary-search': { difficulty: 'Medium', time: '45 mins' },
    'linked-lists': { difficulty: 'Easy', time: '30 mins' },
    'trees': { difficulty: 'Medium', time: '60 mins' },
    'graphs': { difficulty: 'Hard', time: '90 mins' },
    'dp': { difficulty: 'Hard', time: '120 mins' },
    'scaling': { difficulty: 'Medium', time: '45 mins' },
    'load-balancing': { difficulty: 'Medium', time: '30 mins' },
    'caching': { difficulty: 'Medium', time: '45 mins' },
    'databases': { difficulty: 'Medium', time: '60 mins' },
    'api-design': { difficulty: 'Hard', time: '90 mins' },
    'star': { difficulty: 'Easy', time: '20 mins' },
    'teamwork': { difficulty: 'Easy', time: '20 mins' },
    'conflict': { difficulty: 'Medium', time: '30 mins' },
    'leadership': { difficulty: 'Medium', time: '30 mins' },
};

function InterviewLab() {
    const navigate = useNavigate();
    const [studyTopics, setStudyTopics] = useState([]);
    const [isRapidRevision, setIsRapidRevision] = useState(false);

    useEffect(() => {
        const loadProgress = async () => {
            try {
                let data = await api.get('/study-progress');
                if (data.length === 0) {
                    const seedRes = await api.post('/study-progress/seed', {});
                    data = seedRes.topics;
                }

                const topicsBySection = {
                    'DSA': { id: 1, section: 'Data Structures & Algorithms', items: [] },
                    'System Design': { id: 2, section: 'System Design', items: [] },
                    'Behavioral': { id: 3, section: 'Behavioral', items: [] }
                };

                data.forEach(t => {
                    const sec = t.section;
                    if (topicsBySection[sec]) {
                        topicsBySection[sec].items.push({
                            id: t.topic_id,
                            label: t.label,
                            done: t.completed,
                            difficulty: topicMetadata[t.topic_id]?.difficulty || 'Medium',
                            time: topicMetadata[t.topic_id]?.time || '45 mins',
                        });
                    }
                });

                setStudyTopics([
                    topicsBySection['DSA'],
                    topicsBySection['System Design'],
                    topicsBySection['Behavioral']
                ]);
            } catch (err) {
                console.error('Failed to load study progress:', err);
            }
        };
        loadProgress();
    }, []);

    const toggleItem = async (sectionId, itemId) => {
        // Optimistic update
        setStudyTopics((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        items: section.items.map((item) =>
                            item.id === itemId ? { ...item, done: !item.done } : item,
                        ),
                    }
                    : section,
            ),
        );

        // API update
        try {
            await api.put(`/study-progress/${itemId}`, {});
        } catch (err) {
            console.error('Failed to toggle topic:', err);
        }
    };

    const completedCount = studyTopics.reduce(
        (sum, s) => sum + s.items.filter((i) => i.done).length,
        0,
    );
    const totalCount = studyTopics.reduce((sum, s) => sum + s.items.length, 0);

    return (
        <div className="interview-lab-container">
            {/* Header */}
            <header className="lab-header">
                <h2>Interview Lab</h2>
                <p>Everything you need to prepare, practice, and land the offer.</p>
            </header>

            {/* Content Area - Core Concepts */}
            <section className="lab-content fade-in">
                <div className="study-panel">
                    <div className="study-header-actions">
                        <div className="progress-bar-wrapper">
                            <div className="progress-label">
                                <span>Core Concepts Progress</span>
                                <span>
                                    {completedCount} / {totalCount} topics
                                </span>
                            </div>
                            <div className="progress-track">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mode-toggle">
                            <span className={isRapidRevision ? 'active' : ''}>Rapid Revision Mode</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={!isRapidRevision}
                                    onChange={() => setIsRapidRevision(!isRapidRevision)}
                                />
                                <span className="slider round"></span>
                            </label>
                            <span className={!isRapidRevision ? 'active' : ''}>Detailed Mode</span>
                        </div>
                    </div>

                    {isRapidRevision && (
                        <div className="sprint-heading">
                            <h3>⚡ 30-Minute Revision Sprint</h3>
                            <p>Quickly mark off topics you feel confident about to reinforce your memory.</p>
                        </div>
                    )}

                    {studyTopics.map((section) => (
                        <div key={section.id} className="study-section">
                            <h3 className="section-title">{section.section}</h3>
                            {isRapidRevision ? (
                                <ul className="checklist">
                                    {section.items.map((item) => (
                                        <li
                                            key={item.id}
                                            className={`checklist-item ${item.done ? 'checklist-item--done' : ''}`}
                                            onClick={() => toggleItem(section.id, item.id)}
                                        >
                                            <div className="check-main">
                                                <span className="check-box">
                                                    {item.done ? '✓' : ''}
                                                </span>
                                                <span className="check-label">{item.label}</span>
                                            </div>
                                            <div className="check-meta">
                                                <span className="time-est">⏱ {item.time}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="topic-cards-grid">
                                    {section.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`topic-card ${item.done ? 'topic-card--done' : ''}`}
                                            onClick={() => navigate(`/interview-lab/${item.id}`)}
                                        >
                                            <div className="topic-card-header">
                                                <h4>{item.label}</h4>
                                                <div className="topic-tags">
                                                    <span className={`diff-badge diff-${item.difficulty.toLowerCase()}`}>
                                                        {item.difficulty}
                                                    </span>
                                                    {item.done && <span className="status-badge status-done">Done</span>}
                                                </div>
                                            </div>
                                            <div className="topic-card-footer">
                                                <span className="time-est">⏱ {item.time}</span>
                                                <button className="open-module-btn">Open Module →</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <button className="start-button" onClick={() => navigate('/')}>
                Go Back
            </button>
        </div>
    );
}

export default InterviewLab;
