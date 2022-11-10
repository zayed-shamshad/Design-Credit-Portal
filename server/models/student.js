const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type:String,
        default: "Computer Science",
        required: true
    }
    ,
    project:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        default:null
    },
    requestsstatus:
    {
        type:String,
        default: "notApplied"
    },
    notifs:
    {
        type: {
            "projectid":mongoose.Schema.Types.ObjectId,
            "message": String,
        },
    },
    rejected:
    {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    skills:
    {
        type: [String],
        default: []
    }
});
module.exports = mongoose.model('student', studentSchema);