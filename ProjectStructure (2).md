# **🏗️ Voice Board Canvas \- Complete Project Structure**

*A comprehensive guide to understanding and implementing the Voice Board Canvas monorepo architecture*

---

## **📁 Project Overview**

Voice Board Canvas is an interactive, voice-driven educational tool for teaching data structures. This project is architected as a **monorepo** with a **hybrid approach** \- structured for immediate development while preparing for future distribution as an embeddable library (like Excalidraw).

### **What is a Monorepo?**

A monorepo (monolithic repository) contains multiple related projects in a single repository. Think of it as a neighborhood where different houses (packages) share the same infrastructure (tooling, types, configurations).

### **Why Monorepo for Voice Board?**

1. **Unified Development**: Frontend and backend in one place  
2. **Shared Code**: Types and utilities used across packages  
3. **Atomic Changes**: Update API and UI in single commit  
4. **Future-Ready**: Easy to extract and publish packages

### **Technology Stack**

* **Frontend**: React \+ TypeScript \+ Konva.js \+ Zustand  
* **Backend**: Node.js microservices (Express)  
* **Build Tool**: Vite \+ Turborepo  
* **Package Manager**: pnpm (efficient for monorepos)  
* **Testing**: Vitest \+ Testing Library

---

## **🎯 Detailed Structure with Explanations**

voice-board-workspace/                 \# Root monorepo directory

│

├── apps/                              \# Deployable applications

│   └── demo/                          \# Demo/development application

│       ├── src/                       

│       │   ├── main.tsx              \# Entry point that imports Voice Board

│       │   ├── demo-features/        \# Demo-specific features

│       │   └── styles/               \# Demo-specific styles

│       ├── public/                   \# Static assets for demo

│       ├── index.html                \# HTML entry

│       ├── package.json              \# Demo dependencies

│       └── vite.config.ts            \# Demo build config

│

├── packages/                          \# Reusable packages

│   ├── voice-board/                   \# 🎯 MAIN PACKAGE (future npm package)

│   │   ├── src/                       \# Core source code

│   │   │   ├── components/            \# React UI Components

│   │   │   │   ├── canvas/            \# Konva-based canvas components

│   │   │   │   │   ├── core/          \# Core canvas functionality

│   │   │   │   │   │   ├── InfiniteCanvas.tsx      \# Main canvas with pan/zoom

│   │   │   │   │   │   ├── GridBackground.tsx      \# Grid system

│   │   │   │   │   │   ├── CanvasControls.tsx      \# Zoom/pan controls UI

│   │   │   │   │   │   └── ViewportManager.tsx     \# Viewport culling logic

│   │   │   │   │   │

│   │   │   │   │   ├── elements/      \# Data structure visual components

│   │   │   │   │   │   ├── ArrayComponent.tsx      \# Array visualization

│   │   │   │   │   │   ├── ReferenceComponent.tsx  \# Reference/pointer visualization

│   │   │   │   │   │   ├── BaseElement.tsx         \# Base class for all elements

│   │   │   │   │   │   └── ElementFactory.tsx      \# Factory for creating elements

│   │   │   │   │   │

│   │   │   │   │   ├── interactions/  \# User interaction components

│   │   │   │   │   │   ├── ActionMenu.tsx          \# Click menu for elements

│   │   │   │   │   │   ├── EditMode.tsx            \# Cell editing interface

│   │   │   │   │   │   ├── DragHandler.tsx         \# Drag behavior manager

│   │   │   │   │   │   └── SelectionBox.tsx        \# Multi-select visuals

│   │   │   │   │   │

│   │   │   │   │   └── animations/    \# Animation components

│   │   │   │   │       ├── AnimationManager.tsx    \# Central animation controller

│   │   │   │   │       ├── SortAnimation.tsx       \# Sorting visualizations

│   │   │   │   │       ├── ReferenceAnimation.tsx  \# Address transfer animations

│   │   │   │   │       └── TransitionPresets.tsx   \# Reusable animations

│   │   │   │   │

│   │   │   │   ├── voice/             \# Voice command UI components

│   │   │   │   │   ├── VoiceButton.tsx            \# Microphone activation button

