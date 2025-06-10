# **🏗️ Voice Board Canvas Monorepo: Complete Architecture Guide**

## **📋 Executive Summary**

We're building Voice Board Canvas as a **monorepo** with **feature-based organization**. This guide explains every structural decision in simple terms, perfect for freshers starting from scratch.

**What we're building**: An interactive canvas where teachers use voice commands to create and animate data structures for teaching computer science.

**Key Decision**: Feature-based folders (all voice code together) instead of layer-based (controllers separate from services).

---

## **🎯 What is a Monorepo and Why Use It?**

### **Monorepo Explained Simply**

Imagine you're building a house with multiple rooms:

**❌ Polyrepo Approach** (Traditional)
```
separate-repos/
├── voice-board-frontend/     # Living room in one location
├── voice-board-backend/      # Kitchen in another location  
├── voice-board-types/        # Blueprints in third location
└── voice-board-docs/         # Manual in fourth location
```
*Problem: Need to synchronize between 4 different places!*

**✅ Monorepo Approach** (Our choice)
```
voice-board-workspace/        # Entire house in one location
├── apps/                     # Rooms you live in
├── packages/                 # Shared utilities (plumbing, electrical)
└── tools/                    # Construction tools
```
*Solution: Everything in one place, share utilities easily!*

### **Benefits for Voice Board**

| Benefit | Real Example |
|---------|--------------|
| **🔄 Atomic Changes** | Update API + UI in one commit |
| **📦 Code Sharing** | Frontend/backend use same TypeScript types |
| **🧪 Unified Testing** | Run all tests with one command |
| **🚀 Coordinated Releases** | Version everything together |
| **👥 Better Collaboration** | See all code in one place |

---

## **🏗️ Complete Project Structure**

### **High-Level Organization**

```
voice-board-workspace/              # 🏠 Root monorepo folder
├── apps/                          # 🎯 Runnable applications
├── packages/                      # 📦 Reusable code packages
├── tools/                         # 🔧 Development utilities
├── docs/                          # 📚 Documentation
└── [Config files]                 # ⚙️ Workspace configuration
```

### **Detailed Structure with Explanations**

