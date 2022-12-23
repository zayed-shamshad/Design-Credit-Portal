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

    static insertproject(project) {
        return axios.post(url, project);
    }
    static deleteproject(id) {
        return axios.delete(`${url}/${id}`);
    }
    static updateproject(project) {
        return axios.patch(`${url}/${project.id}`,project);
    }
}
export default projectservice;








