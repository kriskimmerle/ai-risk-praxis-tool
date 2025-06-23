# AI Risk Praxis Self-Assessment Tool

An on-ramp for AI risk management that bridges the gap between 200-page PDFs and actionable guidance. This tool helps practitioners identify relevant AI risk areas based on established frameworks like NIST AI RMF, OWASP Top 10 for LLM Apps, and EU AI Act.

## Overview

Most practitioners know they need to manage AI risk, but the guidance lives in overwhelming documents and vendor dashboards. Faced with that overload, many freeze or follow checklists they don't understand. This tool is the on-ramp. Use it whether you embed a proprietary model, run open weights, or rely on a vendor feature already baked into your stack. It gets you from zero to one, then hands the baton back so you can tailor the next steps to your own reality.

## Project Structure

AI-Risk-Praxis/
├── index.html          # Complete self-contained application
├── README.md           # This file
└── LICENSE             # MIT License

## Architecture Decision

This project uses a **single-file architecture** with embedded CSS and JavaScript for maximum reliability and portability. The tool is completely self-contained in `index.html`.

### Why Single-File?

- **Reliability**: No dependency management or module loading issues
- **Portability**: Can be deployed anywhere, runs offline
- **Simplicity**: No build process required
- **Distribution**: Easy to share as a single file

## Key Features

- **12 Strategic Questions**: Covers domain classification, deployment scenarios, data handling, and risk controls
- **Framework Integration**: Maps responses to NIST AI RMF, OWASP Top 10 for LLM Apps, and EU AI Act
- **Contextual Guidance**: Each question includes explanatory subtext
- **Dark/Light Mode**: Automatic theme switching with manual override
- **Responsive Design**: Works on desktop and mobile devices
- **Narrative Analysis**: Generates tailored risk assessment summary

## Question Categories

1. **Domain Classification** - Regulated vs. general-purpose applications
2. **Deployment Scenarios** - SaaS, vendor features, custom builds, open source
3. **Data Sensitivity** - PII, proprietary, public data handling
4. **User Interaction** - Direct user-facing vs. behind-the-scenes processing
5. **Decision Impact** - Automated decisions vs. human oversight
6. **Access Controls** - Authentication and authorization mechanisms
7. **Training Data** - Data sources and provenance
8. **Model Transparency** - Explainability requirements
9. **Monitoring Capabilities** - Logging and performance tracking
10. **Incident Response** - Failure handling and recovery procedures
11. **Third-party Dependencies** - External service integrations
12. **Compliance Requirements** - Regulatory and audit obligations

## Usage

1. Open `index.html` in any modern web browser
2. Read the disclaimer and start the assessment
3. Answer 12 questions about your AI system
4. Review the generated risk analysis and framework recommendations
5. Use the provided links to dive deeper into relevant controls

## Framework Coverage

- **NIST AI RMF 1.0**: Risk management functions and categories
- **OWASP Top 10 for LLM Apps 2025**: Security vulnerabilities specific to large language models
- **EU AI Act 2024**: Regulatory requirements for AI systems in the European Union

## Development

The application requires no build process or dependencies. Simply edit `index.html` to make changes.

### Making Updates

1. Edit the embedded JavaScript section for logic changes
2. Modify the CSS section for styling updates
3. Update the QUESTIONS array for content changes
4. Test locally by opening the file in a browser

## Deployment

Deploy by hosting the single `index.html` file on any web server or static hosting service.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

**For informational purposes only.** This tool provides preliminary guidance based on our interpretation of established frameworks and should not replace formal risk assessment, compliance audits, or professional advice.