```
voice-board-workspace/
│
├── 📁 apps/                                 # Things you can "run"
│   ├── 📁 web/                             # Main web application
│   │   ├── 📁 src/
│   │   │   ├── main.tsx                   # Entry point
│   │   │   ├── App.tsx                    # Root component  
│   │   │   └── vite-env.d.ts              # TypeScript declarations
│   │   ├── 📁 public/                      # Static files
│   │   ├── index.html                     # HTML template
│   │   ├── package.json                   # Dependencies
│   │   ├── tsconfig.json                  # TypeScript config
│   │   ├── vite.config.ts                 # Build config
│   │   └── .env.example                   # Environment template
│   │
│   └── 📁 docs-site/                       # Documentation website (future)
│       └── [Docusaurus setup]
│
├── 📁 packages/                            # Reusable code
│   ├── 📁 canvas/                          # 🎨 Main canvas package
│   │   ├── 📁 src/
│   │   │   ├── 📁 features/               # Feature-based organization
│   │   │   │   ├── 📁 infinite-canvas/    # Pan/zoom functionality
│   │   │   │   │   ├── InfiniteCanvas.tsx
│   │   │   │   │   ├── useInfiniteCanvas.ts
│   │   │   │   │   ├── infiniteCanvas.types.ts
│   │   │   │   │   ├── infiniteCanvas.utils.ts
│   │   │   │   │   ├── infiniteCanvas.constants.ts
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── InfiniteCanvas.test.tsx
│   │   │   │   │       └── useInfiniteCanvas.test.ts
│   │   │   │   │
│   │   │   │   ├── 📁 array-element/      # Array visualization
│   │   │   │   │   ├── ArrayElement.tsx
│   │   │   │   │   ├── ArrayCell.tsx
│   │   │   │   │   ├── ArrayIndices.tsx
│   │   │   │   │   ├── useArrayElement.ts
│   │   │   │   │   ├── arrayElement.types.ts
│   │   │   │   │   ├── arrayElement.animations.ts
│   │   │   │   │   └── __tests__/
│   │   │   │   │
│   │   │   │   ├── 📁 voice-control/      # Voice interaction
│   │   │   │   │   ├── VoiceButton.tsx
│   │   │   │   │   ├── VoiceIndicator.tsx
│   │   │   │   │   ├── AudioWaveform.tsx
│   │   │   │   │   ├── useVoiceRecording.ts
│   │   │   │   │   ├── useVoiceCommand.ts
│   │   │   │   │   ├── voiceControl.types.ts
│   │   │   │   │   ├── voiceControl.service.ts
│   │   │   │   │   └── __tests__/
│   │   │   │   │
│   │   │   │   ├── 📁 element-interactions/ # Drag, select, edit
│   │   │   │   │   ├── DragHandler.tsx
│   │   │   │   │   ├── SelectionBox.tsx
│   │   │   │   │   ├── ActionMenu.tsx
│   │   │   │   │   ├── EditMode.tsx
│   │   │   │   │   ├── useElementDrag.ts
│   │   │   │   │   ├── useElementSelection.ts
│   │   │   │   │   └── __tests__/
│   │   │   │   │
│   │   │   │   ├── 📁 animations/         # Animation system
│   │   │   │   │   ├── AnimationController.tsx
│   │   │   │   │   ├── SortAnimation.tsx
│   │   │   │   │   ├── SwapAnimation.tsx
│   │   │   │   │   ├── useAnimation.ts
│   │   │   │   │   ├── animation.presets.ts
│   │   │   │   │   └── __tests__/
│   │   │   │   │
│   │   │   │   └── 📁 reference-arrows/   # Pointer visualization
│   │   │   │       ├── ReferenceArrow.tsx
│   │   │   │       ├── AddressLabel.tsx
│   │   │   │       ├── useArrowPath.ts
│   │   │   │       └── __tests__/
│   │   │   │
│   │   │   ├── 📁 shared/                 # Shared across features
│   │   │   │   ├── 📁 ui/                 # Common UI components
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Modal.tsx
│   │   │   │   │   ├── Toast.tsx
│   │   │   │   │   └── Toolbar.tsx
│   │   │   │   │
│   │   │   │   ├── 📁 hooks/              # Common hooks
│   │   │   │   │   ├── useKeyboardShortcuts.ts
│   │   │   │   │   ├── useThrottle.ts
│   │   │   │   │   └── useLocalStorage.ts
│   │   │   │   │
│   │   │   │   ├── 📁 utils/              # Utilities
│   │   │   │   │   ├── geometry.ts        # Math calculations
│   │   │   │   │   ├── uid.ts             # ID generation
│   │   │   │   │   └── colors.ts          # Color manipulation
│   │   │   │   │
│   │   │   │   └── 📁 constants/          # App-wide constants
│   │   │   │       ├── canvas.ts
│   │   │   │       ├── animations.ts
│   │   │   │       └── keyboard.ts
│   │   │   │
│   │   │   ├── 📁 stores/                 # State management
│   │   │   │   ├── canvas.store.ts        # Canvas elements state
│   │   │   │   ├── selection.store.ts     # Selection state
│   │   │   │   ├── history.store.ts       # Undo/redo
│   │   │   │   ├── ui.store.ts           # UI state
│   │   │   │   └── createStore.ts         # Store factory
│   │   │   │
│   │   │   ├── index.ts                   # Public API exports
│   │   │   └── VoiceBoard.tsx             # Main component
│   │   │
│   │   ├── 📁 styles/                     # Global styles
│   │   │   ├── globals.css
│   │   │   ├── variables.css
│   │   │   └── themes/
│   │   │       ├── light.css
│   │   │       └── dark.css
│   │   │
│   │   ├── package.json                   # Package config
│   │   ├── tsconfig.json                  # TypeScript config
│   │   ├── vite.config.ts                 # Build config
│   │   └── README.md                      # Package docs
│   │
│   ├── 📁 api-client/                     # Frontend API client
│   │   ├── 📁 src/
│   │   │   ├── 📁 command-router/        # Command processing
│   │   │   │   ├── commandRouter.client.ts
│   │   │   │   ├── commandRouter.types.ts
│   │   │   │   └── commandRouter.mock.ts
│   │   │   │
│   │   │   ├── 📁 voice/                 # Voice services
│   │   │   │   ├── audioRecorder.ts
│   │   │   │   ├── audioProcessor.ts
│   │   │   │   └── permissionManager.ts
│   │   │   │
│   │   │   ├── httpClient.ts             # Base HTTP client
│   │   │   └── index.ts                   # Exports
│   │   └── package.json
│   │
│   ├── 📁 shared-types/                   # Shared TypeScript types
│   │   ├── 📁 src/
│   │   │   ├── commands.ts                # Command interfaces
│   │   │   ├── canvas.ts                  # Canvas element types
│   │   │   ├── api.ts                     # API contracts
│   │   │   └── index.ts                   # Type exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── 📁 backend/                        # Backend services
│       ├── 📁 command-router/             # API Gateway
│       │   ├── 📁 src/
│       │   │   ├── 📁 features/
│       │   │   │   ├── 📁 pipeline/       # Request orchestration
│       │   │   │   │   ├── pipeline.controller.ts
│       │   │   │   │   ├── pipeline.service.ts
│       │   │   │   │   ├── pipeline.types.ts
│       │   │   │   │   └── __tests__/
│       │   │   │   │
│       │   │   │   ├── 📁 health/         # Health checks
│       │   │   │   │   ├── health.controller.ts
│       │   │   │   │   ├── health.service.ts
│       │   │   │   │   └── __tests__/
│       │   │   │   │
│       │   │   │   └── 📁 metrics/        # Monitoring
│       │   │   │       ├── metrics.service.ts
│       │   │   │       ├── latency.tracker.ts
│       │   │   │       └── __tests__/
│       │   │   │
│       │   │   ├── 📁 shared/
│       │   │   │   ├── middleware/        # Express middleware
│       │   │   │   ├── utils/             # Utilities
│       │   │   │   └── config/            # Configuration
│       │   │   │
│       │   │   ├── app.ts                 # Express app
│       │   │   └── server.ts              # Server entry
│       │   │
│       │   ├── package.json
│       │   ├── tsconfig.json
│       │   └── .env.example
│       │
│       ├── 📁 llm-service/                # LLM Integration
│       │   ├── 📁 src/
│       │   │   ├── 📁 features/
│       │   │   │   ├── 📁 providers/      # LLM providers
│       │   │   │   │   ├── openai/
│       │   │   │   │   │   ├── openai.provider.ts
│       │   │   │   │   │   ├── openai.config.ts
│       │   │   │   │   │   └── __tests__/
│       │   │   │   │   │
│       │   │   │   │   └── anthropic/
│       │   │   │   │       ├── anthropic.provider.ts
│       │   │   │   │       └── __tests__/
│       │   │   │   │
│       │   │   │   ├── 📁 prompts/        # Prompt engineering
│       │   │   │   │   ├── system.prompt.ts
│       │   │   │   │   ├── examples.ts
│       │   │   │   │   └── __tests__/
│       │   │   │   │
│       │   │   │   └── 📁 parser/         # Command parsing
│       │   │   │       ├── command.parser.ts
│       │   │   │       ├── confidence.scorer.ts
│       │   │   │       └── __tests__/
│       │   │   │
│       │   │   └── server.ts
│       │   └── package.json
│       │
│       └── 📁 stt-service/                # Speech-to-Text
│           ├── 📁 src/
│           │   ├── 📁 features/
│           │   │   └── 📁 whisper/        # Whisper integration
│           │   │       ├── whisper.service.ts
│           │   │       ├── audio.processor.ts
│           │   │       └── __tests__/
│           │   └── server.ts
│           └── package.json
│
├── 📁 tools/                              # Development tools
│   ├── 📁 scripts/                        # Automation
│   │   ├── setup.js                      # Initial setup
│   │   ├── create-feature.js             # Scaffold new features
│   │   └── check-health.js               # Service health check
│   │
│   └── 📁 configs/                        # Shared configs
│       ├── eslint.base.js
│       ├── prettier.config.js
│       └── tsconfig.base.json
│
├── 📁 docs/                               # Documentation
│   ├── 📁 architecture/                   # Design decisions
│   │   ├── ADR-001-monorepo.md
│   │   ├── ADR-002-feature-based.md
│   │   └── ADR-003-state-management.md
│   │
│   ├── 📁 guides/                         # How-to guides
│   │   ├── getting-started.md
│   │   ├── adding-features.md
│   │   └── deployment.md
│   │
│   └── 📁 api/                            # API docs
│       └── command-schema.md
│
├── 📄 pnpm-workspace.yaml                 # Workspace config
├── 📄 turbo.json                          # Build pipeline
├── 📄 package.json                        # Root package.json
├── 📄 .gitignore                          # Git ignores
├── 📄 .nvmrc                              # Node version
└── 📄 README.md                           # Project overview
```

