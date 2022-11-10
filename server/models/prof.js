const mongoose = require('mongoose');

const profschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        default: "Computer Science"
    }
    ,
    password: {
        type: String,
        required: true
    },
    projects:
    {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'project',
        default: []
    },

    notifs:
    {
        type:[
            {
                "projectid": mongoose.Schema.Types.ObjectId,

                "studentid": mongoose.Schema.Types.ObjectId,
            }
        ]
        ,
        default: []
    }
});
module.exports = mongoose.model('prof', profschema);