│   │   │   │   │   ├── VoiceIndicator.tsx         \# "Listening..." UI

│   │   │   │   │   ├── AudioWaveform.tsx          \# Real-time audio visualization

│   │   │   │   │   └── VoiceFeedback.tsx          \# Success/error messages

│   │   │   │   │

│   │   │   │   ├── ui/                \# General UI components

│   │   │   │   │   ├── Toolbar.tsx                \# Top toolbar

│   │   │   │   │   ├── StatusBar.tsx              \# Bottom status bar

│   │   │   │   │   ├── Toast.tsx                  \# Notification system

│   │   │   │   │   ├── Modal.tsx                  \# Modal dialogs

│   │   │   │   │   └── ContextMenu.tsx            \# Right-click menus

│   │   │   │   │

│   │   │   │   └── dev/               \# Development-only components

│   │   │   │       ├── PerformanceOverlay.tsx     \# FPS monitor

│   │   │   │       ├── DebugPanel.tsx             \# Debug information

│   │   │   │       └── ServiceHealth.tsx          \# Backend health monitor

│   │   │   │

│   │   │   ├── services/              \# Business logic & external integrations

│   │   │   │   ├── api/               \# Backend communication

│   │   │   │   │   ├── commandRouter.ts           \# Main API client

│   │   │   │   │   ├── apiClient.ts               \# Base HTTP client with retry

│   │   │   │   │   └── mockApi.ts                 \# Mock API for development

│   │   │   │   │

│   │   │   │   ├── voice/             \# Voice processing services

│   │   │   │   │   ├── voiceRecorder.ts           \# Audio recording logic

│   │   │   │   │   ├── audioProcessor.ts          \# Audio level detection

│   │   │   │   │   └── permissionManager.ts       \# Microphone permissions

│   │   │   │   │

│   │   │   │   ├── commands/          \# Command processing

│   │   │   │   │   ├── commandExecutor.ts         \# Execute parsed commands

│   │   │   │   │   ├── commandValidator.ts        \# Validate command structure

│   │   │   │   │   ├── commandHistory.ts          \# Undo/redo management

│   │   │   │   │   └── commandParser.ts           \# Parse responses to actions

│   │   │   │   │

│   │   │   │   └── canvas/            \# Canvas business logic

│   │   │   │       ├── elementManager.ts          \# Element CRUD operations

│   │   │   │       ├── selectionManager.ts        \# Selection state logic

│   │   │   │       ├── exportService.ts           \# Export to PNG/SVG

│   │   │   │       └── autosaveService.ts         \# Periodic state saving

│   │   │   │

│   │   │   ├── stores/                \# State management (Zustand)

│   │   │   │   ├── canvasStore.ts                 \# Main canvas state

│   │   │   │   ├── uiStore.ts                     \# UI state (modals, menus)

│   │   │   │   ├── voiceStore.ts                  \# Voice command state

│   │   │   │   ├── selectionStore.ts              \# Selection state

│   │   │   │   └── historyStore.ts                \# Undo/redo state

│   │   │   │

│   │   │   ├── hooks/                 \# Custom React hooks

│   │   │   │   ├── useCanvas.ts                   \# Canvas interactions

│   │   │   │   ├── useVoiceCommand.ts             \# Voice command hook

│   │   │   │   ├── useAnimations.ts               \# Animation helpers

│   │   │   │   ├── useKeyboardShortcuts.ts        \# Global keyboard handling

│   │   │   │   ├── useElementSelection.ts         \# Selection logic

│   │   │   │   └── useAutoSave.ts                 \# Auto-save hook

│   │   │   │

│   │   │   ├── lib/                   \# Utility libraries

│   │   │   │   ├── animations/        \# Animation utilities

│   │   │   │   │   ├── easings.ts                 \# Easing functions

│   │   │   │   │   ├── sequencer.ts               \# Animation sequencing

│   │   │   │   │   └── physics.ts                 \# Physics-based animations

│   │   │   │   │

│   │   │   │   ├── geometry/          \# Geometric calculations

│   │   │   │   │   ├── collision.ts               \# Collision detection