---

## **🎯 Why Feature-Based Organization?**

### **The Problem with Layer-Based**

```
❌ Traditional Layer-Based (Hard to understand):
src/
├── components/          # All UI components mixed
│   ├── Canvas.tsx
│   ├── ArrayElement.tsx
│   ├── VoiceButton.tsx
│   └── DragHandler.tsx
├── hooks/              # All hooks mixed
│   ├── useCanvas.ts
│   ├── useVoice.ts
│   └── useDrag.ts
└── services/           # All services mixed
    ├── canvasService.ts
    ├── voiceService.ts
    └── animationService.ts
```

**Problems**:
- 🔄 To understand voice feature, jump between 3 folders
- 🧩 Related code is scattered
- 🤔 Hard to see what belongs together

### **The Solution: Feature-Based**

```
✅ Feature-Based (Easy to understand):
src/features/
├── voice-control/       # Everything about voice in ONE place
│   ├── VoiceButton.tsx
│   ├── VoiceIndicator.tsx
│   ├── useVoiceRecording.ts
│   ├── voiceControl.service.ts
│   ├── voiceControl.types.ts
│   └── __tests__/
├── array-element/       # Everything about arrays together
└── infinite-canvas/     # Everything about canvas together
```

**Benefits**:
- 🎯 One feature = One folder
- 📚 Easy to learn one feature at a time
- 🧪 Test all related code together
- 👥 Teams can own features

