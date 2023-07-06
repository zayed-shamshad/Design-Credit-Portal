import axios from 'axios';

const projectsUrl = 'http://localhost:5000/projects';
const postsUrl = 'http://localhost:5000/posts';

class ProjectService {
    static async getProjects() {
        try {
            const response = await axios.get(projectsUrl);
            const projects = response.data.map(project => ({ ...project }));
            return projects;
        } catch (error) {
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }
    }

    static async getAProject(id) {
        try {
            const response = await axios.get(`${postsUrl}/${id}`);
            const project = response.data;
            return project;
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to fetch project: ${error.message}`);
        }
    }

    static insertProject(project) {
        return axios.post(postsUrl, project);
    }

    static deleteProject(id) {
        return axios.delete(`${postsUrl}/${id}`);
    }

    static updateProject(project) {
        return axios.patch(`${postsUrl}/${project._id}`, project);
    }
}

export default ProjectService;
