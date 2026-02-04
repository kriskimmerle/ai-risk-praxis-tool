# Changelog

## [2.0.0] - 2026-02-01

### Content Refresh for 2026 Landscape

#### EU AI Act Timeline Updates
- **Feb 2, 2025**: Prohibited practices became enforceable
- **Aug 2, 2025**: GPAI (General Purpose AI) model rules became applicable
- **Aug 2, 2026**: High-risk AI system requirements take effect
- Updated narrative summaries to reflect current enforcement dates
- Added Article 9 enforcement date notation in risk analysis data

#### New Risk Considerations Added

**Model Context Protocol (MCP) Security**
- Added MCP security considerations for agentic systems (Question 11: agency)
- Emphasized authentication, authorization, and sandboxing requirements for tool calls
- Referenced in narrative generation for systems with tool execution capabilities

**Multi-Agent Orchestration Risks**
- Added multi-agent coordination risks (Question 12: autonomy_level)
- Highlighted conflicting objectives, cascading failures, and amplified vulnerabilities
- Included in agentic system considerations in narrative summaries

**RAG Poisoning via Context Window Attacks**
- Enhanced Question 6 (data_access) subtext with RAG poisoning emphasis
- Added LLM01:2025 Prompt Injection via RAG poisoning to risk analysis
- Included specific mitigation guidance in narrative generation
- Highlighted content signing and anomaly detection requirements

**AI Supply Chain Attacks**
- Updated Question 7 (training_method) and Question 8 (model_origin) subtexts
- Added malicious model weights and backdoored packages to risk considerations
- Included LLM03:2025 Supply Chain notes about verification and scanning
- Added specific mitigation: HiddenLayer ModelScan for open-source models
- Emphasized checksum verification and version pinning

**OWASP AI Testing Guide (AITG v1, Nov 2025)**
- Added reference to OWASP AITG v1 in narrative generation
- Recommended for agent-specific testing methodologies
- Included in practical next steps for agentic systems

#### Terms and Disclaimer Updates
- Updated Terms of Use disclaimer date from June 21, 2024 to February 1, 2026
- Reflects current framework versions and enforcement dates
- Updated in both showTerms() function and README

#### Documentation Updates
- README.md updated with 2026 content section
- Architecture decision updated to reflect modular structure
- GitHub Pages deployment instructions added
- File structure diagram added
- Contributing section added with framework update guidance

### Technical Improvements

**Narrative Generation Enhancements**
- EU AI Act timeline section for regulated/high-stakes systems
- MCP security paragraph for agentic systems
- RAG poisoning prevention guidance
- AI supply chain security paragraph
- Enhanced mitigation recommendations with specific tools and techniques

**Risk Analysis Data Updates**
- Question subtexts updated with 2026 threat landscape
- Framework mappings enhanced with enforcement dates
- Supply chain risk notes added to multiple controls
- RAG-specific risks added to data_access analysis

### Breaking Changes
None - all existing functionality maintained, only content and structure updates.

### Migration Guide
If you have a local copy of the old monolithic version:
1. Replace index.html with the new modular version
2. Add css/ and js/ directories
3. The tool will work exactly as before, just with updated content and cleaner code organization

---

## [1.0.0] - 2025-06-21 (Original Release)

Initial release with:
- Single-file monolithic architecture (index.html)
- 12-question AI risk assessment
- NIST AI RMF, OWASP Top 10 for LLM Apps, EU AI Act framework mappings
- Dark/light mode toggle
- Responsive design
- Risk metrics dashboard
- Narrative summary generation
- Framework-specific recommendations with direct links
