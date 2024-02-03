# E-Commerce Application

This is a simple e-commerce application built with React and Node.js. The main features of the application include creating, reading, updating, and deleting products from the database. The application also displays product data on the frontend.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/e-commerce-app.git
    ```

2. Navigate to the project folder:

    ```bash
    cd e-commerce-app
    ```

3. Install dependencies for both client and server:

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

### Configuration

Create a `.env` file in the `server` folder with the following content:

```env
MONGO_URL=your_mongo_db_connection_string
PORT=your_server_port
