D:\STSA\node-to-dotnet-aspire-modernization\.github\prompts\smart-prompt-framework-guide.mdD:\STSA\node-to-dotnet-aspire-modernization\.github\prompts\smart-prompt-framework-guide.md# S.M.A.R.T. Prompt Framework for GitHub Copilot Coding Agents

**Node.js to .NET 10 Aspire Modernization Edition** - Framework for creating high-quality coding agent instructions aligned with modernization best practices and microservices architecture.

---

## 🎯 **The S.M.A.R.T. Framework**

Use this framework to create highly effective coding agent instructions:

```text
S - Specific Role Definition (Senior .NET Developer, DevOps Engineer, AI Architect, etc.)
M - Mission-Critical Requirements (What must be accomplished with measurable outcomes)
A - Audience-Aware Communication (Team expertise level, architectural maturity, domain context)
R - Response Format Control (Code structure, architecture patterns, documentation style)
T - Task-Oriented Constraints (Technology stack, architectural patterns, forbidden actions)
```

---

## 🏛️ **Modernization Project Alignment**

When creating prompts for this modernization project, consider:

- **Migration Phase**: Which phase of the 7-phase modernization plan (Preparation → Foundation → Core Business → Supporting → Aspire → Parallel → Full Migration)?
- **Service Scope**: Which microservices are involved (Auth, User Management, Product Catalog, Order Processing, Notification)?
- **Technology Stack**: .NET 10, ASP.NET Core, Entity Framework Core, PostgreSQL, Redis, Azure Blob Storage, .NET Aspire
- **Architecture Patterns**: Microservices, cloud-native, API Gateway, distributed caching, event-driven, observability

## 🏗️ **Advanced Problem Statement Template**

Use this enhanced template for coding agent tasks:

```markdown
## ROLE DEFINITION

You are a [Specific Role] specializing in [Technology Stack] with expertise in [Domain Areas]

## MISSION

[Clear, specific objective with measurable outcomes]

## CONTEXT

[Brief overview of current situation and progress made]

## CURRENT STATUS

- **Progress Made**: [Specific achievements and metrics]
- **Main Issue**: [Root cause analysis]
- **Files Affected**: [List specific files]

## REMAINING WORK

### 1. [Priority Task Name] (Priority N)

- **Problem**: [Specific technical issue]
- **Current Error**: [Exact error messages]
- **Solution Approach**: [Concrete implementation steps]
- **Files to Modify**: [Specific file paths]

## TECHNICAL CONSTRAINTS

- **🚨 CRITICAL**: [Non-negotiable requirements]
- **Framework**: [Technology stack requirements]
- **Dependencies**: [Package/version constraints]

## RESPONSE FORMAT REQUIREMENTS

- [Specific code structure expectations]
- [Documentation requirements]
- [Testing requirements]
- [Build/deployment considerations]

## WHAT NOT TO DO

- ❌ [Explicit forbidden actions with reasoning]

## WHAT TO DO

- ✅ [Explicit required actions with priority]

## SUCCESS CRITERIA

[Measurable outcomes with acceptance criteria]

## QUALITY STANDARDS

- [Code quality requirements]
- [Performance expectations]
- [Security considerations]
- [Maintainability standards]
```

## 🎭 **Role-Based Specialization Examples**

### **For .NET/Azure Development:**

```markdown
ROLE: You are a Senior .NET Developer specializing in Azure Functions isolated worker model, Entity Framework Core, and microservices architecture

EXPERTISE FOCUS: Extension method limitations, Moq framework patterns, .NET 9 compatibility, Azure service integration

OUTPUT REQUIREMENTS: Production-ready C# code with comprehensive error handling, unit tests with proper mocking patterns, and enterprise-grade documentation

MANDATORY VALIDATION:
- ✅ dotnet build --configuration Release (0 errors required)
- ✅ dotnet test --configuration Release (0 failures required)
```

### **For DevOps/Infrastructure:**

```markdown
ROLE: You are a DevOps Engineer specializing in .NET application deployment, CI/CD pipelines, and Azure infrastructure

EXPERTISE FOCUS: Build automation, package management, framework migrations, container orchestration

OUTPUT REQUIREMENTS: Build scripts, deployment configurations, infrastructure as code, and monitoring setup

MANDATORY VALIDATION:
- ✅ All build scripts execute successfully
- ✅ Infrastructure templates validate without errors
- ✅ Deployment processes complete end-to-end
```

### **For AI Agent & Intelligent Systems Development:**

