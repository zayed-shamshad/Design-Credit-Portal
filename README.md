# Design Credit Registration Portal

The Design Credit Registration Portal is a web-based platform that facilitates the collaboration between students and professors for project registration and selection. The portal allows professors to float projects, students to apply to those projects, and professors to evaluate the students. It incorporates real-time notifications and utilizes JWT tokens for secure authorization and authentication. The technologies used for development include Vue 3, Quasar, HTML, CSS for the frontend, Node.js, Express.js, and MongoDB for the backend, and WebSockets for real-time communication.

## Features

- **Student Portal**: Provides students with a user-friendly interface to browse and apply for available projects.
- **Professor Portal**: Allows professors to create and manage projects, review student applications, evaluate students, and make selections.
- **Project Floating**: Professors can float projects by providing project details such as title, description, requirements, and deadlines.
- **Student Applications**: Students can view project listings, submit applications, and provide relevant information required by professors.
- **Application Review**: Professors can review student applications, evaluate their qualifications, and make informed decisions.
- **Student Evaluation**: Professors can evaluate students based on their performance, skills, and contributions to projects.
- **Accept/Reject Process**: Professors can accept or reject student applications based on the suitability and compatibility of students with their projects.
- **Real-Time Notifications**: The portal incorporates real-time notifications to inform students and professors about application status updates, project changes, evaluation results, and selection outcomes.
- **JWT Token Authentication**: Utilizes JSON Web Tokens (JWT) for secure user authentication and authorization, ensuring data privacy and access control.
- **User Management**: Provides user account management functionality, allowing students and professors to register, login, and update their profiles.
- **Responsive Design**: The portal is built using Vue 3 and Quasar, ensuring a responsive and mobile-friendly design across various devices.

## Technologies Used

- Front-end:
  - Vue 3
  - Quasar
  - HTML
  - CSS

- Back-end:
  - Node.js
  - Express.js
  - MongoDB

- Real-Time Communication:
  - WebSockets

- Authentication and Authorization:
  - JSON Web Tokens (JWT)

## Setup and Configuration

1. Clone the repository or download the project files.
2. Install the necessary dependencies for the frontend and backend using npm or yarn.
3. Configure the database connection settings in the backend configuration files.
4. Implement the necessary API endpoints and routes for user registration, login, project creation, application submission, evaluation, and notification handling.
5. Implement the authentication and authorization logic using JWT tokens in the backend.
6. Create the frontend components and pages for the student and professor portals, project listings, application forms, evaluation forms, and notification displays using Vue 3 and Quasar.
7. Implement the real-time communication mechanism using WebSockets for notifications.
8. Test the portal thoroughly, ensuring all functionalities are working as expected.
9. Deploy the application to a hosting platform of your choice, ensuring the proper configuration for the frontend and backend.

## Usage

To use the Design Credit Registration Portal, follow these steps:

1. Access the portal through the provided URL.
2. Register a new account as a student or professor, providing the required information.
3. Login to the respective portal using the registered credentials.
4. Browse the available projects (students) or float projects (professors).
5. Submit project applications (students) or review applications (professors).
6. Evaluate student submissions (professors) based on predefined criteria.
7. Receive real-time notifications for application updates, evaluation results, and project selections.
8. Accept or reject student applications (professors) based on the evaluation outcomes.
9. Collaborate on selected projects and manage project-related activities.
10. Update profiles and manage account settings as needed.

## Contributors

- [Mohammad Zaid Shamshad](https://github.com/zayed-shamshad)

## License

This project is licensed under the [MIT License](LICENSE).
