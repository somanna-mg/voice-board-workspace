import React from 'react'
import ReactDOM from 'react-dom/client'
import { VoiceBoard } from '@voice-board/voice-board'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="demo-app">
      <header className="demo-header">
        <h1>🎯 Voice Board Canvas - Demo</h1>
        <p>Interactive voice-driven educational tool for teaching data structures</p>
      </header>
      
      <main className="demo-main">
        <VoiceBoard 
          width="100%"
          height="600px"
          enableVoice={true}
          enableDevTools={true}
        />
      </main>
      
      <footer className="demo-footer">
        <p>Built with React, TypeScript, Konva.js, and Zustand</p>
      </footer>
    </div>
  </React.StrictMode>,
) 