---

## **📐 Key Design Principles**

### **1. Colocation Principle**
> "Code that changes together should live together"

**Example**: When adding voice feedback, all changes are in `voice-control/`:
- UI components (VoiceIndicator.tsx)
- Business logic (voiceControl.service.ts)
- Types (voiceControl.types.ts)
- Tests (__tests__/)

### **2. Single Source of Truth**
> "Each piece of information should exist in exactly one place"

**Example**: Command types defined once in `@voice-board/shared-types`, used everywhere:
```typescript
// packages/shared-types/src/commands.ts
export interface Command {
  cmd: 'add_array' | 'edit_array' | 'delete';
  // ... shared by frontend AND backend
}
```

### **3. Progressive Disclosure**
> "Show only what's needed at each level"

**Example**: Public API hides internal complexity:
```typescript
// packages/canvas/src/index.ts
export { VoiceBoard } from './VoiceBoard';
export type { VoiceBoardProps } from './types';
// Internal features not exported
```

### **4. Explicit Dependencies**
> "Make dependencies clear and intentional"

**Example**: Package.json shows exactly what each package needs:
```json
{
  "name": "@voice-board/canvas",
  "dependencies": {
    "@voice-board/shared-types": "workspace:*",
    "konva": "^9.2.0"
  }
}
```

### **5. Test-Driven Structure**
> "If it's hard to test, the structure is wrong"

**Example**: Each feature has colocated tests:
```
voice-control/
├── VoiceButton.tsx
├── VoiceButton.test.tsx    # Right next to component
└── useVoiceRecording.test.ts
```

---

## **🚀 Implementation Guide**

### **Step 1: Create Monorepo Structure**

```bash
# Create workspace
mkdir voice-board-workspace && cd voice-board-workspace
git init

# Setup pnpm workspace
pnpm init

# Create workspace config
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'apps/*'
  - 'packages/*'
  - 'packages/backend/*'
EOF

# Create folder structure
mkdir -p apps/web packages/{canvas,api-client,shared-types}/src packages/backend/{command-router,llm-service,stt-service}/src tools/{scripts,configs} docs/{architecture,guides,api}

# Setup TypeScript
pnpm add -Dw typescript @types/node
```

### **Step 2: Initialize Packages**

```bash
# Initialize each package
cd packages/canvas && pnpm init -y
cd ../api-client && pnpm init -y
cd ../shared-types && pnpm init -y

# Set package names in package.json
# @voice-board/canvas
# @voice-board/api-client  
# @voice-board/shared-types
```

### **Step 3: Setup Development Tools**

```bash
# Root dependencies
cd ../..
pnpm add -Dw turbo prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin vite vitest @testing-library/react

# Create turbo.json
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
EOF
```

### **Step 4: Create Feature Scaffolding Script**

```javascript
// tools/scripts/create-feature.js
const fs = require('fs');
const path = require('path');

function createFeature(name, packagePath) {
  const featurePath = path.join(packagePath, 'src/features', name);
  
  // Create directories
  fs.mkdirSync(path.join(featurePath, '__tests__'), { recursive: true });
  
  // Create files
  const componentName = name.split('-').map(w => 
    w.charAt(0).toUpperCase() + w.slice(1)
  ).join('');
  
  // Component file
  fs.writeFileSync(
    path.join(featurePath, `${componentName}.tsx`),
    `export const ${componentName} = () => {
  return <div>${componentName}</div>;
};`
  );
  
  // Types file
  fs.writeFileSync(
    path.join(featurePath, `${name}.types.ts`),
    `export interface ${componentName}Props {
  // Add props here
}`
  );
  
  // Test file
  fs.writeFileSync(
    path.join(featurePath, '__tests__', `${componentName}.test.tsx`),
    `import { ${componentName} } from '../${componentName}';

