import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../hooks/useApi';
import { topicContent } from './topicContent';
import './InterviewLab.css';

const topicMetadata = {
    'arrays': { difficulty: 'Beginner', time: '30 mins' },
    'two-pointers': { difficulty: 'Intermediate', time: '45 mins' },
    'sliding-window': { difficulty: 'Intermediate', time: '45 mins' },
    'stacks': { difficulty: 'Intermediate', time: '40 mins' },
    'binary-search': { difficulty: 'Intermediate', time: '45 mins' },
    'linked-lists': { difficulty: 'Beginner', time: '30 mins' },
    'trees': { difficulty: 'Intermediate', time: '60 mins' },
    'graphs': { difficulty: 'Advanced', time: '90 mins' },
    'dp': { difficulty: 'Advanced', time: '120 mins' },
    'scaling': { difficulty: 'Intermediate', time: '45 mins' },
    'load-balancing': { difficulty: 'Intermediate', time: '30 mins' },
    'caching': { difficulty: 'Intermediate', time: '45 mins' },
    'databases': { difficulty: 'Intermediate', time: '60 mins' },
    'api-design': { difficulty: 'Advanced', time: '90 mins' },
    'star': { difficulty: 'Beginner', time: '20 mins' },
    'teamwork': { difficulty: 'Beginner', time: '20 mins' },
    'conflict': { difficulty: 'Intermediate', time: '30 mins' },
    'leadership': { difficulty: 'Intermediate', time: '30 mins' },
};

