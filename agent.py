from dotenv import load_dotenv
import json

from livekit import agents
from livekit.agents import AgentSession, Agent, RoomInputOptions
from livekit.plugins import (
    openai,
    noise_cancellation,
)

load_dotenv()


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(instructions="You are a helpful voice AI assistant.")


async def entrypoint(ctx: agents.JobContext):
    session = AgentSession(
        llm=openai.realtime.RealtimeModel(
            voice="coral"
        )
    )

    # Event handler to send transcriptions to frontend
    @session.on("user_speech_committed")
    async def on_user_speech(text: str):
        print(f"User said: {text}")
        # Send user transcription to frontend
        message = json.dumps({
            "type": "transcription", 
            "text": text, 
            "sender": "user",
            "timestamp": agents.utils.time_ms()
        })
        await ctx.room.local_participant.publish_data(message.encode())

    @session.on("agent_speech_committed") 
    async def on_agent_speech(text: str):
        print(f"Agent said: {text}")
        # Send agent response to frontend
        message = json.dumps({
            "type": "transcription",
            "text": text,
            "sender": "assistant", 
            "timestamp": agents.utils.time_ms()
        })
        await ctx.room.local_participant.publish_data(message.encode())

    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_input_options=RoomInputOptions(
            # LiveKit Cloud enhanced noise cancellation
            # - If self-hosting, omit this parameter
            # - For telephony applications, use `BVCTelephony` for best results
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    await session.generate_reply(
        instructions="Greet the user and offer your assistance."
    )


if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))