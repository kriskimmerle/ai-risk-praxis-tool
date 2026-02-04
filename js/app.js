// Application state
let currentQuestion = 0;
let answers = {};
let selectedAnswer = null;
let selectedAnswers = []; // For multi-select questions

function startAssessment() {
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('questionScreen').classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('questionSubtext').textContent = question.subtext || '';
    
    // Update progress
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progressPercent + '%';
    document.getElementById('progressText').textContent = `Step ${currentQuestion + 1} of ${questions.length}`;
    
    // Handle back button visibility
    document.getElementById('backBtn').style.visibility = currentQuestion === 0 ? 'hidden' : 'visible';
    
    // Clear and populate answers
    const container = document.getElementById('answersContainer');
    container.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const card = document.createElement('div');
        card.className = 'answer-card';
        card.setAttribute('data-option', answer.option);
        card.setAttribute('data-question', question.id);
        card.setAttribute('data-index', index);
        
        const isMultiSelect = question.id === 'capabilities' || question.id === 'deployment_architecture';
        const controlType = isMultiSelect ? 'checkbox' : 'radio';
        
        const infoContent = getAnswerInfo(question.id, answer.option);
        
        card.innerHTML = `
            <div class="${controlType}"></div>
            <div class="answer-main">${answer.main}</div>
            <div class="answer-sub">${answer.sub}</div>
            <div class="info-button" onclick="toggleInfo(this)">i</div>
            <div class="info-section">${infoContent}</div>
        `;
        
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.info-button')) {
                if (isMultiSelect) {
                    toggleSelection(answer.option, card);
                } else {
                    selectAnswer(answer.option, card);
                }
            }
        });
        
        container.appendChild(card);
    });
    
    // Restore previous selections if going back
    restorePreviousSelections();
    
    // Skip autonomy question if agency is "No"
    if (question.id === 'autonomy_level' && answers['agency'] === 'No') {
        nextQuestion();
        return;
    }
}