```markdown
ROLE: You are a Senior AI Architect specializing in LLM-powered agent development, AI/ML system design, and intelligent workflow orchestration

EXPERTISE FOCUS: 
- Prompt engineering and agent reasoning frameworks
- LLM integration patterns and RAG (Retrieval-Augmented Generation)
- Agent evaluation metrics and observability
- Responsible AI and guardrails implementation

OUTPUT REQUIREMENTS:
- Production-ready agent code with comprehensive error handling
- Evaluation frameworks with clear success metrics
- Tracing and observability for agent decisions
- Security guardrails and input validation
- Documentation with agent behavior specifications and limitations

ARCHITECTURAL PATTERNS:
- ReAct (Reasoning + Acting) for complex problem-solving (see comprehensive framework below)
- Chain-of-Thought for transparent agent reasoning (see comprehensive framework below)
- Tool integration with proper error handling
- State management for multi-turn conversations

REASONING FRAMEWORK:
- Apply Chain-of-Thought + ReAct + Reasoning methodology (see detailed section below)
- Use OBSERVE → ANALYZE → PLAN → ACT → VERIFY → REFLECT cycle
- Engage System 2 reasoning for critical architectural decisions

MANDATORY VALIDATION:
- ✅ Agent evaluation tests pass with defined metrics
- ✅ Tracing logs captured for all critical decisions
- ✅ No security vulnerabilities in prompt injection or model manipulation
- ✅ Response quality meets baseline metrics across test dataset
```

### **For Enterprise Architecture & System Design:**

```markdown
ROLE: You are a Lead Enterprise Architect specializing in scalable microservices architecture, distributed systems design, and organizational technology strategy

EXPERTISE FOCUS:
- SOLID principles and architectural patterns (layered, hexagonal, event-driven)
- Microservices decomposition and domain-driven design
- Cloud-native architecture and infrastructure as code
- System resilience, scalability, and observability
- Cross-cutting concerns: security, compliance, monitoring

OUTPUT REQUIREMENTS:
- Architecture Decision Records (ADRs) documenting trade-offs
- System design diagrams with components and integration points
- Reference implementations in multiple languages
- Migration strategies and cost optimization recommendations
- Security, compliance, and operational considerations

SUCCESS CRITERIA:
- ✅ Architecture aligns with organizational constraints
- ✅ Trade-offs clearly documented with reasoning
- ✅ Scalability and resilience characteristics defined
- ✅ Implementation examples demonstrate pattern application
```

## 🚨 **Critical Constraint Guidelines**

### **Framework/Package Versions:**

```markdown
- 🚨 CRITICAL: Use .NET 10 ONLY - DO NOT downgrade to previous versions
- ❌ DO NOT modify Directory.Packages.props or Directory.Build.props
- ❌ DO NOT downgrade package versions
- ✅ Target framework: net10.0
```

### **File Modification Boundaries:**

```markdown
- ❌ DO NOT modify [specific files]
- ✅ ONLY modify [allowed areas]
```

### **Build Requirements:**

```markdown
When building, use: cd /path/to/project && dotnet build
Ensure all projects target net10.0 framework
Use Aspire AppHost for local orchestration
```

## ✅ **Effective Instruction Patterns**

### **DO - Be Specific and Explicit:**

- ✅ "Create IHttpRequestWrapper interface to avoid GetValues() extension method"
- ✅ "Update tests to mock wrapper instead of HttpHeaders extension methods"
- ✅ "Fix test data generation in TestDataBuilder.cs - check ZIP file structure"

### **DON'T - Be Vague:**

- ❌ "Fix the tests"
- ❌ "Make it work"
- ❌ "Update the code"

## 📝 **Constraint Language Examples**

### **Strong Constraint Language That Works:**

```markdown
🚨 ABSOLUTELY DO NOT modify Directory.Packages.props or downgrade any packages.

The following packages MUST remain at their current .NET 10 versions:
- Npgsql.EntityFrameworkCore.PostgreSQL: Latest compatible version
- Microsoft.EntityFrameworkCore: Version 10.x
- Aspire.Hosting: Version 10.x
- StackExchange.Redis: Latest version

CRITICAL: Any attempt to change these versions will require task restart.
```

### **Weak Language That Doesn't Work:**

```markdown
Please try to maintain .NET 9 compatibility
Prefer keeping current package versions
```

## 🎯 **Advanced Prompt Design Patterns**

### **Multi-Layered Prompt Architecture:**

```markdown
SYSTEM LAYER:
You are a [Specialist Role] with expertise in [Technology Stack] and [Domain Expertise].

CONTEXT LAYER:  
[Project context, current situation, business requirements]

TASK LAYER:
[Specific implementation task with clear deliverables]

SPECIFICATION LAYER:
[Detailed technical requirements, constraints, and acceptance criteria]
```

