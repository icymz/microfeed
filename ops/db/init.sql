CREATE TABLE IF NOT EXISTS channels (
  id VARCHAR(11) PRIMARY KEY,

  status TINYINT,   /* 1: PUBLISHED, 2: UNPUBLISHED, 3: DELETED */
  is_primary BOOLEAN UNIQUE,  /* True or NULL*/
  data TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS channels_status on channels (status);
CREATE INDEX IF NOT EXISTS channels_is_primary on channels (is_primary);
CREATE INDEX IF NOT EXISTS channels_created_at on channels (created_at);
CREATE INDEX IF NOT EXISTS channels_updated_at on channels (updated_at);

CREATE TABLE IF NOT EXISTS items (
  id VARCHAR(11) PRIMARY KEY,
  status TINYINT, /* 1: PUBLISHED, 2: UNPUBLISHED, 3: DELETED */
  data TEXT,
  pub_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS items_pub_date on items (pub_date);
CREATE INDEX IF NOT EXISTS items_created_at on items (created_at);
CREATE INDEX IF NOT EXISTS items_updated_at on items (updated_at);
CREATE INDEX IF NOT EXISTS items_status on items (status);

CREATE TABLE IF NOT EXISTS settings (
  category VARCHAR(20) PRIMARY KEY,
  data TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- D1 migration: create table & indexes for visit logs
CREATE TABLE IF NOT EXISTS visit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,                -- epoch milliseconds
  method TEXT,
  path TEXT,                          -- pathname + search (no domain)
  query TEXT,                         -- search part, redundant but handy
  referer_host TEXT,
  referer_path TEXT,                  -- pathname + search (no domain)
  ip TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  latitude REAL,
  longitude REAL,
  asn INTEGER,
  as_org TEXT,
  timezone TEXT,
  ua TEXT,                            -- raw user-agent
  ua_browser TEXT,                    -- parsed browser
  ua_os TEXT,                         -- parsed os
  accept_language TEXT
);

CREATE INDEX IF NOT EXISTS idx_visit_logs_ts ON visit_logs (ts DESC);
CREATE INDEX IF NOT EXISTS idx_visit_logs_path ON visit_logs (path);
CREATE INDEX IF NOT EXISTS idx_visit_logs_country ON visit_logs (country);
CREATE INDEX IF NOT EXISTS idx_visit_logs_ua_browser ON visit_logs (ua_browser);