│   │   │   │   │   ├── curves.ts                  \# Bezier curves for arrows

│   │   │   │   │   └── bounds.ts                  \# Bounding box calculations

│   │   │   │   │

│   │   │   │   └── utils/             \# General utilities

│   │   │   │       ├── debounce.ts                \# Debounce/throttle

│   │   │   │       ├── uid.ts                     \# Unique ID generation

│   │   │   │       ├── colors.ts                  \# Color manipulation

│   │   │   │       └── performance.ts             \# Performance monitoring

│   │   │   │

│   │   │   ├── types/                 \# TypeScript type definitions

│   │   │   │   ├── canvas.ts                      \# Canvas-related types

│   │   │   │   ├── elements.ts                    \# Element type definitions

│   │   │   │   ├── commands.ts                    \# Command structures

│   │   │   │   ├── api.ts                         \# API response types

│   │   │   │   └── index.ts                       \# Type exports

│   │   │   │

│   │   │   ├── constants/             \# Application constants

│   │   │   │   ├── canvas.ts                      \# Canvas limits, defaults

│   │   │   │   ├── animations.ts                  \# Animation timings

│   │   │   │   ├── commands.ts                    \# Valid command types

│   │   │   │   └── keys.ts                        \# Keyboard shortcuts

│   │   │   │

│   │   │   ├── styles/                \# Global styles

│   │   │   │   ├── globals.css                    \# Global CSS reset

│   │   │   │   ├── variables.css                  \# CSS custom properties

│   │   │   │   ├── animations.css                 \# Keyframe animations

│   │   │   │   └── themes/                        \# Theme variations

│   │   │   │       ├── dark.css

│   │   │   │       └── light.css

│   │   │   │

│   │   │   ├── index.tsx              \# Public API exports

│   │   │   ├── App.tsx                \# Main application component

│   │   │   └── VoiceBoard.tsx         \# Embeddable component

│   │   │

│   │   ├── tests/                     \# Test files (mirrors src structure)

│   │   │   ├── unit/                  \# Unit tests

│   │   │   ├── integration/           \# Integration tests

│   │   │   └── e2e/                   \# End-to-end tests

│   │   │

│   │   ├── package.json               \# Package configuration

│   │   ├── tsconfig.json              \# TypeScript configuration

│   │   ├── vite.config.ts             \# Build configuration

│   │   └── README.md                  \# Package documentation

│   │

│   ├── types/                         \# Shared type definitions

│   │   ├── src/

│   │   │   ├── commands.ts            \# Command interfaces

│   │   │   ├── canvas.ts              \# Canvas element types

│   │   │   ├── api.ts                 \# API contracts

│   │   │   └── index.ts               \# Type exports

│   │   └── package.json

│   │

│   └── backend/                       \# Backend microservices

│       ├── command-router/            \# API gateway service

│       ├── llm/                       \# LLM integration service

│       └── stt/                       \# Speech-to-text service

│

├── docs/                              \# Project documentation

│   ├── architecture/                  \# Architecture decisions

│   ├── backend/                       \# Backend guides

│   ├── frontend/                      \# Frontend guides

│   └── api/                           \# API documentation

│

├── tools/                             \# Development tools

│   ├── scripts/                       \# Automation scripts

│   └── configs/                       \# Shared configurations

│

├── pnpm-workspace.yaml                \# Workspace configuration

├── turbo.json                         \# Build pipeline configuration

├── package.json                       \# Root package configuration

└── README.md                          \# Project overview

---

## **🎨 Design Decisions & Rationale**

### **1\. Monorepo Architecture**

**Decision**: Use a monorepo with pnpm workspaces

**Why?**

* **Code Sharing**: Frontend and backend share TypeScript types  
* **Atomic Changes**: API changes and UI updates in one commit  
* **Consistent Tooling**: One set of linting, formatting, testing tools  
* **Simplified CI/CD**: One pipeline builds everything

**Alternative Considered**: Separate repos

* ❌ Type synchronization nightmare  
* ❌ Versioning complexity  
* ❌ Harder to maintain consistency

### **2\. Package Structure**

