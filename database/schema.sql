-- Devopstrio Audit Trail Immutability
-- Cryptographic Ledger Metadata Schema
-- Target: PostgreSQL 14+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizational Mapping
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'Investigator', -- SystemAdmin, Investigator, LegalCounsel
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Upstream Data Sources (e.g. AWS Cloudtrail, Github)
CREATE TABLE IF NOT EXISTS log_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    source_name VARCHAR(255) NOT NULL,
    source_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Heavy Event Log Storage (Usually synced with OpenSearch/ElasticSearch, kept here for structural integrity)
CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID REFERENCES log_sources(id),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    actor_identifier VARCHAR(512),
    action VARCHAR(255),
    resource_id VARCHAR(512),
    raw_payload JSONB NOT NULL,
    ingested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cryptographic Block Ledger (The "Blockchain" equivalent)
CREATE TABLE IF NOT EXISTS cryptographic_blocks (
    block_id BIGSERIAL PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id),
    previous_block_hash VARCHAR(64) NOT NULL,
    merkle_root_hash VARCHAR(64) NOT NULL,
    block_hash VARCHAR(64) UNIQUE NOT NULL,
    event_count INT NOT NULL,
    storage_blob_uri TEXT NOT NULL, -- Pointing to the WORM storage Azure Blob
    sealed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sub-event integrity linking to Merkle blocks
CREATE TABLE IF NOT EXISTS event_hashes (
    event_id UUID REFERENCES audit_events(id) ON DELETE CASCADE,
    block_id BIGINT REFERENCES cryptographic_blocks(block_id),
    leaf_hash VARCHAR(64) NOT NULL,
    merkle_proof JSONB, -- The array of sibling hashes needed to re-verify the root
    PRIMARY KEY (event_id)
);

-- Integrity Checks
CREATE TABLE IF NOT EXISTS verification_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    executed_by UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'Running', -- Passed, Failed, Running
    scanned_blocks INT DEFAULT 0,
    failures_detected INT DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS legal_holds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    case_reference VARCHAR(255) NOT NULL,
    target_start_date TIMESTAMP WITH TIME ZONE,
    target_end_date TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast lookups
CREATE INDEX idx_events_actor ON audit_events(actor_identifier);
CREATE INDEX idx_events_timestamp ON audit_events(timestamp);
CREATE INDEX idx_blocks_hash ON cryptographic_blocks(block_hash);
