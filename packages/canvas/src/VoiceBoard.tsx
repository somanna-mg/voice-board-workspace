import React from 'react'

export interface VoiceBoardProps {
  width?: string | number
  height?: string | number
  enableVoice?: boolean
  enableDevTools?: boolean
  className?: string
  style?: React.CSSProperties
}

export const VoiceBoard: React.FC<VoiceBoardProps> = ({
  width = '100%',
  height = '400px',
  enableVoice = true,
  enableDevTools = false,
  className,
  style,
}) => {
  return (
    <div 
      className={`voice-board ${className || ''}`}
      style={{
        width,
        height,
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <div style={{ textAlign: 'center', color: '#666' }}>
        <h3>🎯 Voice Board Canvas</h3>
        <p>Voice: {enableVoice ? '✅ Enabled' : '❌ Disabled'}</p>
        <p>Dev Tools: {enableDevTools ? '✅ Enabled' : '❌ Disabled'}</p>
        <p style={{ fontSize: '0.9em', marginTop: '1rem' }}>
          Interactive canvas will be implemented here
        </p>
      </div>
    </div>
  )
} 