describe('${componentName}', () => {
  it('should render', () => {
    // Add test
  });
});`
  );
  
  console.log(`✅ Created feature: ${name}`);
}

// Usage: node create-feature.js array-element packages/canvas
```

---

## **🎓 Learning Path for Freshers**

### **Week 1: Understanding Monorepos**

**Day 1-2: Monorepo Basics**
- What is a monorepo?
- Why use workspaces?
- How packages relate?

**Day 3-4: Tool Setup**
- Install pnpm
- Understand workspace commands
- Run first build

**Day 5: Explore Structure**
- Navigate folders
- Understand naming conventions
- Find related code

### **Week 2: Feature-Based Development**

**Day 1-2: Study One Feature**
- Pick `array-element/`
- Read all files
- Understand connections

**Day 3-4: Modify Feature**
- Add new prop
- Write test
- See changes work

**Day 5: Create New Feature**
- Use scaffolding script
- Build simple component
- Add to canvas

### **Week 3: Backend Integration**

**Day 1-2: Understand Services**
- How services communicate
- API contracts
- Mock vs real services

**Day 3-4: Test Integration**
- Run all services
- Trace request flow
- Debug issues

**Day 5: Add Endpoint**
- New command type
- Update types
- Full flow test

### **Week 4: Contributing**

**Day 1-2: Pick Issue**
- Find "good first issue"
- Understand requirements
- Plan approach

**Day 3-4: Implement**
- Write tests first
- Implement feature
- Manual testing

**Day 5: Submit PR**
- Clean commits
- Good description
- Respond to feedback

---

## **❓ Common Questions (Freshers)**

### **Q: Is this microservices?**
**A:** No! The code is organized in a monorepo, but it still deploys as regular services. Think of it as organizing your closet - clothes are grouped by type, but it's still one closet.

### **Q: Why so many package.json files?**
**A:** Each package is like a mini-project with its own dependencies. This lets us:
- Version packages independently
- Share only what's needed
- Publish to npm later

### **Q: How do I know where to add new code?**
**A:** Ask yourself:
1. What feature does this belong to? → Go to that feature folder
2. Is it shared by multiple features? → Put in `shared/`
3. Is it a new feature? → Create new feature folder

### **Q: What's "workspace:*" in package.json?**
**A:** This means "use the local version from our workspace" instead of downloading from npm. It's how packages reference each other internally.

### **Q: How do imports work between packages?**
**A:** Use package names, not relative paths:
```typescript
// ✅ Good
import { Command } from '@voice-board/shared-types';

// ❌ Bad  
import { Command } from '../../../shared-types';
```

---

## **🏁 Quick Start Commands**

```bash
# Clone and setup
git clone <repo-url>
cd voice-board-workspace
pnpm install

# Start everything
pnpm dev

# Start only frontend
pnpm dev --filter=@voice-board/web

# Run all tests
pnpm test

# Build everything
pnpm build

# Add dependency to specific package
pnpm add react --filter=@voice-board/canvas

# Create new feature
node tools/scripts/create-feature.js my-feature packages/canvas

# Check what changed
pnpm turbo run build --dry-run
```

---

## **✅ Decision Summary**

### **We Chose:**
1. ✅ **Monorepo** - Everything in one place
2. ✅ **Feature-based folders** - Related code together
3. ✅ **pnpm workspaces** - Efficient dependency management
4. ✅ **TypeScript everywhere** - Type safety
5. ✅ **Colocated tests** - Tests next to code

### **We Rejected:**
1. ❌ **Polyrepo** - Too much synchronization overhead
2. ❌ **Layer-based folders** - Code too scattered
3. ❌ **npm/yarn** - Less efficient for monorepos
4. ❌ **JavaScript** - No type safety
5. ❌ **Separate test folder** - Hard to maintain

---

## **🎯 Success Metrics**

- ⏱️ **Feature understanding**: 2 hours → 30 minutes
- 🐛 **Bug fix time**: Find related code in 1 folder
- 👥 **Onboarding**: New dev productive in 3 days
- 🚀 **Build time**: Full build under 2 minutes
- 📦 **Bundle size**: Canvas package < 200KB

---

**Remember**: This structure is designed to make development enjoyable and maintainable. Start with the basics, and the structure will guide you to put things in the right place! 🚀

*Happy Coding! Need help? Check `/docs/guides/getting-started.md` first.*