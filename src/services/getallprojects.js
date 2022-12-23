import axios from 'axios';
const urlall = 'http://localhost:5000/projects';
class allprojectservice {
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
    static getprojectsbydept(department) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${urlall}/` + "dept/" + `${department}`);
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
    static getprojectsbyprof(professor) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${urlall}/` + "professor/" + `${professor}`);
                const data = res.data;
                
                console.log("i got executed in getprojectsbyprof");
                resolve(data.map(project => ({
                    ...project,
                })));
            }
            catch (err) {
                reject(err);
            }
        })
    }
}
export default allprojectservice;








