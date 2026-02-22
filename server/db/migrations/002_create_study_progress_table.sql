-- Create study_progress table for interview prep tracking
CREATE TABLE IF NOT EXISTS study_progress (
  id            SERIAL PRIMARY KEY,
  topic_id      VARCHAR(50) UNIQUE NOT NULL,
  section       VARCHAR(100) NOT NULL,
  label         VARCHAR(255) NOT NULL,
  completed     BOOLEAN DEFAULT FALSE,
  completed_at  TIMESTAMP,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_study_section ON study_progress(section);
CREATE INDEX IF NOT EXISTS idx_study_completed ON study_progress(completed);

-- Seed initial topics
INSERT INTO study_progress (topic_id, section, label) VALUES
  ('arrays',         'DSA',            'Arrays & Hashing'),
  ('two-pointers',   'DSA',            'Two Pointers'),
  ('sliding-window', 'DSA',            'Sliding Window'),
  ('stacks',         'DSA',            'Stacks & Queues'),
  ('binary-search',  'DSA',            'Binary Search'),
  ('linked-lists',   'DSA',            'Linked Lists'),
  ('trees',          'DSA',            'Trees & BSTs'),
  ('graphs',         'DSA',            'Graphs (BFS / DFS)'),
  ('dp',             'DSA',            'Dynamic Programming'),
  ('scaling',        'System Design',  'Scaling Fundamentals'),
  ('load-balancing', 'System Design',  'Load Balancing'),
  ('caching',        'System Design',  'Caching Strategies'),
  ('databases',      'System Design',  'SQL vs NoSQL'),
  ('api-design',     'System Design',  'API Design'),
  ('star',           'Behavioral',     'STAR Method Practice'),
  ('teamwork',       'Behavioral',     'Teamwork Stories'),
  ('conflict',       'Behavioral',     'Conflict Resolution'),
  ('leadership',     'Behavioral',     'Leadership Examples')
ON CONFLICT (topic_id) DO NOTHING;

-- Reuse the same updated_at trigger
DROP TRIGGER IF EXISTS update_study_progress_updated_at ON study_progress;
CREATE TRIGGER update_study_progress_updated_at
  BEFORE UPDATE ON study_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
