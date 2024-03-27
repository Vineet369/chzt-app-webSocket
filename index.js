const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 9000;

//for socket.io       (socket is like a user or client)
io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message", message);

    })
});

//for http requests: express
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
})

server.listen(PORT, () => console.log(`server started at port ${PORT}`));
