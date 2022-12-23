import axios from 'axios';
const urlall = 'http://localhost:5000/student';
const url = 'http://localhost:5000/studentregister';
class studentservice {
    static registerstudent(name, email, password, department,skills) {
        return axios.post(url + "/signup", {
            name,
            email,
            password,
            department,
            skills
        });
    }
    static loginstudent(email, password) {
       return axios.post(url + "/login", {email, password});
    }
    static getstudentbyid(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${urlall}/${id}`);
                const data = res.data;
                resolve(
                    data
                )
            }
            catch (err) {
                reject(err);
            }
        })
    }
    static updatestudent(student) {
        return axios.patch(`${urlall}/${student.id}`, student);
    }
}
export default studentservice;