### **Conditional Logic for Complex Scenarios:**

```markdown
LOGIC FRAMEWORK:
IF issue_type == "extension_method_mocking":
THEN approach: Create wrapper interfaces to avoid Moq limitations
AND include: Dependency injection setup and test updates

ELIF issue_type == "package_compatibility":  
THEN approach: Update implementation patterns, NOT package versions
AND include: Code refactoring to maintain .NET 9 compatibility

ELIF issue_type == "build_failures":
THEN approach: Install missing SDKs or fix code issues
AND include: Detailed error analysis and resolution steps
```

### **Progressive Refinement Pattern:**

```markdown
BASE PROMPT: [Core role and task definition]

REFINEMENT 1: Add specific technical constraints
REFINEMENT 2: Define output format requirements  
REFINEMENT 3: Include quality standards and acceptance criteria
REFINEMENT 4: Add monitoring and validation requirements

FINAL VALIDATION: Ensure all constraints are explicitly stated
```

## 🧠 **Chain-of-Thought + ReAct + Reasoning Framework**

**CRITICAL**: Apply systematic reasoning to every coding task using this framework. This ensures thoughtful, well-reasoned implementations that align with project standards and best practices.

### **Why CoT + ReAct + Reasoning?**

- **Prevents Rushed Decisions**: Forces systematic analysis before acting
- **Reduces Errors**: Catches issues early through verification steps
- **Improves Quality**: Ensures code follows best practices and patterns
- **Enables Learning**: Reflection phase captures improvements for future tasks

### **1. Chain-of-Thought (CoT) - Problem Decomposition**

Break down complex problems into logical steps with explicit reasoning:

#### **Core Principles**

- **Decompose**: Split large tasks into smaller, manageable components
- **Sequential Logic**: Show clear progression from problem → solution
- **Explicit Reasoning**: Articulate WHY each step is necessary
- **Intermediate Steps**: Don't jump to conclusions; show the work

#### **Simple Tasks (Quick CoT)**

For straightforward tasks, use minimal reasoning:
- "Need to create API endpoint → Define route → Implement handler → Add tests → Done"
- Quick CoT sufficient for read file, create script, simple component updates

#### **Complex Tasks (Full CoT)**

For complex implementations, break down systematically:

**Example:**
```
To implement authentication:
1. Create User entity and DbContext (Foundation - needed for data persistence)
2. Implement password hashing service (Security - protect user credentials)
3. Create JWT token generator (Authentication - stateless token-based auth)
4. Build register/login endpoints (API - expose functionality)
5. Add integration tests (Validation - ensure correctness)
```

**Another Example:**
```
To consolidate client management features:
1. Read all existing client-related files (understand current state)
2. Identify unique functionality across components (avoid duplication)
3. Extract common patterns into reusable hooks/services (DRY principle)
4. Merge features while preserving all functionality (no feature loss)
5. Update all references to use consolidated code (maintain consistency)
6. Verify no regressions with tests (quality assurance)
```

### **2. ReAct (Reasoning + Acting) - Iterative Development**

Interleave thinking with action in iterative cycles. Use this six-phase cycle for complex implementations:

#### **1. OBSERVE 🔍**

**Systematically gather information before acting:**

- **Current state**: What exists now? What files, components, patterns are in place?
- **User request**: What is being asked? What's the explicit requirement?
- **Context**: What's the broader situation? What's the project phase, constraints, priorities?
- **Constraints**: What limitations exist? Technical, time, resource constraints?
- **Dependencies**: What other systems/components are affected?

**Tools for Observation:**
- Read relevant files and documentation
- Search codebase for similar patterns
- Check existing implementations
- Review project structure and conventions

**Prompt Template:**

```markdown
OBSERVE:
- Current state: [What exists now]
- User request: [What is being asked]
- Context: [Broader situation]
- Constraints: [Limitations]
- Dependencies: [Affected systems]
```

#### **2. ANALYZE 🧠**

**Deep analysis before planning:**

- **Root cause**: Why does this issue/requirement exist? What's the underlying need?
- **Dependencies**: What else is affected? What components/services depend on this?
- **Implications**: What are the consequences? How will this change affect the system?
- **Alternatives**: What other approaches exist? What are the trade-offs?
- **Pattern Recognition**: Have we solved similar problems before? What patterns can we reuse?

**Analysis Questions:**
- Does this align with existing architecture?
- Are there existing patterns/components we should use?
- What are the performance/security/maintainability implications?
- How does this fit into the overall project roadmap?

**Prompt Template:**

