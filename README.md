# 🎯 Voice Board Canvas

An interactive, voice-driven educational tool for teaching data structures. Built as a modern monorepo with React, TypeScript, and Konva.js.

## 🚀 Quick Start

```bash
# Install pnpm globally (if not installed)
npm install -g pnpm@8

# Install dependencies
pnpm install

# Build shared packages
pnpm run build --filter=@voice-board/types

# Start development environment
pnpm dev
```

## 📁 Project Structure

This is a monorepo containing:

- **`apps/demo/`** - Development/demo application
- **`packages/voice-board/`** - Main embeddable component library
- **`packages/types/`** - Shared TypeScript types
- **`packages/backend/`** - Backend microservices
- **`docs/`** - Project documentation
- **`tools/`** - Development tools and configurations

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Konva.js + Zustand
- **Backend**: Node.js microservices
- **Build Tool**: Vite + Turborepo
- **Package Manager**: pnpm (monorepo optimized)

## 📚 Documentation

See `docs/` directory for detailed guides:

- [Architecture Overview](docs/architecture/)
- [Frontend Development](docs/frontend/)
- [Backend Services](docs/backend/)
- [API Documentation](docs/api/)

## 🧪 Development

```bash
# Start all services
pnpm dev

# Start only frontend
pnpm dev --filter=@voice-board/demo

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

## 🎨 Features

- **Voice Commands**: Interact with data structures using natural language
- **Interactive Canvas**: Infinite canvas with pan/zoom controls
- **Data Structure Visualization**: Arrays, linked lists, trees, and more
- **Animation System**: Smooth animations for operations
- **Embeddable**: Can be embedded in other applications

## 🤝 Contributing

1. Read the [Project Structure Guide](ProjectStructure%20(2).md)
2. Check out the [development docs](docs/)
3. Pick an issue and start coding!

## 📄 License

MIT - see LICENSE file for details 