function InterviewLab() {
    const navigate = useNavigate();
    const [studyTopics, setStudyTopics] = useState([]);
    const [isRapidRevision, setIsRapidRevision] = useState(false);

    // Active Sprint State
    const [isSprintActive, setIsSprintActive] = useState(false);
    const [sprintTopics, setSprintTopics] = useState([]);
    const [currentSprintIndex, setCurrentSprintIndex] = useState(0);
    const [sprintResults, setSprintResults] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
    const [isSprintComplete, setIsSprintComplete] = useState(false);

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
                            difficulty: topicMetadata[t.topic_id]?.difficulty || 'Intermediate',
                            time: topicMetadata[t.topic_id]?.time || '45 mins',
                            content: topicContent[t.topic_id]
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

    // Timer Effect for Sprint
    useEffect(() => {
        let timer;
        if (isSprintActive && !isSprintComplete && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0 && isSprintActive && !isSprintComplete) {
            // Auto complete when time runs out
            setIsSprintComplete(true);
        }
        return () => clearInterval(timer);
    }, [isSprintActive, isSprintComplete, timeRemaining]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const startSprint = () => {
        // Gather up to 10 un-completed topics or a mix for the sprint
        const allItems = studyTopics.flatMap(s => s.items);
        const remaining = allItems.filter(i => !i.done);

        // Take up to 10
        const selected = remaining.sort(() => 0.5 - Math.random()).slice(0, 10);

        const processSprintTopics = (topicsArr) => {
            return topicsArr.map(t => {
                const prompts = t.content?.rapidPrompts || t.content?.questions || [];
                const activePrompt = prompts.length > 0 ? prompts[Math.floor(Math.random() * prompts.length)] : null;
                return { ...t, activePrompt };
            });
        };

        if (selected.length === 0) {
            // If all done, grab random 5 for review
            const fallback = allItems.sort(() => 0.5 - Math.random()).slice(0, 5);
            setSprintTopics(processSprintTopics(fallback));
        } else {
            setSprintTopics(processSprintTopics(selected));
        }

        setSprintResults([]);
        setCurrentSprintIndex(0);
        setTimeRemaining(1800); // Reset timer
        setIsSprintComplete(false);
        setIsSprintActive(true);
    };

    const handleSprintAction = async (topicId, isConfident) => {
        setSprintResults(prev => [...prev, { id: topicId, confident: isConfident }]);

        // If confident and it was theoretically 'un-done', mark it done via API
        if (isConfident) {
            try {
                // We don't have the exact state to know if it requires a toggle,
                // but usually if they are confident we just ensure it's recorded.
                // For now, we will just record it in the temporary sprint result state
                // to show in the summary screen.
            } catch (e) { console.error(e) }
        }

        if (currentSprintIndex + 1 < sprintTopics.length) {
            setCurrentSprintIndex(prev => prev + 1);
        } else {
            setIsSprintComplete(true);
        }
    };

    const endSprintEarly = () => {
        setIsSprintComplete(true);
    };

    const closeSprint = () => {
        setIsSprintActive(false);
        setIsSprintComplete(false);
    };

    const completedCount = studyTopics.reduce((sum, s) => sum + s.items.filter((i) => i.done).length, 0);
    const totalCount = studyTopics.reduce((sum, s) => sum + s.items.length, 0);

    // Render Sprint Active State
    if (isSprintActive) {
        if (isSprintComplete) {
            const confidentCount = sprintResults.filter(r => r.confident).length;
            const weakTopics = sprintResults.filter(r => !r.confident);

            return (
                <div className="interview-lab-container sprint-mode">
                    <div className="sprint-summary-card fade-in">
                        <h2>🏁 Sprint Complete!</h2>
                        <div className="sprint-stats">
                            <div className="stat-box">
                                <h3>{sprintResults.length}</h3>
                                <p>Topics Reviewed</p>
                            </div>
                            <div className="stat-box">
                                <h3>{confidentCount}</h3>
                                <p>Mastered</p>
                            </div>
                            <div className="stat-box">
                                <h3>{weakTopics.length}</h3>
                                <p>Needs Work</p>
                            </div>
                        </div>

                        {weakTopics.length > 0 && (
                            <div className="weak-areas-box">
                                <h3>Focus Areas:</h3>
                                <ul>
                                    {weakTopics.map(w => {
                                        const topic = sprintTopics.find(t => t.id === w.id);
                                        return <li key={w.id}>{topic.label}</li>;
                                    })}
                                </ul>
                                <p className="module-suggestion">
                                    💡 Suggestion: Open the Detailed Study module for <strong>{sprintTopics.find(t => t.id === weakTopics[0].id)?.label}</strong> next.
                                </p>
                            </div>
                        )}

                        <button className="finish-sprint-btn" onClick={closeSprint}>Return to Dashboard</button>
                    </div>
                </div>
            );
        }

        const currentTopic = sprintTopics[currentSprintIndex];
        const progressPercent = (currentSprintIndex / sprintTopics.length) * 100;

        return (
            <div className="interview-lab-container sprint-mode">
                <div className="sprint-header fade-in">
                    <div className="sprint-progress-bar">
                        <div className="sprint-progress-fill" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <div className="sprint-meta">
                        <span>Topic {currentSprintIndex + 1} of {sprintTopics.length}</span>
                        <span className={`sprint-timer ${timeRemaining < 300 ? 'urgent' : ''}`}>
                            ⏱ {formatTime(timeRemaining)}
                        </span>
                        <button className="end-early-btn" onClick={endSprintEarly}>End Early</button>
                    </div>
                </div>

                <div className="sprint-active-card fade-in">
                    <span className="sprint-category-tag">{currentTopic.difficulty}</span>
                    <h2>{currentTopic.label}</h2>
                    <div className="sprint-flashcard-content">
                        <p>{currentTopic.content?.patternSnapshot || currentTopic.content?.theory}</p>

                        {(currentTopic.activePrompt) && (
                            <div className="sprint-question">
                                <strong>Can you answer this?</strong>
                                <p>"{currentTopic.activePrompt}"</p>
                            </div>
                        )}

                        {currentTopic.content?.externalProblems && currentTopic.content.externalProblems.length > 0 && (
                            <div className="sprint-practice-prompt">
                                <button className="sprint-external-btn" onClick={() => window.open(currentTopic.content.externalProblems[0].url, '_blank')} aria-label="Open a practice problem on LeetCode">
                                    Open a practice problem ↗
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="sprint-actions">
                        <button className="action-btn review-btn" onClick={() => handleSprintAction(currentTopic.id, false)}>
                            Need Review ❌
                        </button>
                        <button className="action-btn confident-btn" onClick={() => handleSprintAction(currentTopic.id, true)}>
                            Confident ✅
                        </button>
                    </div>
                </div>
            </div >
        );
    }

    return (
        <div className="interview-lab-container">
            {/* Header */}
            <header className="lab-header">
                <h2>Interview Lab</h2>
                <p>Structured interview preparation engine.</p>
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
                            <span className={isRapidRevision ? 'active' : ''}>Rapid Revision</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={!isRapidRevision}
                                    onChange={() => setIsRapidRevision(!isRapidRevision)}
                                />
                                <span className="slider round"></span>
                            </label>
                            <span className={!isRapidRevision ? 'active' : ''}>Detailed Study</span>
                        </div>
                    </div>

                    {isRapidRevision ? (
                        <div className="sprint-landing fade-in">
                            <div className="sprint-landing-card">
                                <h3>⚡ Rapid Revision Engine</h3>
                                <p>Enter a highly focused, timed session to test your recall on randomized topics. Build confidence without distractions.</p>
                                <ul className="sprint-features">
                                    <li>✓ 30-Minute Timed Session</li>
                                    <li>✓ Active Recall Prompts</li>
                                    <li>✓ Performance Summary</li>
                                </ul>
                                <button className="start-sprint-btn" onClick={startSprint}>
                                    Start 30-Minute Sprint
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {studyTopics.map((section) => (
                                <div key={section.id} className="study-section fade-in">
                                    <h3 className="section-title">{section.section}</h3>
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
                                                {item.content?.patternSnapshot && (
                                                    <div className="topic-card-overview">
                                                        <p className="topic-card-pattern">{item.content.patternSnapshot}</p>
                                                        <span className="topic-card-problem-count">
                                                            {item.content.externalProblems?.length || 0} problems linked
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="topic-card-footer">
                                                    {!item.content?.patternSnapshot && <span className="time-est">⏱ {item.time}</span>}
                                                    <button className="open-module-btn">Open Module →</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <button className="start-button" onClick={() => navigate('/')}>
                ← Return to Home
            </button>
        </div>
    );
}

export default InterviewLab;