```markdown
ANALYZE:
- Root cause: [Why this exists]
- Dependencies: [What's affected]
- Implications: [Consequences]
- Alternatives: [Other approaches]
- Patterns: [Reusable solutions]
```

#### **3. PLAN 📋**

**Create a detailed, step-by-step approach:**

- **Step-by-step approach** with clear milestones
- **Verification points** at each step (when to check progress)
- **Rollback strategy** if issues arise (how to undo if needed)
- **Resource requirements** (tools, packages, configurations, dependencies)
- **Testing strategy** (what to test, how to verify)

**Planning Checklist:**
- [ ] All dependencies identified
- [ ] Verification points defined
- [ ] Rollback plan documented
- [ ] Testing approach clear
- [ ] Documentation updates planned

**Prompt Template:**

```markdown
PLAN:
1. [Step 1] - [Verification point]
2. [Step 2] - [Verification point]
3. [Step 3] - [Verification point]
...
Rollback: [How to undo if needed]
Testing: [What to test]
```

#### **4. ACT ⚡**

**Execute with precision and care:**

- **Incremental changes**: Make small, focused changes, not big bangs
- **Use existing patterns**: Leverage existing components/services before creating new ones
- **Systematic execution**: Follow the plan, but adapt if needed
- **Document as you go**: Update comments, documentation, commit messages
- **Automation first**: Use existing scripts/tools before manual steps

**Action Principles:**
- Make one logical change at a time
- Test after each significant change
- Commit frequently with clear messages
- Update documentation immediately

**Prompt Template:**

```markdown
ACT:
- Making incremental changes
- Using existing patterns: [Pattern name]
- Following plan step: [Step number]
- Documenting: [What's being documented]
```

#### **5. VERIFY ✅**

**Validate results against expected outcomes:**

- **Check results**: Does the implementation match requirements?
- **Run validation**: Build, tests, lint, type checking
- **Update documentation**: Ensure docs reflect changes
- **Test edge cases**: Verify behavior in unusual scenarios
- **Cross-check**: Review against project standards and best practices

**Verification Checklist:**
- [ ] Code compiles/builds successfully
- [ ] Tests pass (existing and new)
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Documentation updated
- [ ] Edge cases tested
- [ ] Follows project conventions

**Prompt Template:**

```markdown
VERIFY:
- Build: [Status]
- Tests: [Status]
- Lint: [Status]
- Types: [Status]
- Docs: [Status]
- Edge cases: [Status]
```

#### **6. REFLECT 🤔**

**Learn and improve for future work:**

- **What worked well?** Identify successful patterns and approaches
- **What could be improved?** Note areas for enhancement
- **What patterns emerged?** Recognize reusable solutions
- **What would prevent issues?** Think about process improvements
- **Update instructions**: Document learnings in rules/guidelines

**Reflection Questions:**
- Did we follow best practices?
- Could this have been done more efficiently?
- What would make this easier next time?
- Should we update project rules/guidelines?

**Prompt Template:**

```markdown
REFLECT:
- What worked: [Successes]
- What to improve: [Enhancements]
- Patterns: [Reusable solutions]
- Updates needed: [Documentation/rules]
```

### **3. System 2 Reasoning - Deliberate Analysis**

Engage deliberate, analytical thinking for complex decisions. Don't rely on quick intuition for critical choices.

#### **Five Key Practices**

1. **Question Assumptions**: Don't accept requirements at face value
   - Why is this needed? What problem does it solve?
   - Are there alternative solutions?
   - Is this the right time/place for this change?

2. **Consider Trade-offs**: Every decision has pros and cons
   - Performance vs. maintainability
   - Speed vs. correctness
   - Simplicity vs. flexibility
   - Current needs vs. future scalability

3. **Think Long-term**: How will this affect future work?
   - Will this create technical debt?
   - Is this pattern sustainable?
   - How will this scale?
   - What maintenance burden does this create?

4. **Pattern Recognition**: Have we solved similar problems before?
   - Look for existing solutions in codebase
   - Identify reusable patterns
   - Learn from past implementations
   - Avoid reinventing the wheel

5. **Meta-cognition**: Monitor your own reasoning process
   - Am I thinking clearly about this?
   - Am I missing something important?
   - Should I consult documentation/rules?
   - Do I need more information?

#### **Red Flags Requiring Deep Analysis**

Engage System 2 reasoning when encountering:

- ⚠️ **Structural changes** (affects multiple files/components)
- ⚠️ **Deletions** (potential information/functionality loss)
- ⚠️ **Consolidations** (complexity in merging, risk of losing features)
- ⚠️ **New patterns** (precedent-setting decisions)
- ⚠️ **Security implementations** (authentication, authorization, data protection)
- ⚠️ **Performance optimizations** (caching, database queries, algorithms)
- ⚠️ **Breaking changes** (API contracts, database schema, interfaces)
- ⚠️ **User frustration** (indicates process failure, needs root cause analysis)

