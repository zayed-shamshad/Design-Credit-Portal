import axios from 'axios';

const studentUrl = 'http://localhost:5000/student';
const studentRegisterUrl = 'http://localhost:5000/studentregister';

class StudentService {
    static registerStudent(name, email, password, department, skills) {
        return axios.post(`${studentRegisterUrl}/signup`, {
            name,
            email,
            password,
            department,
            skills
        });
    }

    static loginStudent(email, password) {
        return axios.post(`${studentRegisterUrl}/login`, { email, password });
    }

    static async getStudentById(id) {
        try {
            const response = await axios.get(`${studentUrl}/${id}`);
            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch student by ID: ${error.message}`);
        }
    }

    static updateStudent(student) {
        return axios.patch(`${studentUrl}/${student._id}`, student);
    }
}

export default StudentService;
