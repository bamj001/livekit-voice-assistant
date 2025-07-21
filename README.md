# 🎙️ LiveKit Voice Assistant with React UI

A real-time voice AI assistant built with LiveKit, OpenAI Realtime API, and React. Features live conversation visualization, transcription history, and seamless voice interaction.

![Voice Assistant Demo](https://img.shields.io/badge/LiveKit-Voice%20Assistant-blue)
![Python](https://img.shields.io/badge/Python-3.11+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

## ✨ Features

- 🎤 **Real-time Voice Interaction**: Seamless conversation with OpenAI's voice model
- 📊 **Live Audio Visualization**: Animated bars showing voice activity
- 💬 **Conversation History**: Complete text transcript of all exchanges
- 🔄 **Real-time Status**: Visual indicators for listening, thinking, and speaking states
- 🌐 **Modern UI**: Beautiful React frontend with dark theme and glassmorphism effects
- ☁️ **Cloud or Local**: Works with LiveKit Cloud or self-hosted servers

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│  React Frontend │◄──►│  LiveKit Server │◄──►│  Python Agent  │
│                 │    │                 │    │                 │
│  • Audio UI     │    │  • WebRTC       │    │  • OpenAI API   │
│  • Transcripts  │    │  • Real-time    │    │  • Voice Model  │
│  • Controls     │    │  • Data Channel │    │  • Transcription│
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+**
- **Node.js 18+** 
- **OpenAI API Key**
- **LiveKit Account** (free tier available)

### 1. Clone & Setup

```bash
git clone https://github.com/your-username/livekit-voice-assistant.git
cd livekit-voice-assistant

# Install Python dependencies
pip install livekit-agents livekit-plugins-openai livekit-plugins-noise-cancellation python-dotenv

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Environment Configuration

Create `.env` in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
LIVEKIT_URL=your_livekit_server_url
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
```

Create `frontend/.env`:
```env
VITE_LIVEKIT_URL=your_livekit_server_url
VITE_LIVEKIT_TOKEN=your_generated_token
```

### 3. Run the Application

**Terminal 1 - Start the Agent:**
```bash
python agent.py dev
```

**Terminal 2 - Start the Frontend:**
```bash
cd frontend
npm run dev
```

**Open your browser:** http://localhost:3000

## 🎯 Usage

1. **Grant microphone permissions** when prompted
2. **Start speaking** - the agent will respond in real-time
3. **Watch the visualization** - see audio levels and conversation status
4. **Review the history** - all exchanges are saved as text transcripts
5. **Use controls** - start/stop listening, test chat, clear history

## 🛠️ Development

### Agent Development

The Python agent (`agent.py`) handles:
- Voice processing with OpenAI Realtime API
- Audio transcription and broadcasting
- LiveKit room management
- Real-time communication

Key components:
- `Assistant` class: Defines the AI personality
- Event handlers: Capture and broadcast transcriptions
- `entrypoint`: Main agent logic and setup

### Frontend Development

The React frontend provides:
- Real-time audio visualization
- Conversation history display
- Connection status monitoring
- Interactive controls

Key files:
- `src/App.tsx`: Main application and LiveKit integration
- `src/components/ConversationHistory.tsx`: Message display
- `src/index.css`: Styling and theme

### Adding Features

**New Agent Capabilities:**
```python
@session.on("user_speech_committed")
async def on_user_speech(text: str):
    # Process user input
    # Add custom logic here
    pass
```

**Frontend Enhancements:**
```typescript
// Add new UI components
// Extend conversation tracking
// Implement new visualizations
```

## 📦 Project Structure

```
livekit-voice-assistant/
├── agent.py                 # Python voice agent
├── .env                     # Server environment variables
├── .gitignore              # Git ignore rules
├── README.md               # This file
└── frontend/               # React frontend
    ├── package.json        # Frontend dependencies
    ├── .env                # Frontend environment
    ├── src/
    │   ├── App.tsx         # Main application
    │   ├── main.tsx        # React entry point
    │   ├── index.css       # Global styles
    │   └── components/
    │       └── ConversationHistory.tsx
    └── dist/               # Build output (ignored)
```

## 🔧 Configuration

### LiveKit Server Options

**Option 1: LiveKit Cloud (Recommended)**
- Sign up at [cloud.livekit.io](https://cloud.livekit.io)
- Get API keys from dashboard
- Use provided server URL

**Option 2: Self-hosted**
```bash
# Install LiveKit server
curl -sSL https://get.livekit.io | bash

# Start local server
livekit-server --dev
```

### OpenAI Configuration

Available voice models:
- `alloy` - Balanced, neutral
- `echo` - Clear, expressive  
- `fable` - British accent
- `onyx` - Deep, authoritative
- `nova` - Warm, conversational
- `shimmer` - Bright, upbeat

Change in `agent.py`:
```python
llm=openai.realtime.RealtimeModel(voice="nova")
```

## 🐛 Troubleshooting

### Common Issues

**1. "Import 'livekit' could not be resolved"**
```bash
pip install livekit-agents livekit-plugins-openai
```

**2. "WebSocket connection failed"**
- Check LIVEKIT_URL in frontend/.env
- Verify token is valid and not expired
- Ensure agent and frontend use same server

**3. "No audio detected"**
- Grant microphone permissions
- Check browser console for errors
- Verify agent is receiving audio tracks

**4. "Conversation history empty"**
- Check browser console for data messages
- Verify agent transcription events are firing
- Ensure both agent and frontend are in same room

### Debug Mode

Enable verbose logging:
```bash
# Agent debug
python agent.py dev --verbose

# Frontend debug  
# Open browser dev tools (F12) → Console
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [LiveKit](https://livekit.io) - Real-time communication platform
- [OpenAI](https://openai.com) - Realtime voice API
- [React](https://reactjs.org) - Frontend framework
- [Vite](https://vitejs.dev) - Build tool

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/livekit-voice-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/livekit-voice-assistant/discussions)
- **LiveKit Docs**: [docs.livekit.io](https://docs.livekit.io)

---

**Built with ❤️ using LiveKit, OpenAI, and React** 