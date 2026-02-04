// Updated questions with new structure and subtext
const questions = [
    {
        id: 'domain',
        text: 'Which best describes the domain of your AI application?',
        subtext: 'Knowing whether the use case falls into a regulated or high-stakes field sets the floor for compliance, testing, and audit depth.',
        answers: [
            {
                option: 'General-purpose, non-critical',
                main: 'General-purpose, non-critical',
                sub: 'Productivity, content generation, general assistance'
            },
            {
                option: 'Regulated or high-stakes',
                main: 'Regulated or high-stakes',
                sub: 'Healthcare, finance, insurance, legal, HR, safety-critical'
            }
        ]
    },
    {
        id: 'deployment_scenario',
        text: 'Which scenario best matches how your organization delivers this generative-AI capability?',
        subtext: 'Delivery model defines who owns which controls and where liability sits.',
        answers: [
            {
                option: 'Vendor AI SaaS product',
                main: 'Vendor AI SaaS product',
                sub: 'Microsoft 365 Copilot, Salesforce Einstein, Cursor'
            },
            {
                option: 'AI feature added to an existing vendor product',
                main: 'AI feature added to an existing vendor product',
                sub: 'Acrobat with LLM summarize'
            },
            {
                option: 'Homegrown AI',
                main: 'Homegrown AI',
                sub: 'Host your own model or invoke an external model API inside your code'
            }
        ]
    },
    {
        id: 'capabilities',
        text: 'Which capabilities does the system provide? (Select all that apply)',
        subtext: 'Each modality carries its own misuse patterns and attack surface, from prompt injection in chat to deepfake abuse in media.',
        answers: [
            {
                option: 'Conversational interaction',
                main: 'Conversational interaction',
                sub: 'Chatbots, virtual assistants, customer support'
            },
            {
                option: 'Text generation',
                main: 'Text generation',
                sub: 'Articles, reports, creative writing'
            },
            {
                option: 'Image, audio, or video generation',
                main: 'Image, audio, or video generation',
                sub: 'Synthetic media assets'
            },
            {
                option: 'Code generation or analysis',
                main: 'Code generation or analysis',
                sub: 'Programming help, code review, dev tooling'
            }
        ]
    },
    {
        id: 'audience',
        text: 'Who can interact with the AI system?',
        subtext: 'Expanding access from employees to customers or the public multiplies privacy obligations and fraud risk.',
        answers: [
            {
                option: 'Internal users only',
                main: 'Internal users only',
                sub: 'Employees and authorized personnel'
            },
            {
                option: 'External users only',
                main: 'External users only',
                sub: 'Customers, partners, or the public'
            },
            {
                option: 'Both internal and external users',
                main: 'Both internal and external users',
                sub: 'Mixed access with different permission levels'
            }
        ]
    },
    {
        id: 'input_sensitivity',
        text: 'What is the highest sensitivity of data users may enter?',
        subtext: 'Data classification determines encryption, logging, retention, and breach-notification duties.',
        answers: [
            {
                option: 'Public or non-sensitive',
                main: 'Public or non-sensitive',
                sub: 'General information, public datasets, benign content'
            },
            {
                option: 'Confidential or personal',
                main: 'Confidential or personal',
                sub: 'PII, customer data, employee records'
            },
            {
                option: 'Highly sensitive IP or strategic',
                main: 'Highly sensitive IP or strategic',
                sub: 'Trade secrets, proprietary algorithms, strategic plans'
            }
        ]
    },
    {
        id: 'data_access',
        text: 'Does the system fetch any additional data at runtime beyond the user prompt (for example through RAG, vector search, or live web queries)?',
        subtext: 'Runtime lookups open new ingress and egress paths that must be authenticated, authorised, and monitored. RAG systems are particularly vulnerable to context window poisoning attacks.',
        answers: [
            {
                option: 'Yes',
                main: 'Yes',
                sub: 'Queries internal repositories, private APIs, or external sources such as web search'
            },
            {
                option: 'No',
                main: 'No',
                sub: 'Uses only the model\'s weights and the user\'s current prompt'
            }
        ]
    },
    {
        id: 'training_method',
        text: 'Has the model been fine-tuned?',
        subtext: 'Fine-tuning introduces fresh data-handling duties and version-control overhead. Model supply chain attacks through poisoned weights are a growing concern.',
        answers: [
            {
                option: 'No, base model only',
                main: 'No, base model only',
                sub: 'Off the shelf, no extra training'
            },
            {
                option: 'Yes, fine-tuned with public or non-sensitive data',
                main: 'Yes, fine-tuned with public or non-sensitive data',
                sub: 'Additional training on public or non-sensitive datasets'
            },
            {
                option: 'Yes, fine-tuned with sensitive or proprietary data',
                main: 'Yes, fine-tuned with sensitive or proprietary data',
                sub: 'Training on proprietary or confidential organizational data'
            }
        ]
    },
    {
        id: 'model_origin',
        text: 'Is the foundation model open source or proprietary?',
        subtext: 'Model origin affects licensing terms, patch cadence, and supply-chain exposure. Malicious model weights and backdoored packages pose supply chain risks.',
        answers: [
            {
                option: 'Open source model',
                main: 'Open source model',
                sub: 'Llama, Mistral'
            },
            {
                option: 'Proprietary service',
                main: 'Proprietary service',
                sub: 'OpenAI, Anthropic, Gemini'
            }
        ]
    },
    {
        id: 'statefulness',
        text: 'Does the system retain conversation history?',
        subtext: 'Persisted chat logs widen the privacy surface and expand incident response scope.',
        answers: [
            {
                option: 'Yes',
                main: 'Yes',
                sub: 'Stores user context across sessions'
            },
            {
                option: 'No',
                main: 'No',
                sub: 'Each interaction is stateless'
            }
        ]
    },
    {
        id: 'deployment_architecture',
        text: 'How is the system deployed? (Select all that apply)',
        subtext: 'Network posture drives identity, observability, and data-egress controls.',
        answers: [
            {
                option: "On-Premises",
                main: "On-Premises",
                sub: "AI infrastructure and applications run entirely on servers physically located within the organization's own data centers. The organization maintains full control over hardware, software, and data."
            },
            {
                option: 'Public Cloud',
                main: 'Public Cloud',
                sub: 'Running AI workloads on shared infrastructure provided by vendors like AWS, Azure, or Google Cloud. Resources are accessed over the internet and billed on a pay-as-you-go basis.'
            },
            {
                option: 'Private Cloud',
                main: 'Private Cloud',
                sub: 'Dedicated cloud infrastructure used exclusively by one organization. This can be hosted on-premises in the organization\'s own data center or hosted in a vendor\'s data center but on dedicated hardware.'
            },
            {
                option: 'Hybrid Cloud',
                main: 'Hybrid Cloud',
                sub: 'Combines cloud environments (public or private) with on-premises infrastructure, with orchestration between the platforms. Common patterns include training models in the cloud while deploying on-premises, keeping data on-premises while compute happens in the cloud, or using cloud bursting for peak AI workloads.'
            },
            {
                option: 'Multi-Cloud',
                main: 'Multi-Cloud',
                sub: 'Using multiple public cloud providers such as AWS and Azure for different AI workloads or capabilities. Organizations often adopt this approach to leverage specialized AI services from different providers, avoid vendor lock-in, or meet data residency requirements.'
            },
            {
                option: 'Edge',
                main: 'Edge',
                sub: 'Runs AI inference on distributed devices closer to where data is generated, such as IoT devices, branch locations, or mobile devices, rather than in centralized data centers.'
            }
        ]
    },
    {
        id: 'agency',
        text: 'Can the system trigger external actions or tool calls?',
        subtext: 'The moment a model can change real systems, misuse risk shifts from bad answers to bad actions. MCP (Model Context Protocol) enables agentic systems but requires careful security controls.',
        answers: [
            {
                option: 'No',
                main: 'No',
                sub: 'It only delivers information or recommendations'
            },
            {
                option: 'Yes',
                main: 'Yes',
                sub: 'It can invoke tools, call APIs, or modify data and systems'
            }
        ]
    },
    {
        id: 'autonomy_level',
        text: 'If yes, how is oversight handled?',
        subtext: 'The autonomy level dictates how much real-time control and auditing you need. Multi-agent orchestration introduces additional coordination and security challenges.',
        answers: [
            {
                option: 'Human in the loop',
                main: 'Human in the loop',
                sub: 'Each action needs explicit approval'
            },
            {
                option: 'Fully autonomous',
                main: 'Fully autonomous',
                sub: 'Executes actions without real-time human review'
            }
        ]
    }
];

