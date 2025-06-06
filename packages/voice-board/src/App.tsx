import React from 'react'
import { VoiceBoard, VoiceBoardProps } from './VoiceBoard'

const App: React.FC<VoiceBoardProps> = (props) => {
  return <VoiceBoard {...props} />
}

export default App 