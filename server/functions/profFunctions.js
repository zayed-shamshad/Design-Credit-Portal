const prof = require('../models/prof');

class ProfService {
    async getProfById(id) {
        try {
            const professor = await prof.findById(id);
            return professor;
        } catch (err) {
            return err;
        }
    }
    async updateProfById(id, body) {
        try {
            const professor = await prof.updateOne({ _id: id }, { $set: { name: body.name, email: body.email, department: body.department, projects: body.projects, notifs: body.notifs } });
            return professor;
        } catch (err) {
            return err;
        }
    }
}
module.exports = ProfService;