### **Practical Application Guidelines**

#### **For Simple Tasks** (read file, create script, simple component update)

- **Quick CoT**: "Need to read file → use read_file tool → done"
- **Minimal reasoning**: Single OBSERVE → ACT cycle sufficient
- **Fast execution**: Don't overthink straightforward tasks

#### **For Complex Tasks** (consolidate docs, restructure, new feature)

- **Full ReAct cycle required**: Complete all six phases
- **Multiple iterations**: May need multiple OBSERVE → ANALYZE → PLAN → ACT → VERIFY cycles
- **Deep System 2 reasoning**: For critical architectural decisions
- **Document reasoning**: In commit messages, code comments, documentation

#### **When User Points Out Mistakes**

Follow this systematic response:

1. **Acknowledge**: "You're right, I missed X"
2. **Root Cause**: "This happened because..." (analyze why the mistake occurred)
3. **Immediate Fix**: Correct the issue immediately
4. **Prevention**: "I'm adding [protocol/check/validation] to prevent recurrence"
5. **Update Instructions**: Modify rules/guidelines to embed learning

### **Integration with S.M.A.R.T. Framework**

#### **Role Definition + CoT**

```markdown
ROLE: You are a [Specific Role] with expertise in [Technology Stack]

REASONING APPROACH:
- Apply Chain-of-Thought to break down this task
- Use ReAct cycle: OBSERVE → ANALYZE → PLAN → ACT → VERIFY → REFLECT
- Engage System 2 reasoning for architectural decisions
```

#### **Mission + ReAct**

```markdown
MISSION: [Clear objective]

REACT CYCLE:
1. OBSERVE: [Current state, requirements, constraints]
2. ANALYZE: [Root cause, dependencies, alternatives]
3. PLAN: [Step-by-step approach with verification]
4. ACT: [Execute systematically]
5. VERIFY: [Validate against requirements]
6. REFLECT: [Learn and document]
```

#### **Task Constraints + System 2 Reasoning**

```markdown
TASK CONSTRAINTS:
- [Constraint 1]
- [Constraint 2]

SYSTEM 2 REASONING REQUIRED:
- ⚠️ This involves [structural change/security/performance]
- Consider trade-offs: [Pros vs. Cons]
- Long-term impact: [Future implications]
- Pattern recognition: [Similar solutions]
```

### **Example: Complete ReAct Cycle for Feature Implementation**

```markdown
## FEATURE: Implement Client Search with Advanced Filtering

### 1. OBSERVE 🔍
- Current state: Basic client list exists with DataGrid component
- User request: Add advanced search with multiple filter criteria
- Context: Frontend development phase, using React + TypeScript
- Constraints: Must work with existing DataGrid, maintain performance
- Dependencies: DataGrid component, client service, types

### 2. ANALYZE 🧠
- Root cause: Users need to filter clients by multiple criteria simultaneously
- Dependencies: DataGrid filtering, client service API, state management
- Implications: May need to enhance DataGrid or create separate filter component
- Alternatives: 
  - Enhance DataGrid filtering (reuse existing)
  - Create separate AdvancedFilter component (more flexible)
  - Use URL query params for filter state (shareable links)
- Patterns: DataGrid already has basic filtering, can extend

### 3. PLAN 📋
1. Enhance DataGrid types to support advanced filters
2. Create AdvancedFilter component with multiple criteria
3. Integrate with DataGrid filtering logic
4. Add URL query param support for shareable filters
5. Test with various filter combinations
6. Update documentation

Verification: After each step, test filtering works correctly
Rollback: Can revert to basic filtering if issues arise
Testing: Unit tests for filter logic, integration tests for DataGrid

### 4. ACT ⚡
- Enhancing DataGrid types: [In progress]
- Creating AdvancedFilter component: [Next]
- Integrating with DataGrid: [Planned]
- Adding URL support: [Planned]

### 5. VERIFY ✅
- Build: ✅ Passes
- Tests: ✅ All pass
- Lint: ✅ No issues
- Types: ✅ No errors
- Functionality: ✅ Filters work correctly
- Edge cases: ✅ Tested empty results, multiple filters

### 6. REFLECT 🤔
- What worked: Reusing DataGrid filtering logic was efficient
- What to improve: Could add filter presets for common searches
- Patterns: AdvancedFilter component can be reused for other entities
- Updates needed: Document AdvancedFilter usage in component library
```

### **Quick Reference: When to Use What**

