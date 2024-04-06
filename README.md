# Full Stack Development

## Demo 
[Demo.webm](https://github.com/PavanPk1/Full-Stack-Development-Heliverse-Project-/assets/119096078/5403dfd6-d115-4c86-9bfe-ac69da9f548c)


## Description

This project is a web application that allows users to manage a list of users, create teams, and view team details. It consists of both frontend and backend components.

## Features

### Frontend

- **Display Users**: Users are displayed in a visually appealing card format with pagination support.
- **Search by Name**: Users can search for other users by their names, with the list dynamically updating as they type.
- **Filters**: Users can filter the displayed list by Domain, Gender, and Availability.
- **Create Team**: Users can create teams by selecting users from the list. Only users with unique domains and availability are selectable.
- **Responsive Design**: The application is responsive and works well on different screen sizes.

### Backend

- **CRUD API**: Provides Create, Read, Update, Delete operations for managing user data.
  - `GET /api/users`: Retrieve all users with pagination support.
  - `GET /api/users/:id`: Retrieve a specific user by ID.
  - `POST /api/users`: Create a new user.
  - `PUT /api/users/:id`: Update an existing user.
  - `DELETE /api/users/:id`: Delete a user.
- **Filtering, Searching, and Pagination**: Backend implements filtering, searching, and pagination logic for user data.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-folder>`
3. Install dependencies:
   - Frontend: `npm install`
   - Backend: `<backend-setup-instructions>`
4. Configure environment variables if necessary.
5. Start the application:
   - Frontend: `npm start`
   - Backend: `<backend-start-command>`

## Technologies Used

List the technologies/frameworks/libraries used in the project.
  -  React JS
  -  Node JS
  -  Express JS
    
## Credits
 - Pavan kumar Pulipati
