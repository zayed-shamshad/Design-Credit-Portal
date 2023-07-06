import axios from 'axios';

const baseUrl = 'http://localhost:5000/projects';

class AllProjectService {
    static async getProjects() {
        try {
            const response = await axios.get(baseUrl);
            const projects = response.data.map(project => ({ ...project }));
            return projects;
        } catch (error) {
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }
    }

    static async getProjectsByDept(department) {
        try {
            const response = await axios.get(`${baseUrl}/dept/${department}`);
            const projects = response.data.map(project => ({ ...project }));
            return projects;
        } catch (error) {
            throw new Error(`Failed to fetch projects by department: ${error.message}`);
        }
    }

    static async getProjectsByProf(professor) {
        try {
            const response = await axios.get(`${baseUrl}/professor/${professor}`);
            const projects = response.data.map(project => ({ ...project }));
            console.log('getProjectsByProf executed', projects);
            return projects;
        } catch (error) {
            throw new Error(`Failed to fetch projects by professor: ${error.message}`);
        }
    }
}

export default AllProjectService;
