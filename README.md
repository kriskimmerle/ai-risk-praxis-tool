# AI Risk Praxis Self-Assessment Tool

An on-ramp for AI risk management that bridges the gap between 200-page PDFs and actionable guidance. This tool helps practitioners identify relevant AI risk areas based on established frameworks like NIST AI RMF, OWASP Top 10 for LLM Apps, and EU AI Act.

## Overview

Most practitioners know they need to manage AI risk, but the guidance lives in overwhelming documents and vendor dashboards. Faced with that overload, many freeze or follow checklists they don't understand. This tool is the on-ramp. Use it whether you embed a proprietary model, run open weights, or rely on a vendor feature already baked into your stack. It gets you from zero to one, then hands the baton back so you can tailor the next steps to your own reality.

## Architecture Decision

This project uses a **modular file architecture** with separate HTML, CSS, and JavaScript files for maintainability while remaining fully portable.

### File Structure

```
ai-risk-praxis-tool/
├── index.html           # HTML structure and content
├── css/
│   └── styles.css       # All styling and themes
├── js/
│   ├── data.js          # Questions and risk analysis data
│   └── app.js           # Application logic and interactions
├── README.md
└── LICENSE
```

### Why This Structure?

- **Maintainability**: Separate concerns (structure, style, behavior, data)
- **Portability**: Still works offline without a build process
- **No Dependencies**: Pure vanilla HTML/CSS/JavaScript
- **Easy Updates**: Content and logic changes don't require touching presentation
- **Version Control**: Cleaner git diffs for targeted changes

## Key Features

- **12 Strategic Questions**: Covers domain classification, deployment scenarios, data handling, and risk controls
- **Framework Integration**: Maps responses to NIST AI RMF, OWASP Top 10 for LLM Apps 2025, and EU AI Act
- **2026 Content Updates**: Includes latest threat landscape (MCP security, multi-agent orchestration, RAG poisoning, supply chain attacks)
- **EU AI Act Timeline**: Reflects current enforcement dates (Feb 2025, Aug 2025, Aug 2026)
- **Contextual Guidance**: Each question includes explanatory subtext with modern risk considerations
- **Dark/Light Mode**: Automatic theme switching with manual override
- **Responsive Design**: Works on desktop and mobile devices
- **Narrative Analysis**: Generates tailored risk assessment summary with practical next steps

## Question Categories

1. **Domain Classification** - Regulated vs. general-purpose applications
2. **Deployment Scenarios** - SaaS, vendor features, homegrown AI
3. **System Capabilities** - Conversational, text generation, media, code generation
4. **Audience Access** - Internal, external, or mixed user base
5. **Data Sensitivity** - Public, confidential, or highly sensitive inputs
6. **Runtime Data Access** - RAG, vector search, live queries
7. **Training Method** - Base model, fine-tuned with public or sensitive data
8. **Model Origin** - Open source or proprietary
9. **Statefulness** - Stateless vs. persistent conversation history
10. **Deployment Architecture** - On-premises, cloud, hybrid, multi-cloud, edge
11. **Agency** - Information-only vs. tool execution capabilities
12. **Autonomy Level** - Human-in-the-loop vs. fully autonomous

## Usage

### Local File

1. Download or clone the repository
2. Open `index.html` in any modern web browser
3. The tool works completely offline - no server required

### GitHub Pages

This tool is deployed via GitHub Pages at:
`https://kriskimmerle.github.io/ai-risk-praxis-tool/`

To deploy your own fork:
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Save and wait for deployment (usually 1-2 minutes)

## Framework Coverage

- **NIST AI RMF 1.0**: Risk management functions and categories with direct links to playbook sections
- **OWASP Top 10 for LLM Apps 2025**: Security vulnerabilities specific to large language models, including latest threats
- **EU AI Act 2024**: Regulatory requirements for AI systems in the European Union with enforcement timeline

## 2026 Updates

This tool has been updated to reflect the current AI risk landscape as of February 2026:

- **EU AI Act Enforcement Timeline**: Prohibited practices (Feb 2025), GPAI rules (Aug 2025), high-risk requirements (Aug 2026)
- **Model Context Protocol (MCP)**: Security considerations for agentic systems
- **Multi-Agent Orchestration**: Coordination risks and security challenges
- **RAG Poisoning**: Context window attacks via poisoned retrieval
- **AI Supply Chain**: Malicious model weights and backdoored packages
- **OWASP AI Testing Guide**: Reference to AITG v1 (Nov 2025) for testing methodologies

## Development

This is a static site with no build process. To modify:

1. **Edit content/questions**: `js/data.js`
2. **Update styling**: `css/styles.css`
3. **Change logic/behavior**: `js/app.js`
4. **Modify structure**: `index.html`

Testing:
- Open `index.html` directly in a browser
- Or run a local server: `python3 -m http.server 8000`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

**For informational purposes only.** This tool provides preliminary guidance based on our interpretation of established frameworks and should not replace formal risk assessment, compliance audits, or professional advice.

**Last Updated**: February 1, 2026

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests. When updating framework mappings or risk considerations, please provide references to official documentation.