| Task Complexity | CoT Level | ReAct Phases | System 2 Reasoning |
|----------------|-----------|--------------|-------------------|
| Simple (read file) | Quick | OBSERVE → ACT | Not needed |
| Medium (add feature) | Full | All 6 phases | For critical decisions |
| Complex (restructure) | Full | Multiple cycles | Always required |
| Critical (security) | Full | Multiple cycles | Always required |

---

## 📊 **Output Format Control**

### **For Code Generation Tasks:**

```markdown
OUTPUT REQUIREMENTS:
- Production-ready code with comprehensive error handling
- Unit tests with proper mocking patterns (avoiding extension methods)
- XML documentation for public APIs
- Consistent code style following project conventions
- No explanatory comments in code - let the code be self-documenting
- Include integration points and dependency injection setup
```

### **For Infrastructure Tasks:**

```markdown
OUTPUT REQUIREMENTS:
- Valid configuration files (JSON/YAML/XML as specified)
- Infrastructure as Code with proper variable definitions
- Deployment scripts with error handling and rollback procedures
- Monitoring and alerting configurations
- Documentation with setup and troubleshooting guides
```

### **For Debugging Tasks:**

```markdown
OUTPUT REQUIREMENTS:
- Root cause analysis with supporting evidence
- Step-by-step resolution procedures
- Test cases to validate the fix
- Prevention strategies for similar issues
- Performance impact assessment
```

## 🤖 **AI Agent Evaluation & Observability Framework**

When designing AI agent tasks, include evaluation and observability requirements:

### **AI Agent Evaluation Template:**

```markdown
## EVALUATION FRAMEWORK

### Evaluation Metrics
- **Accuracy**: Correctness of agent responses against ground truth (target: >95%)
- **Latency**: Response time within acceptable bounds (target: <2000ms)
- **Safety**: Adherence to guardrails and security constraints (target: 100%)
- **Coherence**: Response clarity and logical flow (1-5 scale)

### Test Dataset
- **Size**: Minimum 50 diverse test cases covering edge cases
- **Coverage**: Include normal operation, error conditions, and boundary scenarios
- **Distribution**: Representative of production usage patterns

### Success Criteria
- Baseline accuracy exceeds target threshold
- No security or safety violations across test dataset
- Latency remains within acceptable range
- Response quality consistent across diverse inputs

### Evaluation Execution
- Run evaluations against complete test dataset
- Capture detailed metrics and failure analysis
- Document performance improvements and regressions
- Validate changes don't degrade existing functionality
```

### **AI Agent Tracing & Observability Template:**

```markdown
## TRACING & OBSERVABILITY REQUIREMENTS

### Trace Coverage
- Agent decision points and reasoning steps
- Tool invocations and results
- Error handling and recovery attempts
- Performance metrics (latency, token usage)

### Tracing Implementation
- Structured logging with correlation IDs
- OpenTelemetry instrumentation for observability
- Trace storage and analysis tools
- Real-time monitoring dashboards

### Observable Signals
- Agent state transitions and context changes
- Token usage and cost tracking
- Error rates and failure patterns
- User satisfaction and feedback signals

### Analysis & Improvement
- Identify bottlenecks and failure modes
- Detect drift in agent behavior
- Measure business impact of improvements
- Plan optimizations based on observed patterns
```

## 🎯 **Success Indicators**

### **Agent is working correctly when:**

- ✅ It acknowledges constraints explicitly
- ✅ It asks clarifying questions about boundaries
- ✅ It installs missing SDKs instead of downgrading
- ✅ It focuses on code changes, not configuration changes
- ✅ It provides detailed progress updates

### **Agent needs restart when:**

- ❌ It immediately modifies forbidden files
- ❌ It changes package versions without asking
- ❌ It ignores explicit constraints
- ❌ It takes overly broad approach to simple problems

## 🔄 **Agent Restart Protocol**

### **When to restart the coding agent:**

- Agent modifies forbidden files (like Directory.Packages.props)
- Agent downgrades package versions
- Agent changes target framework
- Agent takes wrong architectural approach

### **How to restart:**

1. Close current pull request
2. Create new pull request with more explicit constraints
3. Include specific examples of what went wrong
4. Add stronger constraint language

## 🏗️ **Cross-Domain Architecture Patterns**

When tasks span multiple architectural domains, apply these patterns:

### **Pattern: Domain-Driven Design Integration**

