import { useEffect, useRef } from 'react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

interface ConversationHistoryProps {
  messages: Message[]
}

function ConversationHistory({ messages }: ConversationHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="conversation-history">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem' 
      }}>
        <h3 style={{ margin: 0 }}>Conversation History</h3>
        <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {messages.length === 0 ? (
        <div className="no-messages" style={{ 
          textAlign: 'center', 
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <p style={{ color: '#8b949e', fontStyle: 'italic', margin: 0 }}>
            🎤 Start speaking to begin the conversation!<br/>
            All exchanges will be recorded here so you can review them.
          </p>
        </div>
      ) : (
        <div 
          className="messages-container" 
          style={{ 
            maxHeight: '500px', 
            overflowY: 'auto',
            padding: '0.5rem',
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          {messages.map((message, index) => (
            <div 
              key={message.id} 
              className={`message ${message.sender}`}
              style={{ 
                marginBottom: index === messages.length - 1 ? 0 : '1rem'
              }}
            >
              <div className="message-header" style={{ 
                fontSize: '0.75rem', 
                color: '#8b949e', 
                marginBottom: '0.4rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 'bold' }}>
                  {message.sender === 'user' ? '👤 You' : '🤖 Assistant'}
                </span>
                <span>
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p className="message-content" style={{ 
                margin: 0,
                lineHeight: '1.4',
                wordWrap: 'break-word'
              }}>
                {message.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.75rem', 
        color: '#6c757d',
        textAlign: 'center'
      }}>
        💡 Tip: This history shows all voice exchanges so you can catch up on anything you missed!
      </div>
    </div>
  )
}

export default ConversationHistory 