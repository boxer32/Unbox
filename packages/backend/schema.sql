-- schemas/schema.sql
DROP TABLE IF EXISTS decisions;
DROP TABLE IF EXISTS proofs;
DROP TABLE IF EXISTS risk_cache;

CREATE TABLE decisions (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  timestampMs INTEGER NOT NULL,
  targetAddress TEXT
);

CREATE TABLE proofs (
  id TEXT PRIMARY KEY,
  consumedAt INTEGER NOT NULL
);

CREATE TABLE risk_cache (
  id TEXT PRIMARY KEY,
  data_json TEXT NOT NULL
);

-- Initialize default risk state
INSERT INTO risk_cache (id, data_json) VALUES ('global', '{"flags": [], "targets": []}');