function selectAnswer(option, cardElement) {
    // Remove previous selection
    document.querySelectorAll('.answer-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select current card
    cardElement.classList.add('selected');
    selectedAnswer = option;
    
    // Enable continue button
    document.getElementById('continueBtn').disabled = false;
}

function toggleSelection(option, cardElement) {
    const isSelected = cardElement.classList.contains('selected');
    
    if (isSelected) {
        cardElement.classList.remove('selected');
        selectedAnswers = selectedAnswers.filter(answer => answer !== option);
    } else {
        cardElement.classList.add('selected');
        selectedAnswers.push(option);
    }
    
    // Enable/disable continue button based on selections
    document.getElementById('continueBtn').disabled = selectedAnswers.length === 0;
}

function toggleInfo(button) {
    const infoSection = button.parentElement.querySelector('.info-section');
    infoSection.classList.toggle('expanded');
}

function getAnswerInfo(questionId, option) {
    const analysis = riskAnalysis[questionId]?.[option];
    if (!analysis?.frameworks) {
        return '<p>No specific framework guidance available for this option.</p>';
    }
    
    let content = '<h5>Framework Considerations:</h5><ul>';
    
    Object.entries(analysis.frameworks).forEach(([framework, controls]) => {
        content += `<li><strong>${framework}:</strong> ${controls.join(', ')}</li>`;
    });
    
    content += '</ul>';
    return content;
}

function nextQuestion() {
    // Save current answer
    const question = questions[currentQuestion];
    if (question.id === 'capabilities' || question.id === 'deployment_architecture') {
        answers[question.id] = [...selectedAnswers];
    } else {
        answers[question.id] = selectedAnswer;
    }
    
    // Reset selections
    selectedAnswer = null;
    selectedAnswers = [];
    
    // Move to next question or show results
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
    
    // Disable continue button
    document.getElementById('continueBtn').disabled = true;
}

function goBack() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function restorePreviousSelections() {
    const question = questions[currentQuestion];
    const savedAnswer = answers[question.id];
    
    if (!savedAnswer) return;
    
    if ((question.id === 'capabilities' || question.id === 'deployment_architecture') && Array.isArray(savedAnswer)) {
        // Multi-select restoration
        selectedAnswers = [...savedAnswer];
        savedAnswer.forEach(option => {
            const card = document.querySelector(`[data-option="${option}"]`);
            if (card) {
                card.classList.add('selected');
            }
        });
        
        document.getElementById('continueBtn').disabled = selectedAnswers.length === 0;
    } else {
        // Single-select restoration
        selectedAnswer = savedAnswer;
        const card = document.querySelector(`[data-option="${savedAnswer}"]`);
        if (card) {
            card.classList.add('selected');
            document.getElementById('continueBtn').disabled = false;
        }
    }
}

function showResults() {
    document.getElementById('questionScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');
    
    generateResults();
}

function generateResults() {
    const narrativeSummary = document.getElementById('narrativeSummary');
    const frameworksDashboard = document.getElementById('frameworksDashboard');
    
    // Insert risk metrics dashboard before narrative summary
    const riskMetrics = generateRiskMetrics();
    narrativeSummary.insertAdjacentHTML('beforebegin', riskMetrics);
    
    narrativeSummary.innerHTML = generateNarrativeSummary();
    
    // Add framework distribution before framework dashboard
    const frameworkDistribution = generateFrameworkDistribution();
    if (frameworkDistribution) {
        frameworksDashboard.insertAdjacentHTML('beforebegin', frameworkDistribution);
    }
    
    frameworksDashboard.innerHTML = generateFrameworkAnalysis();
}

function calculateRiskMetrics() {
    const metrics = {
        audienceExposure: 0,
        dataSensitivity: 0,
        systemComplexity: 0,
        deploymentRisk: 0,
        overallRisk: 0
    };
    
    // Audience Exposure (0-10)
    if (answers['audience'] === 'External users only') metrics.audienceExposure = 8;
    else if (answers['audience'] === 'Both internal and external users') metrics.audienceExposure = 6;
    else metrics.audienceExposure = 3;
    
    // Data Sensitivity (0-10)
    if (answers['input_sensitivity'] === 'Highly sensitive IP or strategic') metrics.dataSensitivity = 10;
    else if (answers['input_sensitivity'] === 'Confidential or personal') metrics.dataSensitivity = 7;
    else metrics.dataSensitivity = 2;
    
    // System Complexity (0-10)
    let complexity = 0;
    const capabilities = answers['capabilities'] || [];
    complexity += capabilities.length * 2;
    
    if (answers['agency'] === 'Yes') complexity += 3;
    if (answers['autonomy_level'] === 'Fully autonomous') complexity += 2;
    if (answers['data_access'] === 'Yes') complexity += 2;
    if (answers['statefulness'] === 'Yes') complexity += 1;
    
    metrics.systemComplexity = Math.min(complexity, 10);
    
    // Deployment Risk (0-10)
    const deploymentTypes = answers['deployment_architecture'] || [];
    let deploymentRisk = 0;
    
    if (deploymentTypes.includes('Multi-Cloud')) deploymentRisk += 3;
    if (deploymentTypes.includes('Hybrid Cloud')) deploymentRisk += 2;
    if (deploymentTypes.includes('Public Cloud')) deploymentRisk += 2;
    if (deploymentTypes.includes('Edge')) deploymentRisk += 2;
    if (deploymentTypes.length > 1) deploymentRisk += 2;
    
    metrics.deploymentRisk = Math.min(deploymentRisk, 10);
    
    // Overall Risk (weighted average)
    metrics.overallRisk = Math.round(
        (metrics.audienceExposure * 0.25 + 
         metrics.dataSensitivity * 0.35 + 
         metrics.systemComplexity * 0.25 + 
         metrics.deploymentRisk * 0.15)
    );
    
    return metrics;
}

function getRiskLevel(score) {
    if (score <= 3) return 'low';
    if (score <= 6) return 'medium';
    return 'high';
}

function generateProgressRing(value, level) {
    const circumference = 2 * Math.PI * 45; // radius = 45 (for 100px container)
    const offset = circumference - (value / 10) * circumference;
    
    return `
        <div class="progress-ring">
            <svg>
                <circle class="background" cx="50" cy="50" r="45"></circle>
                <circle class="progress ${level}" cx="50" cy="50" r="45" 
                        stroke-dasharray="${circumference}" 
                        stroke-dashoffset="${offset}"></circle>
            </svg>
        </div>
    `;
}

function generateFrameworkDistribution() {
    const frameworks = extractFrameworkControls();
    const nistCount = frameworks['NIST AI RMF']?.length || 0;
    const owaspCount = frameworks['OWASP Top 10 for LLM Apps']?.length || 0;
    const euCount = frameworks['EU AI Act']?.length || 0;
    const total = nistCount + owaspCount + euCount;
    
    if (total === 0) return '';
    
    const nistPercentage = (nistCount / total) * 100;
    const owaspPercentage = (owaspCount / total) * 100;
    const nistAngle = (nistPercentage / 100) * 360;
    const owaspEnd = nistAngle + (owaspPercentage / 100) * 360;
    
    return `
        <div class="framework-distribution">
            <h3>Framework Coverage Distribution</h3>
            <div class="framework-donut" style="--nist-angle: ${nistAngle}deg; --owasp-end: ${owaspEnd}deg;"></div>
            <div class="framework-legend">
                <div class="legend-item">
                    <div class="legend-color" style="background: #e53e3e;"></div>
                    <span>NIST AI RMF (${nistCount})</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #f97316;"></div>
                    <span>OWASP Top 10 (${owaspCount})</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #3b82f6;"></div>
                    <span>EU AI Act (${euCount})</span>
                </div>
            </div>
            <p class="references-subtitle" style="margin-top: 1.5rem; text-align: center;">Click any reference below to go directly to the official framework documentation</p>
        </div>
    `;
}

function generateRiskBreakdown() {
    const metrics = calculateRiskMetrics();
    
    const riskDimensions = [
        { label: 'Data Sensitivity', value: metrics.dataSensitivity, level: getRiskLevel(metrics.dataSensitivity) },
        { label: 'System Complexity', value: metrics.systemComplexity, level: getRiskLevel(metrics.systemComplexity) },
        { label: 'Audience Exposure', value: metrics.audienceExposure, level: getRiskLevel(metrics.audienceExposure) },
        { label: 'Deployment Risk', value: metrics.deploymentRisk, level: getRiskLevel(metrics.deploymentRisk) }
    ];
    
    const barsHtml = riskDimensions.map(dimension => `
        <div class="risk-bar">
            <span class="bar-label">${dimension.label}</span>
            <div class="bar-track">
                <div class="bar-fill ${dimension.level}" style="--bar-width: ${dimension.value * 10}%; width: ${dimension.value * 10}%;"></div>
            </div>
            <span style="min-width: 30px; font-weight: 600; color: var(--color-text-primary);">${dimension.value}/10</span>
        </div>
    `).join('');
    
    return `
        <div class="risk-breakdown">
            <h3>Risk Dimension Breakdown</h3>
            <p class="risk-breakdown-subtitle">Each dimension contributes to your overall risk score based on system configuration. Data sensitivity is weighted most heavily (35%), followed by system complexity and audience exposure (25% each), with deployment architecture contributing 15%.</p>
            <div class="risk-bars">
                ${barsHtml}
            </div>
        </div>
    `;
}

function generateRiskMetrics() {
    const metrics = calculateRiskMetrics();
    const frameworks = extractFrameworkControls();
    
    const totalControls = Object.values(frameworks).reduce((sum, controls) => sum + controls.length, 0);
    const criticalControls = Object.values(frameworks).reduce((sum, controls) => {
        return sum + controls.filter(control => 
            control.includes('LLM01') || control.includes('LLM06') || 
            control.includes('GOVERN-1') || control.includes('Article 9')
        ).length;
    }, 0);
    
    const overallLevel = getRiskLevel(metrics.overallRisk);
    const complexityLevel = getRiskLevel(metrics.systemComplexity);
    const riskBadgeText = overallLevel.toUpperCase() + ' RISK';
    
    return `
        <div class="risk-dashboard">
            <!-- Hero Risk Section -->
            <div class="hero-risk-section">
                <div class="hero-risk-value ${overallLevel}">${metrics.overallRisk}/10</div>
                <div class="hero-risk-label">Overall Risk Score</div>
                <div class="risk-badge ${overallLevel}">${riskBadgeText}</div>
            </div>

            <!-- Risk Metrics Grid -->
            <div class="risk-metrics-dashboard">
                <div class="risk-metric-card">
                    <span class="risk-metric-value ${criticalControls > 5 ? 'high' : criticalControls > 2 ? 'medium' : 'low'}">${criticalControls}</span>
                    <span class="risk-metric-label" style="font-weight: 700;"><strong>Critical Controls</strong></span>
                    <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 0.75rem; text-align: center; line-height: 1.4; max-width: 200px;">
                        ${criticalControls > 5 
                            ? 'Your system triggers multiple high-priority security controls across prompt injection protection, agency limitations, and governance requirements.' 
                            : criticalControls > 2 
                            ? 'Your system requires several important security controls, particularly around user input validation and access management.' 
                            : 'Your system has a focused set of essential security controls to implement.'}
                    </div>
                </div>
                
                <div class="risk-metric-card">
                    <span class="risk-metric-value ${totalControls > 15 ? 'high' : totalControls > 8 ? 'medium' : 'low'}">${totalControls}</span>
                    <span class="risk-metric-label" style="font-weight: 700;"><strong>Total Framework Controls</strong></span>
                    <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 0.75rem; text-align: center; line-height: 1.4; max-width: 200px;">
                        ${totalControls > 15 
                            ? 'Your system requires comprehensive coverage across multiple frameworks, indicating a complex risk profile that demands thorough security implementation.' 
                            : totalControls > 8 
                            ? 'Your system needs moderate framework coverage with focus on key security areas identified by your configuration.' 
                            : 'Your system has a streamlined set of framework requirements, allowing for focused implementation efforts.'}
                    </div>
                </div>
            </div>

            <!-- Risk Breakdown -->
            ${generateRiskBreakdown()}
        </div>
    `;
}

function generateNarrativeSummary() {
    let description = `<h3>Summary</h3><div class="narrative-text">`;
    
    const domain = answers['domain'];
    const deploymentScenario = answers['deployment_scenario'];
    const audience = answers['audience'];
    const capabilities = answers['capabilities'] || [];
    const hasAgency = answers['agency'] === 'Yes';
    const isAutonomous = answers['autonomy_level'] === 'Fully autonomous';
    const isAgentic = hasAgency || isAutonomous || capabilities.length > 2;
    
    description += `<p>Your AI system operates in a <strong>${domain.toLowerCase()}</strong> domain, delivered as <strong>${deploymentScenario.toLowerCase()}</strong> with <strong>${audience.toLowerCase()}</strong> access.`;
    
    if (capabilities.length > 0) {
        description += ` The system's capabilities include <strong>${capabilities.join(', ').toLowerCase()}</strong>, each bringing specific risk considerations from prompt injection to content authenticity requirements.`;
    }
    
    description += `</p>`;
    
    // Updated EU AI Act timeline section
    if (domain === 'Regulated or high-stakes') {
        description += `<p><strong>EU AI Act Compliance Timeline:</strong> Your system likely falls under high-risk AI system requirements. Key enforcement dates: prohibited practices became enforceable February 2, 2025; GPAI model rules became applicable August 2, 2025; and comprehensive high-risk AI system requirements take effect August 2, 2026. Organizations deploying high-risk systems must ensure compliance with risk management (Article 9), data governance (Article 10), technical documentation (Article 11), and human oversight (Article 14) requirements by the August 2026 deadline.</p>`;
    }
    
    // Add agentic system considerations with MCP and multi-agent orchestration
    if (isAgentic) {
        description += `<p><strong>Agentic System Considerations:</strong> Your system exhibits agentic characteristics through `;
        
        const agenticTraits = [];
        if (hasAgency) agenticTraits.push('tool execution capabilities');
        if (isAutonomous) agenticTraits.push('autonomous operation');
        if (capabilities.length > 2) agenticTraits.push('multi-function coordination');
        if (answers['statefulness'] === 'Yes') agenticTraits.push('persistent memory');
        
        description += agenticTraits.join(', ') + '. ';
        
        description += `Agentic systems create expanded attack surfaces across four critical hand-offs: user inputs to agent instructions, agent to connected tools, agent to memory storage, and between multiple agents. <strong>Model Context Protocol (MCP) security</strong> is essential when implementing agentic systems—ensure proper authentication, authorization, and sandboxing of tool calls. <strong>Multi-agent orchestration</strong> introduces coordination risks including conflicting objectives, cascading failures, and amplified security vulnerabilities when agents communicate. These systems require enhanced security practices including persistent identity binding, fine-grained short-lived credentials, unified telemetry with causal links, and fork-safe controls to prevent security bypasses in spawned processes. Reference the <strong>OWASP AI Testing Guide (AITG v1, Nov 2025)</strong> for comprehensive testing methodologies specific to agentic systems.</p>`;
    }
    
    // Add memory and data considerations with RAG poisoning emphasis
    if (answers['statefulness'] === 'Yes' || answers['input_sensitivity'] !== 'Public or non-sensitive' || answers['data_access'] === 'Yes') {
        description += `<p><strong>Data Security Focus:</strong> `;
        
        if (answers['statefulness'] === 'Yes') {
            description += `Your system's persistent memory capabilities require careful session isolation, data retention policies, and memory poisoning protections. `;
        }
        
        if (answers['data_access'] === 'Yes') {
            description += `<strong>Context window and prompt injection via RAG poisoning</strong> pose significant risks when fetching runtime data. Attackers can inject malicious content into vector databases or knowledge bases that gets retrieved and included in the model's context, effectively bypassing input validation. Implement strict validation of retrieved content, content signing, and anomaly detection on RAG queries. `;
        }
        
        if (answers['input_sensitivity'] === 'Confidential or personal') {
            description += `Processing confidential and personally identifiable information demands strict data governance, encryption at rest and in transit, and comprehensive audit trails. `;
        } else if (answers['input_sensitivity'] === 'Highly sensitive IP or strategic') {
            description += `Handling sensitive intellectual property and strategic data requires the highest level of protection including air-gapped deployment considerations and enhanced access controls. `;
        }
        
        description += `</p>`;
    }
    
    // Add deployment architecture considerations
    const deploymentTypes = answers['deployment_architecture'] || [];
    const hasHybridOrMultiCloud = deploymentTypes.includes('Hybrid Cloud') || deploymentTypes.includes('Multi-Cloud');
    const hasDataAccess = answers['data_access'] === 'Yes';
    
    if (hasHybridOrMultiCloud || hasDataAccess || deploymentTypes.length > 1) {
        description += `<p><strong>Network and Integration Risks:</strong> `;
        
        if (deploymentTypes.length > 1) {
            description += `Your multi-environment deployment across ${deploymentTypes.join(', ').toLowerCase()} creates complex security boundaries requiring coordinated controls. `;
        }
        
        if (hasHybridOrMultiCloud) {
            description += `Hybrid and multi-cloud architectures expand the attack surface through network connections to multiple systems and providers. `;
        }
        
        if (hasDataAccess) {
            description += `Real-time data access capabilities require robust API security, connection monitoring, and data validation to prevent unauthorized access or data poisoning. `;
        }
        
        description += `Consider implementing network segmentation, API gateways with strict authentication, and continuous monitoring of all external connections.</p>`;
    }
    
    // Add AI supply chain attack considerations
    if (answers['model_origin'] === 'Open source model' || answers['training_method'] !== 'No, base model only') {
        description += `<p><strong>AI Supply Chain Security:</strong> <strong>Malicious model weights and backdoored packages</strong> represent growing threats in the AI supply chain. When using open-source models, verify checksums of downloaded weights, scan for backdoors using tools like HiddenLayer ModelScan, and pin specific versions rather than using "latest." For fine-tuning or training, audit all dependencies for known vulnerabilities and implement model provenance tracking. Supply chain attacks can introduce subtle behavioral changes that evade traditional security controls while compromising model integrity.</p>`;
    }
    
    // Add specific mitigation recommendations as part of main narrative
    description += `<p><strong>Specific Mitigation Recommendations:</strong></p>
        <p><strong>Prompt Injection:</strong> Strip system/moderator tokens from user input; apply a deny-list on dangerous verbs; wrap model calls in a read-only transaction by default.</p>
        <p><strong>Output Misuse:</strong> Apply a second LLM or regex rule-set to check for PII, credentials, or unsafe code blocks before sending to the user.</p>`;
    
    // Supply chain mitigations for open source models
    if (answers['model_origin'] === 'Open source model') {
        description += `<p><strong>Supply Chain Tampering:</strong> Fetch open weights only from a pinned digest; verify checksum; run HiddenLayer ModelScan or equivalent scanning tool before first inference.</p>`;
    }
    
    // Excessive agency mitigations for agentic systems
    if (hasAgency) {
        description += `<p><strong>Excessive Agency:</strong> Require human approval tokens for file-system writes, dev-ops actions, or finance APIs until confidence grows. Implement MCP-compliant tool authentication and least-privilege access patterns.</p>`;
    }
    
    // RAG-specific mitigations
    if (answers['data_access'] === 'Yes') {
        description += `<p><strong>RAG Poisoning Prevention:</strong> Validate and sanitize all retrieved content before including in context; implement content signing for trusted knowledge bases; monitor for anomalous retrieval patterns that may indicate poisoning attempts.</p>`;
    }
    
    // Add practical guidance section
    description += `</div><div class="practical-guidance">
        <h4>Next Steps</h4>
        <ul class="guidance-list">`;
    
    if (isAgentic) {
        description += `
            <li>Implement the four foundational security habits for agentic systems: identity binding, scoped credentials, unified telemetry, and fork-safe controls</li>
            <li>Conduct threat modeling across the six-layer agent stack (serving, model/memory, orchestration, tools, protocols, interaction surfaces)</li>
            <li>Review the OWASP AI Testing Guide (AITG v1) for agent-specific testing methodologies</li>`;
    }
    
    description += `
            <li>Review the framework-specific recommendations below and prioritize based on your system's risk profile</li>
            <li>Develop an implementation roadmap with clear milestones and regular security assessments</li>`;
    
    if (hasAgency || answers['data_access'] === 'Yes') {
        description += `
            <li>Establish continuous monitoring with trace IDs for all tool calls, API interactions, and data access patterns</li>`;
    }
    
    if (isAgentic) {
        description += `
            <li>Plan for regular red team exercises focusing on agent-specific attack vectors including prompt injection, tool abuse, memory poisoning, and MCP protocol vulnerabilities</li>`;
    } else {
        description += `
            <li>Establish ongoing monitoring and assessment processes appropriate for your system's complexity</li>`;
    }
    
    description += `
        </ul>
    </div>`;
    
    return description;
}

function generateFrameworkAnalysis() {
    const frameworks = extractFrameworkControls();
    let html = '';
    
    // Sort frameworks by priority
    const sortedFrameworks = Object.entries(frameworks).sort(([nameA], [nameB]) => {
        const priorities = {
            'NIST AI RMF': 1,
            'OWASP Top 10 for LLM Apps': 2,
            'EU AI Act': 3
        };
        return (priorities[nameA] || 999) - (priorities[nameB] || 999);
    });
    
    sortedFrameworks.forEach(([frameworkName, controls]) => {
        html += generateFrameworkCard(frameworkName, controls);
    });
    
    return html;
}

function extractFrameworkControls() {
    const frameworks = {
        'NIST AI RMF': new Set(),
        'OWASP Top 10 for LLM Apps': new Set(),
        'EU AI Act': new Set()
    };
    
    Object.entries(answers).forEach(([questionId, answer]) => {
        const questionAnalysis = riskAnalysis[questionId];
        if (!questionAnalysis) return;
        
        if (Array.isArray(answer)) {
            // Multi-select question (capabilities)
            answer.forEach(selectedOption => {
                const optionAnalysis = questionAnalysis[selectedOption];
                if (optionAnalysis?.frameworks) {
                    Object.entries(optionAnalysis.frameworks).forEach(([framework, controls]) => {
                        controls.forEach(control => frameworks[framework].add(control));
                    });
                }
            });
        } else {
            // Single-select question
            const optionAnalysis = questionAnalysis[answer];
            if (optionAnalysis?.frameworks) {
                Object.entries(optionAnalysis.frameworks).forEach(([framework, controls]) => {
                    controls.forEach(control => frameworks[framework].add(control));
                });
            }
        }
    });
    
    // Convert Sets to Arrays and sort
    Object.keys(frameworks).forEach(framework => {
        frameworks[framework] = Array.from(frameworks[framework]).sort();
    });
    
    return frameworks;
}

function generateFrameworkCard(frameworkName, controls) {
    if (!controls || controls.length === 0) {
        return `
            <div class="framework-card">
                <h3>${frameworkName}</h3>
                <div class="no-controls">No specific controls identified for your configuration.</div>
            </div>
        `;
    }
    
    const controlsList = controls.map(control => 
        `<li>${createFrameworkLink(frameworkName, control)}</li>`
    ).join('');
    
    return `
        <div class="framework-card">
            <h3>${frameworkName}</h3>
            <ul class="framework-controls">
                ${controlsList}
            </ul>
        </div>
    `;
}

function createFrameworkLink(framework, control) {
    const urls = {
        'NIST AI RMF': getNISTUrl(control),
        'OWASP Top 10 for LLM Apps': getOWASPUrl(control),
        'EU AI Act': getEUActUrl(control)
    };
    
    const url = urls[framework];
    return url ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${control}</a>` : control;
}

function getNISTUrl(control) {
    // Extract category and subcategory from control string
    // Example: "GOVERN-1.1: Context understanding" -> category: "GOVERN", subcategory: "1.1"
    const match = control.match(/^(GOVERN|MAP|MEASURE|MANAGE)-(\d+)(?:\.(\d+))?/);
    
    if (!match) {
        // Fallback to general NIST AI RMF page
        return 'https://airc.nist.gov/AI_RMF_Knowledge_Base/AI_RMF';
    }
    
    const [, category, major, minor] = match;
    const categoryLower = category.toLowerCase();
    
    // Build URL based on pattern: https://airc.nist.gov/airmf-resources/playbook/govern/#govern-1
    // or https://airc.nist.gov/airmf-resources/playbook/govern/#govern-2-1
    let anchor = `${categoryLower}-${major}`;
    if (minor) {
        anchor += `-${minor}`;
    }
    
    return `https://airc.nist.gov/airmf-resources/playbook/${categoryLower}/#${anchor}`;
}

function getOWASPUrl(control) {
    // Extract LLM code from control string
    // Example: "LLM01:2025 Prompt Injection" -> "LLM01"
    const match = control.match(/^(LLM\d{2}):2025/);
    
    if (!match) {
        // Fallback to general OWASP page
        return 'https://genai.owasp.org/llmrisk/';
    }
    
    const llmCode = match[1];
    
    // Map LLM codes to their specific URLs
    const controlMap = {
        'LLM01': 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/',
        'LLM02': 'https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/',
        'LLM03': 'https://genai.owasp.org/llmrisk/llm032025-supply-chain/',
        'LLM04': 'https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/',
        'LLM05': 'https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/',
        'LLM06': 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/',
        'LLM07': 'https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/',
        'LLM08': 'https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/',
        'LLM09': 'https://genai.owasp.org/llmrisk/llm092025-misinformation/',
        'LLM10': 'https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/'
    };
    
    return controlMap[llmCode] || 'https://genai.owasp.org/llmrisk/';
}

function getEUActUrl(control) {
    const baseUrl = 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689';
    
    if (control.includes('Article')) {
        const articleMatch = control.match(/Article (\d+)/);
        if (articleMatch) {
            return `${baseUrl}#art_${articleMatch[1]}`;
        }
    }
    
    if (control.includes('Annex')) {
        const annexMatch = control.match(/Annex ([IVX]+)/);
        if (annexMatch) {
            return `${baseUrl}#anx_${annexMatch[1]}`;
        }
    }
    
    return baseUrl;
}

// Theme management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    const toggle = document.querySelector('.theme-toggle');
    toggle.classList.toggle('dark', newTheme === 'dark');
    
    // Store theme preference
    try {
        localStorage.setItem('theme', newTheme);
    } catch (error) {
        console.warn('Could not store theme preference');
    }
}

