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

const postroute = require('./routes/project');
const projectroute = require('./routes/projects');
const profroute = require('./routes/professor');
const studentroute = require('./routes/student');
const studentregisterroute = require('./routes/registerStudent');
const professorregisterroute = require('./routes/registerProfessor');
const ProfService = require("./functions/profFunctions");
const profService = new ProfService();
app.use('/posts', postroute);
app.use('/projects', projectroute);
app.use('/professor', profroute);
app.use('/student', studentroute);
app.use('/studentregister', studentregisterroute);
app.use('/professorregister', professorregisterroute);
const db = "mongodb+srv://zaidshamshad:zaidshamshads@cluster0.ubcegg2.mongodb.net/mydc?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true }, () => { console.log("connected to db") });
const professorSockets = {};
const studentSockets = {};
io.on('connection', (socket)=> {

    socket.emit('profid', socket.id);
    socket.emit('studentid', socket.id);
    socket.on('professorConnect', (professorId) => {
        console.log(professorId);
        professorSockets[professorId] = socket.id;
        console.log("professorSockets",professorSockets[professorId]);
    });
    socket.on('studentRegister', (studentid) => {
        studentSockets[studentid] = socket.id;
        console.log("studentSockets",studentSockets[studentid]);
    });
  
    socket.on("studentapply",async (studentId, professorId, projectId) => {
        const professor = await profService.getProfById(professorId);
        if (professor) {
            professor.notifs.push({
                studentid: studentId,
                projectid: projectId,
            });
            await profService.updateProfById(professorId, professor);

            const professorSocketId = professorSockets[professorId];
            console.log("socketid",professorSockets);

            if (professorSocketId) {
                    io.to(professorSocketId).emit('newNotification', {
                        student: studentId,
                        project: projectId,
                    });   
                }
            }
    });
    socket.on("acceptstudent",
        function (projectId,studentId) {
            const studentSocketId = studentSockets[studentId];
            if (studentSocketId) {
                io.to(studentSocketId).emit("studentaccepted", {

                    student: studentId,
                    project: projectId,
                });
            }
        });
    socket.on("rejectstudent",
        function ( projectId,studentId) {
            console.log("rejectstudent",projectId,studentId)
            console.log("studentsockets",studentSockets)
            const studentSocketId =studentSockets[studentId];
            if (studentSocketId) {
                console.log("rejectstudent socket", studentSocketId)

                io.to(studentSocketId).emit("studentrejected", {

                    student: studentId,
                    project: projectId,
                });
            }
        });
  
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});















