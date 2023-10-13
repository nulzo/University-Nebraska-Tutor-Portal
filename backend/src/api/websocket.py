# app/consumers.py

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class TextRoomConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = "test"
        self.room_group_name = f"chat_{self.room_name}"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.message", "message": text_data}
        )

    def chat_message(self, event):
        # Receive message from room group
        print(event.get("message"))
        # Send message to WebSocket
        self.send(text_data="Hello from the server!")
