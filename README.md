# Movie Ticket App

This is a fullstack movie ticket application built with React, Node.js, and MongoDB. The application allows users to browse movies, view showtimes, select seats, and make reservations. It also includes an admin panel for managing movies, genres, showtimes, and cinemas.

## Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)
- MongoDB

## Getting Started

### Running the Application Locally

1. Clone the repository:

```
git clone https://github.com/Mitesh0807/movie-ticket.git
```

2. Install dependencies for both the frontend and backend:

```
cd movie-ticket-app/frontend
npm install

cd ../backend
npm install
```

3. Set up the environment variables for the backend:

Create a `.env` file in the `backend` folder and add the following variables:

```
MONGO_URI=<your-mongodb-uri>
PORT=<port-number>
```

4. Seed the database (optional):

The `seeds.txt` file in the `backend/assets` folder contains dummy data that can be inserted into the database. To seed the database, run the following command from the `backend` folder:

```
npm run seed
```

5. Start the development servers:

To start the frontend and backend development servers simultaneously, run the following command from the project root:

```
npm run dev
```

This will start the frontend development server on `http://localhost:5173` and the backend development server on `http://localhost:5000`.

### Running with Docker

The application can also be run using Docker and Docker Compose.

1. Make sure you have Docker and Docker Compose installed on your machine.

2. From the project root, run the following command to start the containers:

```
docker-compose up
```

This will build and start the containers for the frontend, backend, and MongoDB. The frontend will be available at `http://localhost:5173`, and the backend will be running on `http://localhost:5000`.

Note: The Docker Compose configuration assumes that you have a `.env` file with the required environment variables in the `backend` folder.

## Project Structure

- `frontend`: Contains the React application code.
- `backend`: Contains the Node.js server code and API endpoints.
- `backend/assets`: Contains the `seeds.txt` file with dummy data.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
