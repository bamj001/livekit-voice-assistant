import { useState, useCallback, useEffect } from 'react'
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useRoomContext,
  useParticipants,
  useTracks,
} from '@livekit/components-react'
import { Track } from 'livekit-client'
import ConversationHistory from './components/ConversationHistory'

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

function VoiceAssistantApp() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isListening, setIsListening] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const participants = useParticipants()
  const room = useRoomContext()
  const tracks = useTracks([Track.Source.Microphone, Track.Source.Camera], { onlySubscribed: false })

  const addMessage = useCallback((content: string, sender: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, newMessage])
  }, [])

  // Listen for data messages (transcriptions, chat)
  useEffect(() => {
    if (!room) return

    const handleDataReceived = (payload: Uint8Array, participant?: any) => {
      try {
        const data = JSON.parse(new TextDecoder().decode(payload))
        console.log('Received data:', data) // Debug log
        
        if (data.type === 'transcription' && data.text) {
          addMessage(data.text, data.sender === 'user' ? 'user' : 'assistant')
        } else if (data.text) {
          // Handle simple text messages
          addMessage(data.text, participant?.identity?.includes('agent') ? 'assistant' : 'user')
        }
      } catch (e) {
        // Handle non-JSON data as plain text
        const text = new TextDecoder().decode(payload).trim()
        if (text.length > 0) {
          console.log('Received plain text:', text) // Debug log
          addMessage(text, 'assistant')
        }
      }
    }

    // Listen for track subscriptions (when agent speaks)
    const handleTrackSubscribed = (track: any, publication: any, participant: any) => {
      console.log('Track subscribed:', track.kind, participant.identity)
      if (track.kind === 'audio' && participant.identity?.includes('agent')) {
        addMessage('🎤 Assistant is speaking...', 'assistant')
      }
    }

    room.on('dataReceived', handleDataReceived)
    room.on('trackSubscribed', handleTrackSubscribed)
    
    return () => {
      room.off('dataReceived', handleDataReceived)
      room.off('trackSubscribed', handleTrackSubscribed)
    }
  }, [room, addMessage])

  // Add demo messages when component first loads (for testing)
  useEffect(() => {
    if (messages.length === 0) {
      addMessage('Voice assistant connected! Try saying "Hello" to start a conversation.', 'assistant')
    }
  }, [messages.length, addMessage])

  // Simple audio level detection for visualization
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100) // Simple simulation - replace with real audio analysis
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const getStatusText = () => {
    const agentParticipants = participants.filter(p => p.identity?.includes('agent') || p.name?.includes('agent'))
    if (agentParticipants.length === 0) return 'Connecting to voice assistant...'
    if (isListening) return 'Listening for your voice...'
    return 'Voice assistant ready - start speaking!'
  }

  const renderAudioVisualizer = () => {
    const bars = Array.from({ length: 20 }, (_, i) => {
      const height = Math.max(10, audioLevel * Math.random())
      return (
        <div
          key={i}
          style={{
            width: '8px',
            height: `${height}px`,
            backgroundColor: isListening ? '#28a745' : '#6c757d',
            margin: '0 2px',
            borderRadius: '4px',
            transition: 'all 0.1s ease',
          }}
        />
      )
    })

    return (
      <div style={{ display: 'flex', alignItems: 'end', height: '80px', justifyContent: 'center' }}>
        {bars}
      </div>
    )
  }

  return (
    <div className="voice-assistant-container">
      <div className="header">
        <h1>Voice Assistant</h1>
        <p>Start speaking to interact with your AI assistant</p>
      </div>

      <div className="status-section">
        <div className="status-indicator">
          <div className="status-dot listening"></div>
          <span>{getStatusText()}</span>
        </div>
        <div style={{ fontSize: '0.9rem', color: '#8b949e', marginTop: '0.5rem' }}>
          Participants: {participants.length} | Tracks: {tracks.length}
        </div>
      </div>

      <div className="visualizer-section">
        {renderAudioVisualizer()}
      </div>

      <div style={{ margin: '1rem 0', textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={() => setIsListening(!isListening)}
          style={{
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: isListening ? '#dc3545' : '#28a745',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        
        <button
          onClick={() => {
            const userMessage = `Hello, how are you? (${new Date().toLocaleTimeString()})`
            const assistantMessage = `I'm doing great! Thanks for asking. How can I help you today?`
            addMessage(userMessage, 'user')
            setTimeout(() => addMessage(assistantMessage, 'assistant'), 1000)
          }}
          style={{
            padding: '0.8rem 1.2rem',
            borderRadius: '8px',
            border: '1px solid #6c757d',
            backgroundColor: 'transparent',
            color: '#8b949e',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Test Chat
        </button>
        
        <button
          onClick={() => setMessages([])}
          style={{
            padding: '0.8rem 1.2rem',
            borderRadius: '8px',
            border: '1px solid #dc3545',
            backgroundColor: 'transparent',
            color: '#dc3545',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Clear History
        </button>
      </div>

      <ConversationHistory messages={messages} />
    </div>
  )
}

function App() {
  // You'll need to replace these with your actual LiveKit server details
  const serverUrl = import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880'
  const token = import.meta.env.VITE_LIVEKIT_TOKEN || ''

  return (
    <div className="app">
      <LiveKitRoom
        serverUrl={serverUrl}
        token={token}
        connect={true}
        audio={true}
        video={false}
        options={{
          // Try to connect to the same room name as your agent
          publishDefaults: { 
            simulcast: false,
            red: false,
            videoCodec: 'vp8'
          }
        }}
      >
        <VoiceAssistantApp />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  )
}

export default App 