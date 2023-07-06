import axios from 'axios';

const professorUrl = 'http://localhost:5000/professor';
const professorRegisterUrl = 'http://localhost:5000/professorregister';

class ProfService {
    static async getProfByToken() {
        try {
            const response = await axios.get(`${professorRegisterUrl}/user`, {
                headers: {
                    professortoken: localStorage.getItem('professortoken')
                }
            });

            const data = response.data;

            if (data.prof && data.prof._id) {
                console.log('getProfByToken executed', data);
                return data;
            } else {
                throw new Error('Invalid response format: missing prof or _id property');
            }
        } catch (error) {
            throw new Error(`Failed to fetch professor by token: ${error.message}`);
        }
    }

    static registerProf(name, email, password, department) {
        return axios.post(`${professorRegisterUrl}/signup`, {
            name,
            email,
            password,
            department,
        });
    }

    static loginProf(email, password) {
        return axios.post(`${professorRegisterUrl}/login`, { email, password });
    }

    static async getProfById(id) {
        try {
            const response = await axios.get(`${professorUrl}/${id}`);
            const data = response.data;
            console.log(data);
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch professor by ID: ${error.message}`);
        }
    }

    static updateProf(updatedProf) {
        
        return axios.patch(`${professorUrl}/${updatedProf._id}`, updatedProf);
    }
}

export default ProfService;
