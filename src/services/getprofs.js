import axios from 'axios';
const urlall = 'http://localhost:5000/professor';
const url = 'http://localhost:5000/professorregister';
class profservice {
    static registerprof(name, email, password, department) {
        return axios.post(url + "/signup", {
            name,
            email,
            password,
            department,
        });
    }
    static loginprof(email, password) {
        return axios.post(url + "/login", { email, password });
    }
    static getprofbyid(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${urlall}/${id}`);
                const data = res.data;
                console.log(data);
                resolve(
                    data
                )
            }
            catch (err) {
                reject(err);
            }
        })
    }
    static updateprof(id, name, email, department, projects, notifs) {
        return axios.patch(`${urlall}/${id}`, { name, email, department, projects, notifs });
    }
}
export default profservice;








