CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  loyal TEXT NOT NULL,
  spy TEXT NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE questions ADD CONSTRAINT question_unique UNIQUE (loyal, spy);
