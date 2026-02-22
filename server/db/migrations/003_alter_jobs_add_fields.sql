-- Add resume_version and follow_up_date columns to jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS resume_version VARCHAR(50);
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS follow_up_date DATE;

-- Widen status constraint to include 'OA' and 'Interview Scheduled'
ALTER TABLE jobs DROP CONSTRAINT IF EXISTS jobs_status_check;
ALTER TABLE jobs ADD CONSTRAINT jobs_status_check
  CHECK (status IN ('Wishlist','Applied','OA','Interview Scheduled','Interview','Offer','Accepted','Rejected'));
