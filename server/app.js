const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const postroute = require('./routes/posts');
const projectroute = require('./routes/projects');
const profroute = require('./routes/prof');
const studentroute = require('./routes/student');
const studentregisterroute = require('./routes/register');
const professorregisterroute = require('./routes/registerprof');
app.use('/posts', postroute);
app.use('/projects', projectroute);
app.use('/professor', profroute);
app.use('/student', studentroute);
app.use('/studentregister', studentregisterroute);
app.use('/professorregister', professorregisterroute);
const db = "mongodb+srv://zaidshamshad:zaidshamshads@cluster0.ubcegg2.mongodb.net/mydc?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true }, () => { console.log("connected to db") });
io.on('connection', (socket)=> {
    socket.emit('profid', socket.id);
    socket.emit('studentid', socket.id);
    socket.on("acceptstudent",
        function (projectid,studentId) {
            io.emit("studentaccepted", projectid, studentId);
        });
    socket.on("rejectstudent",
        function ( projectid,studentId) {
            io.emit("studentrejected", projectid, studentId);
        });
    socket.on("studentapply",
        function (studentId, profId, projectId, socketId) {
            io.emit("studentapplied",studentId, profId, projectId, socketId);
        }
    );
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});















