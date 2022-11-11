import axios from 'axios';
const urlall = 'http://localhost:5000/projects';
const url = 'http://localhost:5000/posts';
class projectservice {
    static getprojects() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(urlall);
                const data = res.data;
                resolve(data.map(project => ({
                    ...project,
                })));
            }
            catch (err) {
                reject(err);
            }
        })
    }
    static getaproject(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/${id}`);
                const data = res.data;
                resolve(data);
            }
            catch (err) {
                reject(err);
            }
        })
    }

    static insertproject(title, description, status, number, department, skills, professor, deliverables) {
        return axios.post(url, {
            title,
            description,
            status,
            number,
            department,
            skills,
            professor,
            deliverables
        });
    }
    static deleteproject(id) {
        return axios.delete(`${url}/${id}`);
    }
    static updateproject(id, title, description, number, department, status, professor, students, skills, evaluationstatus, deliverables) {
        console.log(id, title, description, number, department, status, professor, students, skills, evaluationstatus, deliverables);
        return axios.patch(`${url}/${id}`, { title, description, number, department, professor, students, status, skills, evaluationstatus, deliverables });
    }

}
export default projectservice;








