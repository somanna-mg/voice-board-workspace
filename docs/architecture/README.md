# Architecture Overview

This document provides an overview of the Voice Board Canvas architecture.

## System Components

### Frontend
- **React Components**: UI layer built with React and TypeScript
- **Konva Canvas**: Interactive canvas using Konva.js for 2D graphics
- **State Management**: Zustand for client-side state management
- **Voice Integration**: Web Speech API integration for voice commands

### Backend Services
- **Command Router**: Routes voice commands to appropriate handlers
- **LLM Service**: Natural language processing for command interpretation
- **Speech-to-Text**: Voice transcription service

### Data Flow
1. User speaks command
2. Browser captures audio via Web Speech API
3. Command is sent to backend for processing
4. LLM interprets command intent
5. Command router executes appropriate action
6. Canvas updates reflect the changes

## Technology Stack

- **Frontend**: React, TypeScript, Konva.js, Zustand
- **Backend**: Node.js, Express
- **Build System**: Vite, Turborepo
- **Package Management**: pnpm

## Directory Structure

See the main [Project Structure Guide](../../ProjectStructure%20(2).md) for detailed directory organization. 