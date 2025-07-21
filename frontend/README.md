# Voice Assistant Frontend

A React-based UI for visualizing conversations with your LiveKit voice assistant.

## Features

- 🎙️ Real-time voice interaction visualization
- 📊 Audio level visualizer with animated bars
- 💬 Conversation history display
- 🔄 Assistant state indicators (listening, thinking, speaking)
- 🎛️ Voice assistant control bar

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the frontend directory:
   ```
   VITE_LIVEKIT_URL=ws://localhost:7880
   VITE_LIVEKIT_TOKEN=your_livekit_token_here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## LiveKit Token Generation

For development, you can generate a test token using the LiveKit CLI or your LiveKit server. In production, tokens should be generated dynamically on your backend.

## Components

- **App.tsx**: Main application component with LiveKit room setup
- **ConversationHistory.tsx**: Displays chat messages between user and assistant
- **index.css**: Styling for the dark theme UI

## Usage

1. Make sure your LiveKit agent is running (`python agent.py dev`)
2. Start the frontend development server
3. Allow microphone permissions when prompted
4. Start speaking to interact with your voice assistant
5. Watch the real-time visualization and conversation history

## Customization

- Modify colors and styling in `src/index.css`
- Adjust visualizer settings in the `BarVisualizer` component
- Customize message display in `ConversationHistory.tsx` 