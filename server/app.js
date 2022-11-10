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

var numb = 199787;

// const multer = require('multer');
// const filestorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }

// });

// app.use('/uploads',multer({ storage: filestorage }).single('image'));


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
app.get('/', (req, res) => {
    res.send('Hello World');
});

const db = "mongodb+srv://zaidshamshad:zaidshamshads@cluster0.ubcegg2.mongodb.net/mydc?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true }, () => { console.log("connected to db") });
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.emit('message', numb);
    socket.on("acceptstudent",
        function (data1,data2,data3,title,desc,dept,studentId) {
            io.emit("studentaccepted", data1,data2,data3,title,desc,dept,studentId);
        });
    socket.on("rejectstudent",
        function (requestsstatus,notifs,studentId,title,desc,dept){
            io.emit("studentrejected", requestsstatus, notifs, studentId, title, desc,dept);
        });
    socket.on("studentapply",
        function (profNotifs,studentId,profId,projectId) {
            io.emit("studentapplied", profNotifs,studentId,profId,projectId);
        }
    );
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});















