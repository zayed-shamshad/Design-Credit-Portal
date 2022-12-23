import axios from 'axios';
const urlall = 'http://localhost:5000/professor';
const url = 'http://localhost:5000/professorregister';
class profservice {
    static async getprofbytoken() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url + '/user', {
                    headers: {
                        'professortoken': localStorage.getItem('professortoken')
                    }
                })
                const data = res.data;
                console.log(data);
                console.log("i m in getprofbytoken", data);
                resolve(data)
            }
            catch (err) {
                reject(err);
            }
        })
    }
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
    static updateprof(updatedprof) {
        return axios.patch(`${urlall}/${updatedprof.id}`, updatedprof);
    }
}
export default profservice;