// Updated risk analysis data to match new questions and 2026 landscape
const riskAnalysis = {
    'domain': {
        'General-purpose, non-critical': {
            frameworks: {
                'NIST AI RMF': ['MAP-1.1: Context understanding', 'MEASURE-2.5: Information validity'],
                'OWASP Top 10 for LLM Apps': ['LLM01:2025 Prompt Injection', 'LLM09:2025 Misinformation'],
                'EU AI Act': ['Article 50: Transparency obligations', 'Limited-risk system requirements']
            }
        },
        'Regulated or high-stakes': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-1: Risk Management Process', 'MEASURE-2.7: Security resilience', 'MANAGE-2.4: System controls'],
                'OWASP Top 10 for LLM Apps': ['LLM02:2025 Sensitive Information Disclosure', 'LLM06:2025 Excessive Agency', 'LLM07:2025 System Prompt Leakage'],
                'EU AI Act': ['Annex III: High-risk AI systems', 'Article 9: Risk management system (in effect Aug 2026)', 'Article 10: Data governance']
            }
        }
    },
    'deployment_scenario': {
        'Vendor AI SaaS product': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-5: Third-Party Relationships', 'GOVERN-1: Risk Management Process'],
                'OWASP Top 10 for LLM Apps': ['LLM03:2025 Supply Chain', 'LLM09:2025 Misinformation'],
                'EU AI Act': ['Article 26: Obligations of deployers', 'Article 27: Fundamental rights impact assessment']
            }
        },
        'AI feature added to an existing vendor product': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-5: Third-Party Relationships', 'GOVERN-2: Organizational structures and processes'],
                'OWASP Top 10 for LLM Apps': ['LLM03:2025 Supply Chain', 'LLM06:2025 Excessive Agency'],
                'EU AI Act': ['Article 26: Obligations of deployers', 'Article 25: Obligations of providers of AI systems']
            }
        },
        'Homegrown AI': {
            frameworks: {
                'NIST AI RMF': ['MAP-1: Contextual Understanding', 'MAP-2.3, MEASURE-2.5: TEVV processes', 'GOVERN-1: Risk Management Process'],
                'OWASP Top 10 for LLM Apps': ['LLM01:2025 Prompt Injection', 'LLM04: Data and Model Poisoning', 'LLM05:2025 Improper Output Handling', 'LLM03:2025 Supply Chain'],
                'EU AI Act': ['Article 16: Obligations of providers', 'Chapter III, Section 2: Requirements for high-risk AI systems', 'Article 9: Risk management system']
            }
        }
    },
    'capabilities': {
        'Conversational interaction': {
            frameworks: {
                'NIST AI RMF': ['MAP-1.1: Context understanding', 'MEASURE-2.5: Information validity'],
                'OWASP Top 10 for LLM Apps': ['LLM01:2025 Prompt Injection', 'LLM09:2025 Misinformation'],
                'EU AI Act': ['Article 50: Transparency obligations']
            }
        },
        'Text generation': {
            frameworks: {
                'NIST AI RMF': ['MEASURE-2.5: Validity and reliability'],
                'OWASP Top 10 for LLM Apps': ['LLM09:2025 Misinformation'],
                'EU AI Act': ['Article 50(2),(4): Synthetic content disclosure', 'Article 53(1)(c): Copyright compliance']
            }
        },
        'Image, audio, or video generation': {
            frameworks: {
                'OWASP Top 10 for LLM Apps': ['LLM09:2025 Misinformation'],
                'EU AI Act': ['Article 50(2),(4): Deep fake disclosure', 'Article 5(1)(e): Facial recognition restrictions']
            }
        },
        'Code generation or analysis': {
            frameworks: {
                'OWASP Top 10 for LLM Apps': ['LLM05:2025 Improper Output Handling', 'LLM09:2025 Misinformation', 'LLM03:2025 Supply Chain'],
                'EU AI Act': ['High-risk obligations if code for high-risk systems']
            }
        }
    },
    'audience': {
        'Internal users only': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-2.1: Role establishment', 'GOVERN-2.2: Personnel training'],
                'OWASP Top 10 for LLM Apps': ['LLM02:2025 Sensitive Information Disclosure', 'LLM06:2025 Excessive Agency'],
                'EU AI Act': ['Article 26: Obligations of deployers', 'Annex III, Point 4: Employment management systems']
            }
        },
        'External users only': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-4.1: Safety-first mindset', 'MEASURE-2.7: Security resilience'],
                'OWASP Top 10 for LLM Apps': ['LLM01:2025 Prompt Injection', 'LLM05:2025 Improper Output Handling', 'LLM10:2025 Unbounded Consumption'],
                'EU AI Act': ['Article 50(1): AI system disclosure']
            }
        },
        'Both internal and external users': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-2: Role-based access', 'MEASURE-2.7: Multi-context security'],
                'OWASP Top 10 for LLM Apps': ['LLM01:2025 Prompt Injection', 'LLM02:2025 Sensitive Information Disclosure', 'LLM06:2025 Excessive Agency'],
                'EU AI Act': ['Article 26: Mixed deployment obligations', 'Article 50: Transparency requirements']
            }
        }
    },
    'input_sensitivity': {
        'Public or non-sensitive': {
            frameworks: {
                'NIST AI RMF': ['MAP-2.3: Data collection validation'],
                'OWASP Top 10 for LLM Apps': ['LLM01:2025 Prompt Injection']
            }
        },
        'Confidential or personal': {
            frameworks: {
                'NIST AI RMF': ['MEASURE-2.10: Privacy risk examination'],
                'OWASP Top 10 for LLM Apps': ['LLM02:2025 Sensitive Information Disclosure'],
                'EU AI Act': ['Article 26(9): Data Protection Impact Assessment', 'Article 10(5): Special category data processing']
            }
        },
        'Highly sensitive IP or strategic': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-5: Third-party relationships', 'MEASURE-2.7: Security testing'],
                'OWASP Top 10 for LLM Apps': ['LLM02:2025 Sensitive Information Disclosure', 'LLM03:2025 Supply Chain'],
                'EU AI Act': ['Article 78: Confidentiality protection']
            }
        }
    },
    'data_access': {
        'Yes': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-1.2: Data governance alignment'],
                'OWASP Top 10 for LLM Apps': ['LLM08:2025 Vector and Embedding Weaknesses', 'LLM01:2025 Prompt Injection via RAG poisoning'],
                'EU AI Act': ['Article 10: Data governance requirements']
            }
        },
        'No': {
            frameworks: {
                'NIST AI RMF': ['MAP-1.1: System limitation documentation'],
                'OWASP Top 10 for LLM Apps': ['LLM09:2025 Misinformation'],
                'EU AI Act': ['Simplified compliance due to no runtime data']
            }
        }
    },
    'training_method': {
        'No, base model only': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-6.1: Third-party entity policies', 'MANAGE-3.2: Pre-trained model monitoring'],
                'OWASP Top 10 for LLM Apps': ['LLM03:2025 Supply Chain (malicious model weights, backdoored packages)'],
                'EU AI Act': ['Article 25(4): Provider agreements']
            }
        },
        'Yes, fine-tuned with public or non-sensitive data': {
            frameworks: {
                'NIST AI RMF': ['MAP-2.3: Data collection due diligence'],
                'OWASP Top 10 for LLM Apps': ['LLM04: Data and Model Poisoning'],
                'EU AI Act': ['Article 10: Data quality requirements']
            }
        },
        'Yes, fine-tuned with sensitive or proprietary data': {
            frameworks: {
                'NIST AI RMF': ['MEASURE-2.10: Privacy risk documentation'],
                'OWASP Top 10 for LLM Apps': ['LLM02:2025 Sensitive Information Disclosure'],
                'EU AI Act': ['Article 10(5): Special category data restrictions']
            }
        }
    },
    'model_origin': {
        'Open source model': {
            frameworks: {
                'OWASP Top 10 for LLM Apps': ['LLM03:2025 Supply Chain (verify checksums, scan for backdoors)'],
                'EU AI Act': ['Article 2(12): Open-source exemptions unless high-risk system']
            }
        },
        'Proprietary service': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-5: Third-party relationships'],
                'OWASP Top 10 for LLM Apps': ['LLM02:2025 Sensitive Information Disclosure'],
                'EU AI Act': ['Article 26: Deployer obligations', 'Article 25(4): Provider agreements']
            }
        }
    },
    'statefulness': {
        'Yes': {
            frameworks: {
                'NIST AI RMF': ['MEASURE-2.10: Privacy risk examination'],
                'OWASP Top 10 for LLM Apps': ['LLM02:2025 Sensitive Information Disclosure'],
                'EU AI Act': ['GDPR compliance for stored personal data']
            }
        },
        'No': {
            frameworks: {
                'NIST AI RMF': ['MAP-1.1: Stateless limitation documentation'],
                'OWASP Top 10 for LLM Apps': ['Mitigates LLM02 risks'],
                'EU AI Act': ['GDPR data minimization alignment']
            }
        }
    },
    'deployment_architecture': {
        'On-Premises': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-3.1: Internal controls', 'MEASURE-2.7: Physical security'],
                'OWASP Top 10 for LLM Apps': ['LLM03:2025 Supply Chain'],
                'EU AI Act': ['Article 15: Physical infrastructure cybersecurity']
            }
        },
        'Public Cloud': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-5: Third-party relationships'],
                'OWASP Top 10 for LLM Apps': ['LLM10:2025 Unbounded Consumption', 'LLM03:2025 Supply Chain'],
                'EU AI Act': ['Article 15: Cybersecurity requirements']
            }
        },
        'Private Cloud': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-5: Third-party relationships', 'MEASURE-2.7: Dedicated infrastructure security'],
                'OWASP Top 10 for LLM Apps': ['LLM03:2025 Supply Chain'],
                'EU AI Act': ['Article 15: Enhanced cybersecurity for dedicated systems']
            }
        },
        'Hybrid Cloud': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-3.1: Multi-environment controls', 'MEASURE-2.7: Cross-platform security'],
                'OWASP Top 10 for LLM Apps': ['LLM06:2025 Excessive Agency', 'LLM03:2025 Supply Chain'],
                'EU AI Act': ['Article 15: Enhanced cybersecurity for connected systems']
            }
        },
        'Multi-Cloud': {
            frameworks: {
                'NIST AI RMF': ['GOVERN-5: Multiple third-party relationships', 'MEASURE-2.7: Multi-vendor security'],
                'OWASP Top 10 for LLM Apps': ['LLM03:2025 Supply Chain', 'LLM10:2025 Unbounded Consumption'],
                'EU AI Act': ['Article 15: Cross-provider cybersecurity requirements']
            }
        },
        'Edge': {
            frameworks: {
                'NIST AI RMF': ['MEASURE-2.7: Distributed system security'],
                'OWASP Top 10 for LLM Apps': ['LLM03:2025 Supply Chain vulnerabilities', 'LLM10:2025 Unbounded Consumption'],
                'EU AI Act': ['Article 15: Edge device cybersecurity']
            }
        }
    },
    'agency': {
        'No': {
            frameworks: {
                'NIST AI RMF': ['MEASURE-2.5: Information validity'],
                'OWASP Top 10 for LLM Apps': ['LLM09:2025 Misinformation'],
                'EU AI Act': ['Article 50: Transparency obligations']
            }
        },
        'Yes': {
            frameworks: {
                'NIST AI RMF': ['MANAGE-2.4: System deactivation mechanisms'],
                'OWASP Top 10 for LLM Apps': ['LLM06:2025 Excessive Agency', 'MCP security controls'],
                'EU AI Act': ['Article 14: Human oversight requirements']
            }
        }
    },
    'autonomy_level': {
        'Human in the loop': {
            frameworks: {
                'OWASP Top 10 for LLM Apps': ['LLM06:2025 Excessive Agency mitigation'],
                'EU AI Act': ['Article 14: Human oversight implementation']
            }
        },
        'Fully autonomous': {
            frameworks: {
                'NIST AI RMF': ['MANAGE-2.4: Emergency stop mechanisms'],
                'OWASP Top 10 for LLM Apps': ['LLM06:2025 Excessive Agency - extreme risk', 'Multi-agent orchestration security'],
                'EU AI Act': ['Article 14: Real-time monitoring and stop button']
            }
        }
    }
};
