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

    // Rapid Revision Config State
    const [sprintConfigActive, setSprintConfigActive] = useState(false);
    const [selectedTimebox, setSelectedTimebox] = useState(30); // 15, 30, 45, 60
    const [selectedType, setSelectedType] = useState('All'); // All, DSA, System Design, Behavioral
    const [selectedTopicIds, setSelectedTopicIds] = useState([]);
    const [previewProblems, setPreviewProblems] = useState([]);

    // Active Sprint State
    const [isSprintActive, setIsSprintActive] = useState(false);
    const [sprintTopics, setSprintTopics] = useState([]);
    const [currentSprintIndex, setCurrentSprintIndex] = useState(0);
    const [sprintResults, setSprintResults] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(1800); // changes based on selectedTimebox
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

    const handleTopicToggle = (topicId) => {
        setSelectedTopicIds(prev =>
            prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = studyTopics.flatMap(s => s.items).map(i => i.id);
            setSelectedTopicIds(allIds);
        } else {
            setSelectedTopicIds([]);
        }
    };

    // Generate Preview Table whenever config changes
    useEffect(() => {
        if (!isRapidRevision || isSprintActive || isSprintComplete) return;

        let availableTopics = studyTopics.flatMap(s => s.items);

        // Filter by Type
        if (selectedType !== 'All') {
            const sectionMap = { 'DSA': 1, 'System Design': 2, 'Behavioral': 3 };
            const sectionId = sectionMap[selectedType];
            const sectionData = studyTopics.find(s => s.id === sectionId);
            availableTopics = sectionData ? sectionData.items : [];
        }

        // Filter by Selected Topics
        if (selectedTopicIds.length > 0) {
            availableTopics = availableTopics.filter(t => selectedTopicIds.includes(t.id));
        }

        // Fallback if empty
        if (availableTopics.length === 0) {
            availableTopics = studyTopics.flatMap(s => s.items);
        }

        // Timebox Rules
        let rules = { beginner: 0, intermediate: 0, advanced: 0 };
        if (selectedTimebox === 15) { rules = { beginner: 2 }; }
        else if (selectedTimebox === 30) { rules = { beginner: 2, intermediate: 1 }; }
        else if (selectedTimebox === 45) { rules = { beginner: 1, intermediate: 2 }; }
        else if (selectedTimebox === 60) { rules = { intermediate: 2, advanced: 1 }; }

        let generated = [];

        // Helper to grab random items of difficulty
        const grab = (diff, count) => {
            const pool = availableTopics.filter(t => t.difficulty.toLowerCase() === diff);
            // shuffle pool
            const shuffled = [...pool].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };

        const reqB = rules.beginner || 0;
        const reqI = rules.intermediate || 0;
        const reqA = rules.advanced || 0;

        let selectedB = grab('beginner', reqB);
        let selectedI = grab('intermediate', reqI);
        let selectedA = grab('advanced', reqA);

        // If we didn't find enough, grab from anywhere to fill the gap
        let totalNeeded = reqB + reqI + reqA;
        let currentTotal = selectedB.length + selectedI.length + selectedA.length;

        let combined = [...selectedB, ...selectedI, ...selectedA];

        if (currentTotal < totalNeeded) {
            const remainingPool = availableTopics.filter(t => !combined.find(c => c.id === t.id));
            const extra = [...remainingPool].sort(() => 0.5 - Math.random()).slice(0, totalNeeded - currentTotal);
            combined = [...combined, ...extra];
        }

        // Process for display (assign prompt, extract URL if present)
        const processed = combined.map(t => {
            const prompts = t.content?.rapidPrompts || t.content?.questions || [];
            const activePrompt = prompts.length > 0 ? prompts[Math.floor(Math.random() * prompts.length)] : null;
            const externalProblem = t.content?.externalProblems?.[0];

            return {
                ...t,
                activePrompt,
                externalUrl: externalProblem?.url,
                externalName: externalProblem?.name
            };
        });

        setPreviewProblems(processed);
    }, [isRapidRevision, selectedTimebox, selectedType, selectedTopicIds, studyTopics, isSprintActive, isSprintComplete]);


    const startSprint = () => {
        if (previewProblems.length === 0) return;

        setSprintTopics(previewProblems);
        setSprintResults([]);
        setCurrentSprintIndex(0);
        setTimeRemaining(selectedTimebox * 60); // Set timer based on timebox
        setIsSprintComplete(false);
        setIsSprintActive(true);
    };

    const handleSprintAction = async (topicId, isConfident) => {
        setSprintResults(prev => [...prev, { id: topicId, confident: isConfident }]);

        // If confident and it was theoretically 'un-done', mark it done via API
        if (isConfident) {
            try {
                // Determine if we need to call API (if it was not previously done)
                const originalTopic = studyTopics.flatMap(s => s.items).find(t => t.id === topicId);
                if (originalTopic && !originalTopic.done) {
                    await api.put(`/study-progress/${topicId}`, { completed: true });

                    // Update local studyTopics state
                    setStudyTopics(prev => prev.map(section => ({
                        ...section,
                        items: section.items.map(item =>
                            item.id === topicId ? { ...item, done: true } : item
                        )
                    })));
                }
            } catch (e) {
                console.error("Failed to update progress:", e);
            }
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
                                <p>Topics Seen</p>
                            </div>
                            <div className="stat-box">
                                <h3>{confidentCount}</h3>
                                <p>Solved</p>
                            </div>
                            <div className="stat-box">
                                <h3>{weakTopics.length}</h3>
                                <p>Skipped</p>
                            </div>
                        </div>

                        {weakTopics.length > 0 && (
                            <div className="weak-areas-box">
                                <h3>Suggested Review:</h3>
                                <ul>
                                    {weakTopics.map(w => {
                                        const topic = sprintTopics.find(t => t.id === w.id);
                                        return <li key={w.id}>{topic?.label || 'Topic'}</li>;
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
                        <button className="action-btn skip-btn" onClick={() => handleSprintAction(currentTopic.id, false)}>
                            Skip
                        </button>
                        <button className="action-btn confident-btn" onClick={() => handleSprintAction(currentTopic.id, true)}>
                            Mark Solved ✅
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
                        <div className="sprint-config-container fade-in">
                            <div className="sprint-config-sidebar">
                                <h3>⚙️ Sprint Configuration</h3>

                                <div className="config-group">
                                    <label>Timebox</label>
                                    <div className="timebox-selector" role="radiogroup" aria-label="Select Sprint Duration">
                                        {[15, 30, 45, 60].map(mins => (
                                            <button
                                                key={mins}
                                                className={`timebox-btn ${selectedTimebox === mins ? 'active' : ''}`}
                                                onClick={() => setSelectedTimebox(mins)}
                                                aria-checked={selectedTimebox === mins}
                                                role="radio"
                                            >
                                                {mins}m
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="config-group">
                                    <label>Problem Type</label>
                                    <select
                                        className="type-select"
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        aria-label="Filter by Topic Type"
                                    >
                                        <option value="All">All Types</option>
                                        <option value="DSA">Data Structures & Algorithms</option>
                                        <option value="System Design">System Design</option>
                                        <option value="Behavioral">Behavioral</option>
                                    </select>
                                </div>

                                <div className="config-group">
                                    <div className="pool-header">
                                        <label>Topics Pool</label>
                                        <label className="select-all-toggle">
                                            <input type="checkbox" onChange={handleSelectAll} aria-label="Select All Topics" />
                                            <span>All</span>
                                        </label>
                                    </div>
                                    <div className="topic-multiselect">
                                        {studyTopics.flatMap(s => s.items).filter(t => selectedType === 'All' || studyTopics.find(st => st.id === (selectedType === 'DSA' ? 1 : selectedType === 'System Design' ? 2 : 3))?.items.includes(t)).map(t => (
                                            <label key={t.id} className="topic-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTopicIds.includes(t.id)}
                                                    onChange={() => handleTopicToggle(t.id)}
                                                    aria-label={`Select ${t.label}`}
                                                />
                                                <span className="checkbox-label">{t.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="sprint-preview-panel">
                                <h3>📋 Generated Sprint Preview</h3>
                                <p className="preview-desc">Based on your rules ({selectedTimebox}m), we've generated the following sequence:</p>

                                <div className="preview-table-container">
                                    <table className="preview-table" aria-label="Sprint Problem Preview">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Difficulty</th>
                                                <th>Suggested Time</th>
                                                <th>Topic / Problem</th>
                                                <th>External</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {previewProblems.length > 0 ? previewProblems.map((prob, idx) => (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td><span className={`diff-badge diff-${prob.difficulty.toLowerCase()}`}>{prob.difficulty}</span></td>
                                                    <td>{prob.time}</td>
                                                    <td>
                                                        <div className="preview-prob-title">{prob.label}</div>
                                                        <div className="preview-prob-sub">{prob.externalName || "Internal Task"}</div>
                                                    </td>
                                                    <td className="center-col">
                                                        {prob.externalUrl ? <span className="external-icon" aria-label="Has External Link">↗</span> : <span aria-label="Internal Only">—</span>}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="5" className="empty-table">No topics match current filters. Expanding pool...</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <button
                                    className="start-sprint-btn fade-in"
                                    onClick={startSprint}
                                    disabled={previewProblems.length === 0}
                                    aria-label={`Start ${selectedTimebox} minute sprint`}
                                >
                                    Start {selectedTimebox}-Minute Sprint
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
