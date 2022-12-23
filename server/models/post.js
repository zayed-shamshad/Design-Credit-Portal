const mongoose = require('mongoose');
 
const projectSchema = mongoose.Schema({
    title: {
    type: String,
    required: true
    },
    description: {
        type: String,
        required: true,
    },
    number: {
        type:Number,
        default:0,
        required:true
    }
    ,
    professor:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'professor',
        required: true
    }
    ,
    students:
    {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'student',
        default: []
    }
    ,
    status:
    {
        type: Boolean,
        default: true
    }
    ,
    skills:
    {
        type: [String],
        default: []
    }
    ,
    department:
    {
        type: String,
        default: 'none'

    }
    ,
    evaluationstatus:
    {
        type:String,
        default: "notEvaluated"
    },
    deliverables:
    {
        type: [String],
        default: []
    },
    
});
module.exports = mongoose.model('Projects', projectSchema);