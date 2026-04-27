<div align="center">

<img src="https://raw.githubusercontent.com/Devopstrio/.github/main/assets/Browser_logo.png" height="85" alt="Devopstrio Logo" />

<h1>Audit Trail Immutability Platform</h1>

<p><strong>Cryptographic Chain-of-Custody and Tamper-Proof Evidence Management</strong></p>

[![Security](https://img.shields.io/badge/Security-Zero_Trust-522c72?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)
[![Cryptography](https://img.shields.io/badge/Crypto-Merkle_Trees-0078d4?style=for-the-badge&logo=microsoftazure&labelColor=000000)](/crypto)
[![Compliance](https://img.shields.io/badge/Compliance-WORM_Storage-962964?style=for-the-badge&labelColor=000000)](/terraform)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)

</div>

---

## 🏛️ Executive Summary

The **Audit Trail Immutability (ATI)** platform is the definitive legal truth engine for Devopstrio. It aggregates millions of discrete operational events—from Kubernetes RBAC changes to Azure AD object modifications—and cryptographically seals them using cryptographic Hash Chaining and Merkle Trees. 

Any attempt to manipulate or delete historical audit logs is instantly detected, triggering immediate SOC incident alerts. All underlying blobs are secured via Write-Once-Read-Many (WORM) hardware-level retention policies.

### Strategic Business Outcomes
- **Legal Non-Repudiation**: Evidence exported from ATI contains mathematical proofs verifying exactly when an event occurred and that it has not been altered since ingestion.
- **WORM Immutability**: Underlying storage accounts leverage time-based legal hold policies. Cloud administrators cannot modify or delete logs, even with `Owner` privileges.
- **Unified Forensic Timeline**: Correlates sparse SIEM data, GitHub repository actions, and API executions into a single chronological chain.
- **Cost-Optimized Archiving**: Automatically ages older cryptographic blocks into Azure Cold Storage / AWS Glacier while maintaining search index parity.

---

## 🏗️ Technical Architecture Details

### 1. High-Level Architecture
```mermaid
graph TD
    Sources[Enterprise Data Sources] --> Ingest[Ingestion Engine]
    Ingest --> MetaDB[(Metadata PG API)]
    Ingest --> Crypto[Immutability Engine]
    Crypto --> |Generate Merkle Root| Ledger[Cryptographic Ledger]
    Crypto --> |Flush to WORM| Storage[(Immutable Blob Storage)]
    UI[Next.js Forensics Portal] --> API[FastAPI Gateway]
    API --> Verify[Verification Engine]
    Verify --> Ledger
```

### 2. Log Ingestion Workflow
```mermaid
sequenceDiagram
    participant CloudTrail
    participant Ingestion
    participant Crypto
    participant Blockchain
    
    CloudTrail->>Ingestion: Flush 5,000 JSON events
    Ingestion->>Ingestion: Normalize schema (Timestamp, Actor)
    Ingestion->>Crypto: Request Block Creation
    Crypto->>Crypto: Compute SHA-256 for each event
    Crypto->>Crypto: Generate Merkle Root Hash
    Crypto->>Blockchain: Anchor Root Hash (Optional)
    Crypto-->>Ingestion: Block 9422 Sealed
```

### 3. Hash Chain Lifecycle
```mermaid
graph LR
    Block1[Block 01<br/>Hash: a7f8] --> |Previous Hash| Block2[Block 02<br/>Hash: 3b9c]
    Block2 --> |Previous Hash| Block3[Block 03<br/>Hash: 88f2]
    Block3 --> |Previous Hash| Block4[Block 04<br/>Hash: Pending...]
```

### 4. Merkle Verification Flow
```mermaid
graph TD
    Event[Target Event Data] --> Hash[Compute Payload Hash]
    Hash --> Validate[Fetch Sibling Hashes]
    Validate --> Root[Recompute Merkle Root]
    Root --> Ledger[Compare against Sealed Root]
    Ledger -->|Match| Trusted[Cryptographically Verified]
```

### 5. Chain-of-Custody Workflow
```mermaid
graph LR
    LogOrigination[Azure AD] --> Platform[ATI Ingestion]
    Platform --> Seal[Hash & Time Stamp]
    Seal --> WORM[Azure Immutable Storage]
    WORM --> Export[PDF/JSON Legal Export]
    Export --> Signature[Add Digital Certificate]
```

### 6. Forensics Investigation Flow
```mermaid
graph TD
    Analyst[Security Analyst] --> Search[Full-Text Elastic Search]
    Search --> Meta[PostgreSQL Metadata]
    Meta --> Verify[Request Verification Proof]
    Verify --> Result[Return Tamper-Evident Report]
```

### 7. Legal Hold Lifecycle
```mermaid
graph TD
    Counsel[Legal Counsel] --> API[Set Legal Hold UUID]
    API --> Retention[Retention Engine]
    Retention --> Storage[Extend WORM Policy past 7 years]
    Storage --> Lock[Prevent Cold-Tier Deletion]
```

### 8. Security Trust Boundary
```mermaid
graph TD
    Internet --> WAF[Cloudflare / AppGW]
    WAF --> AKS[API Cluster]
    AKS --> |Private Link| Keys[HSM / Key Vault]
    AKS --> |Private Link| PG[(PostgreSQL)]
```

### 9. AKS Topology
```mermaid
graph TD
    subgraph K8s
        Ingress --> Portal[Next.js]
        Ingress --> Gateway[FastAPI]
        Gateway --> Worker1[Crypto Node]
        Gateway --> Worker2[Verification Node]
    end
```

### 10. API Request Lifecycle
```mermaid
graph LR
    Client --> API Gateway
    API Gateway --> Auth[Token Validation OIDC]
    Auth --> Route[/logs/search]
    Route --> DB
```

---

## 🛠️ Global Platform Components

| Engine | Directory | Purpose |
|:---|:---|:---|
| **Forensics Portal** | `apps/portal/` | Executive Next.js interface for legal discovery. |
| **Ingestion Engine** | `apps/ingestion-engine/` | Massively concurrent parsers for syslog and Cloud APIs. |
| **Crypto Engine** | `crypto/` | Core mathematical library yielding Merkle Trees and Signatures. |
| **Verification Engine**| `apps/verification-engine/`| Nightly cron jobs validating the integrity of history. |

---

## 🚀 Environment Deployment

Provision the zero-trust data environment.

```bash
cd terraform/environments/prod
terraform init
terraform apply -auto-approve
```

---
<sub>&copy; 2026 Devopstrio &mdash; Absolute Mathematical Truth.</sub>
