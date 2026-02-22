import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../hooks/useApi';
import './InterviewLab.css';

const TABS = ['Stories', 'Study Plan', 'Resources'];

const blogPosts = [
    {
        id: 1,
        title: 'From Rejections to Offers',
        category: 'Journeys',
        author: 'Aarav Sharma',
        summary:
            'I got 12 rejections before I finally cracked an internship. Here\'s what helped.',
    },
    {
        id: 2,
        title: '3-Month DSA Grind Plan',
        category: 'Roadmaps',
        author: 'Sara Thomas',
        summary:
            'This is exactly how I structured my daily Leetcode routine for 90 days.',
    },
    {
        id: 3,
        title: 'Resume Edits That Got Me Interviews',
        category: 'Tips',
        author: 'Riya Jain',
        summary:
            'Rewriting my resume 6 times taught me what matters most to recruiters.',
    },
];

const STORY_FILTERS = ['All', 'Journeys', 'Roadmaps', 'Tips'];

const initialStudyTopics = [
    {
        id: 1,
        section: 'Data Structures & Algorithms',
        items: [
            { id: 'arrays', label: 'Arrays & Hashing', done: false },
            { id: 'two-pointers', label: 'Two Pointers', done: false },
            { id: 'sliding-window', label: 'Sliding Window', done: false },
            { id: 'stacks', label: 'Stacks & Queues', done: false },
            { id: 'binary-search', label: 'Binary Search', done: false },
            { id: 'linked-lists', label: 'Linked Lists', done: false },
            { id: 'trees', label: 'Trees & BSTs', done: false },
            { id: 'graphs', label: 'Graphs (BFS / DFS)', done: false },
            { id: 'dp', label: 'Dynamic Programming', done: false },
        ],
    },
    {
        id: 2,
        section: 'System Design',
        items: [
            { id: 'scaling', label: 'Scaling Fundamentals', done: false },
            { id: 'load-balancing', label: 'Load Balancing', done: false },
            { id: 'caching', label: 'Caching Strategies', done: false },
            { id: 'databases', label: 'SQL vs NoSQL', done: false },
            { id: 'api-design', label: 'API Design', done: false },
        ],
    },
    {
        id: 3,
        section: 'Behavioral',
        items: [
            { id: 'star', label: 'STAR Method Practice', done: false },
            { id: 'teamwork', label: 'Teamwork Stories', done: false },
            { id: 'conflict', label: 'Conflict Resolution', done: false },
            { id: 'leadership', label: 'Leadership Examples', done: false },
        ],
    },
];

const resources = [
    {
        id: 1,
        name: 'LeetCode',
        url: 'https://leetcode.com',
        description: 'Practice coding problems by topic and difficulty',
        tag: 'DSA',
    },
    {
        id: 2,
        name: 'NeetCode',
        url: 'https://neetcode.io',
        description: 'Curated 150 problems roadmap with video solutions',
        tag: 'DSA',
    },
    {
        id: 3,
        name: 'System Design Primer',
        url: 'https://github.com/donnemartin/system-design-primer',
        description: 'Comprehensive system design study guide on GitHub',
        tag: 'System Design',
    },
    {
        id: 4,
        name: 'Interviewing.io',
        url: 'https://interviewing.io',
        description: 'Anonymous mock interviews with engineers from top companies',
        tag: 'Mock Interviews',
    },
    {
        id: 5,
        name: 'Pramp',
        url: 'https://www.pramp.com',
        description: 'Free peer-to-peer mock interview platform',
        tag: 'Mock Interviews',
    },
    {
        id: 6,
        name: 'Tech Interview Handbook',
        url: 'https://www.techinterviewhandbook.org',
        description: 'End-to-end guide: resume, coding, system design, behavioral',
        tag: 'All-in-One',
    },
];

function InterviewLab() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Stories');
    const [storyFilter, setStoryFilter] = useState('All');
    const [studyTopics, setStudyTopics] = useState(initialStudyTopics);
    const [isRapidRevision, setIsRapidRevision] = useState(true);

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
                            done: t.completed
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
        if (activeTab === 'Study Plan') {
            loadProgress();
        }
    }, [activeTab]);

    const filteredPosts =
        storyFilter === 'All'
            ? blogPosts
            : blogPosts.filter((p) => p.category === storyFilter);

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
            // Optionally revert optimistic UI here
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

            {/* Tab Bar */}
            <nav className="lab-tabs" role="tablist">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        role="tab"
                        aria-selected={activeTab === tab}
                        className={`lab-tab ${activeTab === tab ? 'lab-tab--active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            {/* Tab Content */}
            <section className="lab-content">
                {/* ── Stories Tab ── */}
                {activeTab === 'Stories' && (
                    <div className="stories-panel fade-in">
                        <div className="filter-buttons">
                            {STORY_FILTERS.map((f) => (
                                <button
                                    key={f}
                                    className={
                                        storyFilter === f ? 'active-filter' : 'filter-button'
                                    }
                                    onClick={() => setStoryFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        <div className="stories-grid">
                            {filteredPosts.map((post) => (
                                <article key={post.id} className="story-card">
                                    <span className="story-tag">{post.category}</span>
                                    <h3>{post.title}</h3>
                                    <p className="story-author">by {post.author}</p>
                                    <p className="story-summary">{post.summary}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Study Plan Tab ── */}
                {activeTab === 'Study Plan' && (
                    <div className="study-panel fade-in">
                        <div className="study-header-actions">
                            <div className="progress-bar-wrapper">
                                <div className="progress-label">
                                    <span>Progress</span>
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

                        {studyTopics.map((section) => (
                            <div key={section.id} className="study-section">
                                <h3>{section.section}</h3>
                                {isRapidRevision ? (
                                    <ul className="checklist">
                                        {section.items.map((item) => (
                                            <li
                                                key={item.id}
                                                className={`checklist-item ${item.done ? 'checklist-item--done' : ''}`}
                                                onClick={() => toggleItem(section.id, item.id)}
                                            >
                                                <span className="check-box">
                                                    {item.done ? '✓' : ''}
                                                </span>
                                                <span className="check-label">{item.label}</span>
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
                                                    <span className="status-dot"></span>
                                                </div>
                                                <p className="topic-card-action">View Details →</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Resources Tab ── */}
                {activeTab === 'Resources' && (
                    <div className="resources-panel fade-in">
                        <div className="resources-grid">
                            {resources.map((r) => (
                                <a
                                    key={r.id}
                                    href={r.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-card"
                                >
                                    <span className="resource-tag">{r.tag}</span>
                                    <h3>{r.name}</h3>
                                    <p>{r.description}</p>
                                    <span className="resource-arrow">→</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <button className="start-button" onClick={() => navigate('/')}>
                Go Back
            </button>
        </div>
    );
}

export default InterviewLab;
