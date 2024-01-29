import * as WebSocket from "ws";

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    const sendCurrentTime = () => {
        const currentTime = new Date().toTimeString();
	    console.log("send time " + currentTime);
        ws.send(currentTime);
    };

    // Send current time
    const interval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            sendCurrentTime();
        }
    }, 10_000);

    // Clear interval on disconnect
    ws.on("close", () => {
	console.log("connection closed");
        clearInterval(interval);
    });
});

console.log("WebSocket server started on ws://localhost:8080");
