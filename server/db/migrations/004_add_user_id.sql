-- Add user_id to jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS user_id INTEGER DEFAULT 1;
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id);

-- Modify study_progress to handle user-specific topic completion
ALTER TABLE study_progress DROP CONSTRAINT IF EXISTS study_progress_topic_id_key;
ALTER TABLE study_progress ADD COLUMN IF NOT EXISTS user_id INTEGER DEFAULT 1;

-- Ensure each user only has one entry per topic
ALTER TABLE study_progress DROP CONSTRAINT IF EXISTS study_progress_user_topic_unique;
ALTER TABLE study_progress ADD CONSTRAINT study_progress_user_topic_unique UNIQUE (user_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_study_user_id ON study_progress(user_id);