```markdown
ARCHITECTURAL PATTERN: Domain-Driven Design (DDD) with Ubiquitous Language

DOMAINS INVOLVED:
- Core Domain: [Main business capability]
- Supporting Domain: [Shared services]
- Generic Domain: [Infrastructure/libraries]

IMPLEMENTATION REQUIREMENTS:
- Clear bounded contexts with explicit boundaries
- Shared kernel defined and documented
- Anticorruption layers for external integrations
- Value objects and aggregates properly designed
- Repository pattern for data access
- Domain events for cross-boundary communication

QUALITY GATES:
✅ Bounded contexts have clear interfaces
✅ Ubiquitous language used consistently across code and docs
✅ No circular dependencies between contexts
✅ Integration tests validate context boundaries
```

### **Pattern: Microservices Architecture**

```markdown
ARCHITECTURAL PATTERN: Event-Driven Microservices

CHARACTERISTICS:
- Independent deployment and scaling
- Asynchronous communication via events
- Database per service (no shared databases)
- API gateway for client communication
- Service mesh for inter-service concerns

IMPLEMENTATION REQUIREMENTS:
- Event schema definition and versioning
- Saga pattern for distributed transactions
- Circuit breaker for failure handling
- Service discovery and load balancing
- Distributed tracing across services
- Monitoring and alerting per service

QUALITY GATES:
✅ Services can be deployed independently
✅ Event contracts validated before deployment
✅ Failure scenarios handled gracefully
✅ End-to-end tracing captures cross-service flows
✅ No database coupling between services
```

### **Pattern: Hexagonal Architecture (Ports & Adapters)**

```markdown
ARCHITECTURAL PATTERN: Hexagonal (Ports & Adapters) - Isolate Business Logic

STRUCTURE:
- Core: Pure business logic (domain models, use cases)
- Ports: Interfaces defining system boundaries
- Adapters: Implementations of ports (frameworks, databases, APIs)

IMPLEMENTATION REQUIREMENTS:
- Business logic has zero framework dependencies
- Ports define contracts clearly
- Multiple adapter implementations possible
- Testing possible without external dependencies
- Clear separation of concerns

QUALITY GATES:
✅ Core domain testable in isolation
✅ Framework changes don't affect business logic
✅ Adapter implementations are interchangeable
✅ No circular dependencies
```

## 📋 **Universal PR Success Template**

Include this template in EVERY coding agent PR for consistent validation:

````markdown
## 🎯 MANDATORY SUCCESS CRITERIA (NON-NEGOTIABLE)

### Build Requirements
```powershell
# MUST PASS: Full solution build with zero errors
dotnet build --configuration Release --verbosity normal
# Expected Result: "Build succeeded. 0 Error(s)"
```

### Test Requirements

```powershell
# MUST PASS: All existing unit tests
dotnet test --configuration Release --logger "console;verbosity=normal"
# Expected Result: "Test Run Successful. Total tests: X, Passed: X, Failed: 0, Skipped: 0"
```

## 📋 FINAL CHECKLIST

Before marking this PR ready for review:

- [ ] ✅ `dotnet build` succeeds with 0 errors across entire solution
- [ ] ✅ `dotnet test` passes with 0 failures across all test projects
- [ ] ✅ All original issues resolved completely
- [ ] ✅ No package downgrades or framework changes
- [ ] ✅ All existing functionality preserved
- [ ] ✅ Production-ready error handling implemented

**CRITICAL**: Do not mark this PR as ready for review until ALL build and test validations pass successfully.

````

## 🚀 **Modernization Project-Specific S.M.A.R.T. Example**

```markdown
ROLE: You are a Senior .NET Architect specializing in cloud-native e-commerce systems, microservices architecture, and .NET Aspire orchestration

MISSION: Modernize the e-commerce application from Node.js to .NET 10 with Aspire - implementing Authentication API, User Management API, Product Catalog API, Order Processing API, and Notification Service using microservices architecture

AUDIENCE: Development team with expertise in:
- .NET 10, ASP.NET Core Web API, and Entity Framework Core
- Microservices architecture and cloud-native patterns
- PostgreSQL, Redis caching, Azure Blob Storage
- .NET Aspire for orchestration and observability
- OpenTelemetry and distributed tracing

RESPONSE FORMAT:
- Production-ready code with comprehensive error handling
- Repository pattern with EF Core for data access
- Redis caching with cache-aside pattern
- .NET Aspire AppHost orchestration for local development
- Health checks and observability implementation
- Comprehensive documentation with architecture diagrams

TASK CONSTRAINTS:
- 🚨 CRITICAL: Use .NET 10 ONLY - DO NOT downgrade to previous versions
- Architecture: AppHost, AuthenticationApi, UserManagementApi, ProductCatalogApi, OrderProcessingApi, NotificationService
- Quality Standards: Zero build warnings, 100% test pass rate, OpenAPI documentation
- Technology Stack: .NET 10 Aspire with microservices, PostgreSQL, Redis, Azure Blob Storage
- Security: JWT Bearer authentication, role-based access control (RBAC)
```

