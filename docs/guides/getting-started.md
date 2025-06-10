# Getting Started with Voice Board Canvas

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd voice-board-workspace

# Install dependencies
pnpm install

# Start development
pnpm dev
```

### Project Structure Overview

This is a **monorepo** organized by **features** rather than technical layers. Here's what each directory contains:

```
voice-board-workspace/
├── apps/                              # Runnable applications
│   └── web/                          # Main web application
├── packages/                         # Reusable packages
│   ├── canvas/                       # 🎨 Main canvas package (feature-based)
│   ├── api-client/                   # 📡 Frontend API client
│   ├── shared-types/                 # 📦 Shared TypeScript types
│   └── backend/                      # 🖥️ Backend services
│       ├── command-router/           # API Gateway
│       ├── llm-service/             # LLM Integration
│       └── stt-service/             # Speech-to-Text
└── tools/                           # 🔧 Development utilities
    ├── scripts/                     # Automation scripts
    └── configs/                     # Shared configurations
```

## 🏗️ Feature-Based Organization

Instead of separating code by technical layers (components, services, etc.), we organize by **features**:

### Canvas Package Structure
```
packages/canvas/src/
├── features/                        # Feature-based organization
│   ├── voice-control/              # Everything about voice in one place
│   │   ├── VoiceButton.tsx
│   │   ├── VoiceIndicator.tsx
│   │   ├── useVoiceRecording.ts
│   │   ├── voiceControl.types.ts
│   │   └── __tests__/
│   ├── array-element/              # Array visualization
│   ├── infinite-canvas/            # Pan/zoom functionality
│   ├── element-interactions/       # Drag, select, edit
│   ├── animations/                 # Animation system
│   └── reference-arrows/           # Pointer visualization
├── shared/                         # Code shared across features
│   ├── ui/                        # Common UI components
│   ├── hooks/                     # Common hooks
│   ├── utils/                     # Utilities
│   └── constants/                 # App-wide constants
├── stores/                        # State management
└── styles/                        # Global styles
```

## 🎯 Why This Structure?

### Benefits
- **🎯 Feature Focus**: All related code lives together
- **📚 Easy Learning**: Understand one feature at a time
- **🧪 Better Testing**: Test all related code together
- **👥 Team Ownership**: Teams can own entire features

### Example: Adding Voice Feedback
When adding voice feedback, all changes happen in `voice-control/`:
- Add `VoiceFeedback.tsx` component
- Update `voiceControl.types.ts` for new types
- Add tests in `__tests__/`
- Update service in `voiceControl.service.ts`

## 🛠️ Development Workflow

### Creating a New Feature
Use the scaffolding script:
```bash
node tools/scripts/create-feature.js my-feature packages/canvas
```

This creates:
- Feature directory with proper structure
- Component, types, and test files
- Follows naming conventions

### Running the Project
```bash
# Start everything
pnpm dev

# Start only web app
pnpm dev --filter=@voice-board/web

# Run tests
pnpm test

# Build everything
pnpm build
```

### Adding Dependencies
```bash
# Add to specific package
pnpm add react --filter=@voice-board/canvas

# Add dev dependency to workspace root
pnpm add -Dw eslint
```

## 📦 Package Overview

### @voice-board/canvas
Main canvas package with feature-based organization. Contains all UI components, interactions, and canvas logic.

### @voice-board/api-client
Frontend API client for communicating with backend services. Handles HTTP requests, audio recording, and permission management.

### @voice-board/shared-types
TypeScript type definitions shared between frontend and backend. Single source of truth for API contracts.

### Backend Services
- **command-router**: API Gateway that orchestrates requests
- **llm-service**: LLM integration for command processing
- **stt-service**: Speech-to-text processing

## 🎓 Learning Path

### Week 1: Understanding the Structure
1. Explore the `packages/canvas/src/features/` directory
2. Pick one feature (e.g., `array-element/`) and read all files
3. Understand how components, types, and tests relate

### Week 2: Making Changes
1. Modify an existing feature
2. Add a new prop to a component
3. Write tests for your changes

### Week 3: Creating Features
1. Use the scaffolding script to create a new feature
2. Implement a simple component
3. Add it to the main canvas

## 🤔 Common Questions

### Q: Where do I put shared utilities?
**A:** In `packages/canvas/src/shared/utils/`

### Q: How do I share code between features?
**A:** Put it in `shared/` and import using relative paths

### Q: Where do I add new backend endpoints?
**A:** Add to the appropriate service (command-router, llm-service, or stt-service)

### Q: How do I update types?
**A:** Update `packages/shared-types/src/` and they'll be available everywhere

## 🚀 Next Steps

1. **Explore**: Look around the codebase to get familiar
2. **Run**: Start the development server and see it in action
3. **Modify**: Make a small change to understand the workflow
4. **Create**: Use the scaffolding script to create a new feature

Happy coding! 🎉 