**Decision**: Main code in `packages/voice-board/` not `apps/`

**Why?**

* **Future npm Package**: Already structured as a library  
* **Clear Boundaries**: Package \= distributable unit  
* **Forced Good Practices**: Think about public API from day one

**Alternative Considered**: Everything in `apps/web/`

* ❌ Major refactoring needed later  
* ❌ Unclear what's public vs private  
* ❌ Harder to extract library

### **3\. Component Organization**

**Decision**: Feature-based grouping (canvas/, voice/, ui/)

**Why?**

* **Cohesion**: Related components together  
* **Scalability**: Easy to add new features  
* **Code Splitting**: Can lazy load features  
* **Team Organization**: Different teams can own features

**Alternative Considered**: Type-based (components/, containers/, pages/)

* ❌ Related files scattered  
* ❌ Unclear feature boundaries  
* ❌ Harder to understand data flow

### **4\. State Management**

**Decision**: Multiple Zustand stores instead of one global store

**Why?**

* **Performance**: Update only relevant components  
* **Modularity**: Features can be toggled  
* **Debugging**: Clear what changed where  
* **Testing**: Test stores in isolation

**Alternative Considered**: Single Redux store

* ❌ Overkill for this project  
* ❌ More boilerplate  
* ❌ All components re-render on any change

### **5\. Services Layer**

**Decision**: Separate services from components

**Why?**

* **Testability**: Pure functions, no UI  
* **Reusability**: Use in different contexts  
* **Framework Agnostic**: Could switch from React  
* **Clear Responsibilities**: UI vs Business Logic

**Alternative Considered**: Logic in components

* ❌ Hard to test  
* ❌ Can't reuse logic  
* ❌ Components become bloated

### **6\. Build Tool Choice**

**Decision**: Vite for bundling, Turborepo for orchestration

**Why?**

* **Speed**: Vite is incredibly fast  
* **Modern**: ES modules, no legacy baggage  
* **Turborepo**: Smart caching, parallel builds  
* **Developer Experience**: Hot reload, fast feedback

**Alternative Considered**: Webpack

* ❌ Slower builds  
* ❌ Complex configuration  
* ❌ Older technology

### **7\. Testing Strategy**

**Decision**: Tests mirror source structure

**Why?**

* **Discoverability**: Easy to find test for any file  
* **Completeness**: Obvious what needs tests  
* **Organization**: Same mental model  
* **Refactoring**: Move source and tests together

**Alternative Considered**: Separate test directory

* ❌ Hard to find related tests  
* ❌ Tests get out of sync  
* ❌ Less obvious coverage

### **8\. CSS Architecture**

**Decision**: CSS Modules \+ CSS Variables for theming

**Why?**

* **Scoped Styles**: No conflicts when embedded  
* **Performance**: Only load used styles  
* **Theming**: CSS variables work everywhere  
* **Developer Experience**: Write normal CSS

**Alternative Considered**: CSS-in-JS

* ❌ Runtime overhead  
* ❌ Harder to override when embedded  
* ❌ Additional dependencies

---

## **🚀 Key Architecture Principles**

### **1\. Separation of Concerns**

Each layer has a single, clear responsibility:

* **Components**: Presentation only  
* **Services**: Business logic only  
* **Stores**: State management only  
* **Hooks**: Reusable component logic only

### **2\. Dependency Direction**

Dependencies flow inward:

Components → Hooks → Services → Types

     ↓         ↓        ↓         ↑

   Stores ←────┴────────┴─────────┘

### **3\. Framework Agnostic Core**

Business logic should work without React:

* Services are pure TypeScript  
* Stores are UI framework independent  
* Types have no framework dependencies

### **4\. Props Over Global State**

For embeddability:

* Components accept props  
* Optional store connections  
* No hard-coded globals

### **5\. Progressive Enhancement**

Features can be toggled:

* Voice is optional  
* Animations can be disabled  
* Dev tools stripped in production

### **6\. Performance First**

Every decision considers performance:

* Viewport culling for large canvases  
* Lazy loading for features  
* Memoization for expensive calculations

### **7\. Developer Experience**