## 📚 **Best Practices Summary**

1. **Be Specific**: Define exact roles, technologies, and constraints
2. **Set Clear Boundaries**: Use strong constraint language
3. **Define Success**: Include measurable outcomes and validation steps
4. **Control Output**: Specify exactly what format and quality you expect
5. **Plan for Failure**: Include restart protocols and troubleshooting
6. **Validate Everything**: Always include build and test requirements
7. **Document Thoroughly**: Ensure all decisions and constraints are recorded
8. **Align with Architecture**: Reference learning levels and architectural patterns
9. **Enable Observability**: Include tracing and evaluation requirements
10. **Progressive Complexity**: Scale scope to team's architectural maturity level

---

## ⚡ **Quick Reference Checklist**

Use this checklist before submitting any coding agent task:

### **Role Definition**

- [ ] Specific role/expertise clearly stated
- [ ] Technology stack and frameworks identified
- [ ] Expected audience knowledge level documented
- [ ] Domain context provided

### **Task Clarity**

- [ ] Mission and objectives clearly defined
- [ ] Success criteria are measurable
- [ ] Scope is appropriately sized
- [ ] Priority and sequencing defined

### **Technical Requirements**

- [ ] Framework and version constraints specified
- [ ] Architectural patterns identified
- [ ] Dependencies listed explicitly
- [ ] Integration points documented

### **Constraints & Boundaries**

- [ ] Forbidden actions explicitly listed (❌)
- [ ] Required actions explicitly listed (✅)
- [ ] File modification boundaries defined
- [ ] Architectural decision constraints included

### **Quality & Validation**

- [ ] Code quality standards specified
- [ ] Build/test requirements included
- [ ] Performance expectations defined
- [ ] Security considerations addressed

### **AI Agent Specifics** (if applicable)

- [ ] Evaluation metrics defined
- [ ] Test dataset requirements specified
- [ ] Tracing requirements included
- [ ] Safety guardrails documented
- [ ] CoT + ReAct + Reasoning framework applied (see comprehensive section)

### **Output Expectations**

- [ ] Code format and style specified
- [ ] Documentation requirements defined
- [ ] Testing approach specified
- [ ] Deployment considerations included

---

## 📋 **FINAL VALIDATION CHECKLIST**

Before submitting ANY coding agent PR or task completion:

- [ ] ✅ All technical constraints acknowledged
- [ ] ✅ Success criteria clearly measurable
- [ ] ✅ Build passes without errors/warnings
- [ ] ✅ Tests pass with 0 failures
- [ ] ✅ No forbidden files modified
- [ ] ✅ Architectural patterns applied correctly
- [ ] ✅ Documentation is complete and accurate
- [ ] ✅ Evaluation metrics captured (for AI agents)
- [ ] ✅ Tracing configured (for AI agents)
- [ ] ✅ Code review readiness criteria met

---

## 🎓 **Modernization Phase Integration**

Align your coding agent tasks with the modernization phases:

### **Phase 0: Preparation (Weeks 1-2)**

- Architecture design and validation
- Technology stack decisions
- Environment setup and tooling
- Team training and onboarding

### **Phase 1: Foundation Services (Weeks 3-6)**

- Authentication API implementation
- User Management API development
- PostgreSQL database setup
- Redis caching integration

### **Phase 2: Core Business Services (Weeks 7-12)**

- Product Catalog API with full-text search
- Order Processing API with Saga pattern
- Payment gateway integration
- Inventory management

### **Phase 3: Supporting Services (Weeks 13-15)**

- Notification Service (Email, SMS, Push)
- Background job processing
- Azure Blob Storage integration

### **Phase 4: Aspire Integration (Weeks 16-17)**

- .NET Aspire AppHost orchestration
- Service discovery and communication
- OpenTelemetry distributed tracing
- Aspire Dashboard for observability

### **Phase 5: Parallel Running (Weeks 18-21)**

- Dual-write pattern implementation
- Gradual traffic migration
- Data consistency validation
- Performance monitoring

### **Phase 6: Full Migration (Weeks 22-23)**

- Complete traffic cutover to .NET services
- Node.js system decommissioning
- Production validation

### **Phase 7: Post-Migration Stabilization (Weeks 24-25)**

- Performance optimization
- Documentation updates
- Team knowledge transfer
- Lessons learned

This framework ensures consistent, high-quality results from GitHub Copilot coding agents while preventing common issues and maintaining enterprise-grade architectural standards throughout the modernization journey.