// Initialize theme
function initializeTheme() {
    let theme = 'light';
    
    try {
        theme = localStorage.getItem('theme');
    } catch (error) {
        console.warn('Could not access localStorage for theme preference');
    }
    
    if (!theme) {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.classList.toggle('dark', theme === 'dark');
    }
}

// Terms of use function
function showTerms() {
    const termsWindow = window.open('', '_blank', 'width=600,height=800,scrollbars=yes');
    termsWindow.document.write(`
        <html>
        <head>
            <title>Terms of Use - AI Risk Praxis Self Assessment Tool</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 2rem; line-height: 1.6; }
                h1, h2 { color: #2c2c2c; }
                .warning { background: #fff3cd; padding: 1rem; border-radius: 4px; margin: 1rem 0; }
            </style>
        </head>
        <body>
            <h1>Disclaimer and Terms of Use</h1>
            <p><strong>Last Updated: February 1, 2026</strong></p>
            
            <div class="warning">
                <p><strong>Welcome to the AI Risk Praxis Self-Assessment Tool (the "Tool"). Before you begin, please read the following disclaimer carefully. By using the Tool, you agree to these terms.</strong></p>
            </div>
            
            <h2>1. For Informational Purposes Only</h2>
            <p>This Tool is intended for informational and educational purposes only. It is designed to serve as a preliminary triage system to help you identify potential areas of risk based on the provided frameworks. It is not a substitute for a formal risk assessment, a compliance audit, legal counsel, or professional security advice.</p>
            
            <h2>2. No Guarantee of Accuracy or Completeness</h2>
            <p>The information and framework mappings provided are based on our interpretation of the NIST AI RMF, OWASP Top 10 for LLMs, and the EU AI Act as of the "Last Updated" date. These frameworks evolve, new risks emerge, and the legal landscape changes rapidly. We do not warrant the accuracy, timeliness, or completeness of the information presented.</p>
            
            <h2>3. User's Responsibility</h2>
            <p>You are solely responsible for conducting your own thorough risk analysis and for ensuring your organization's compliance with all applicable laws, regulations, and internal policies. The output of this Tool should be used as just one of many inputs into your own comprehensive due diligence process.</p>
            
            <h2>4. Provided "AS IS"</h2>
            <p>This Tool is an open-source project provided "AS IS" and "AS AVAILABLE", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
            
            <h2>5. Limitation of Liability</h2>
            <p>In no event shall the authors, contributors, or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the Tool or the use or other dealings in the Tool.</p>
        </body>
        </html>
    `);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Theme toggle
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                const theme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
                const toggle = document.querySelector('.theme-toggle');
                if (toggle) {
                    toggle.classList.toggle('dark', theme === 'dark');
                }
            }
        });
    }
});
