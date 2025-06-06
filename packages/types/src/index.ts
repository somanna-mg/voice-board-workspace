// Core types for Voice Board Canvas
export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Bounds extends Position, Size {}

// Canvas types
export interface CanvasElement {
  id: string
  type: string
  position: Position
  size: Size
  data: any
}

// Voice command types
export interface VoiceCommand {
  id: string
  command: string
  intent: string
  parameters: Record<string, any>
  timestamp: number
}

// Animation types
export interface AnimationConfig {
  duration: number
  easing: string
  delay?: number
}

// Data structure types
export type DataStructureType = 'array' | 'linkedList' | 'tree' | 'graph' | 'stack' | 'queue'

export interface DataStructure {
  id: string
  type: DataStructureType
  elements: any[]
  metadata: Record<string, any>
} 