Make the right thing easy:

* Clear file organization  
* Consistent patterns  
* Rich TypeScript types  
* Helpful error messages

### **8\. Testability**

Everything should be testable:

* Pure functions where possible  
* Dependency injection  
* Mock-friendly architecture

---

## **🏃 Getting Started Commands**

### **Initial Setup**

\# 1\. Clone the repository

git clone \<your-repo-url\>

cd voice-board-workspace

\# 2\. Install pnpm globally (if not installed)

npm install \-g pnpm@8

\# 3\. Install all dependencies

pnpm install

\# 4\. Build shared packages first

pnpm run build \--filter=@voice-board/types

### **Development Workflow**

\# Start everything (frontend \+ all backend services)

pnpm dev

\# Start only frontend

pnpm dev \--filter=@voice-board/demo

\# Start only backend services

pnpm dev \--filter="./packages/backend/\*"

\# Start specific service

pnpm dev \--filter=@voice-board/command-router

### **Testing Commands**

\# Run all tests

pnpm test

\# Run tests in watch mode

pnpm test:watch

\# Run tests for specific package

pnpm test \--filter=@voice-board/voice-board

\# Run tests with coverage

pnpm test:coverage

### **Building for Production**

\# Build everything

pnpm build

\# Build specific package

pnpm build \--filter=@voice-board/voice-board

\# Clean all build artifacts

pnpm clean

### **Code Quality**

\# Run linting

pnpm lint

\# Fix linting issues

pnpm lint:fix

\# Type check all packages

pnpm typecheck

\# Format code

pnpm format

### **Useful Development Commands**

\# Check which packages have changed

pnpm changeset status

\# Create a new changeset (for releases)

pnpm changeset

\# Update dependencies

pnpm update \--interactive

\# Check for outdated packages

pnpm outdated

\# Clean install (remove node\_modules and reinstall)

pnpm clean-install

### **Working with Specific Packages**

\# Add dependency to specific package

cd packages/voice-board

pnpm add lodash

\# Add dev dependency

pnpm add \-D @types/lodash

\# Add dependency to root

pnpm add \-Dw prettier

\# Link local packages

pnpm add @voice-board/types \--workspace

### **Environment Setup**

\# Copy environment files

cp apps/demo/.env.example apps/demo/.env

\# Edit environment variables

\# VITE\_API\_BASE\_URL=http://localhost:5173

\# VITE\_ENABLE\_VOICE=true

\# VITE\_ENABLE\_DEV\_TOOLS=true

### **Troubleshooting Commands**

\# If builds fail, try clearing cache

pnpm turbo daemon clean

pnpm clean

pnpm install

\# Check workspace structure

pnpm ls \--depth=0

\# Verify services are running

curl http://localhost:5173/health  \# Command Router

curl http://localhost:5174/health  \# STT Service

curl http://localhost:5175/health  \# LLM Service

---

## **🎓 Learning Path for New Developers**

### **Week 1: Understanding the Structure**

1. Read this document completely  
2. Explore the file structure  
3. Understand monorepo concepts  
4. Learn about workspaces

### **Week 2: Running the Project**

1. Set up development environment  
2. Run the demo application  
3. Make small changes  
4. Understand hot reloading

### **Week 3: Understanding the Architecture**

1. Trace data flow from UI to backend  
2. Understand state management  
3. Learn the component hierarchy  
4. Study the service layer

### **Week 4: Contributing**

1. Pick a small issue  
2. Write tests first (TDD)  
3. Implement the feature  
4. Submit a pull request

---

## **📚 Additional Resources**

* [Monorepo Explained](https://monorepo.tools/)  
* [pnpm Workspaces](https://pnpm.io/workspaces)  
* [Turborepo Docs](https://turbo.build/)  
* [Zustand Documentation](https://docs.pmnd.rs/zustand)  
* [React Konva Guide](https://konvajs.org/docs/react/)

---

**Remember**: This structure is designed to grow with your project. Start simple, but keep the future in mind. The hybrid approach means you can ship your MVP quickly while maintaining the flexibility to extract and distribute components later.

**Happy Coding\! 🚀**

