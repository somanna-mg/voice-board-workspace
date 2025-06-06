# Frontend Development Guide

This guide covers frontend development for the Voice Board Canvas project.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev --filter=@voice-board/demo

# Run tests
pnpm test --filter=@voice-board/voice-board
```

## Component Architecture

### VoiceBoard Component
The main embeddable component that provides the voice-driven canvas interface.

```tsx
import { VoiceBoard } from '@voice-board/voice-board'

<VoiceBoard 
  width="100%"
  height="600px"
  enableVoice={true}
  enableDevTools={false}
/>
```

### Canvas Components
- **Core**: Basic canvas setup and management
- **Elements**: Data structure visualization components
- **Interactions**: User interaction handlers
- **Animations**: Animation system for smooth transitions

### Voice Components
- Voice recognition setup
- Command parsing
- Audio feedback

## State Management

Using Zustand for lightweight state management:

```tsx
// Example store structure
interface CanvasStore {
  elements: CanvasElement[]
  selectedElement: string | null
  addElement: (element: CanvasElement) => void
  removeElement: (id: string) => void
}
```

## Testing

- Unit tests with Vitest
- Component tests with React Testing Library
- Integration tests for voice commands

## Styling

- CSS modules for component-specific styles
- Shared theme system for consistency
- Responsive design principles 