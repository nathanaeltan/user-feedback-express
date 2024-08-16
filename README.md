# User Feedback Express

This project is a simple Express.js application for managing user feedback on products. It includes API routes for creating, updating, deleting, and retrieving feedback. The project uses PostgreSQL as the database and Sequelize as the ORM.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/nathanaeltan/user-feedback-express.git
    cd user-feedback-express
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your database configuration:
    ```env
    DB_NAME=feedbackdb
    DB_USER=yourusername
    DB_PASSWORD=yourpassword
    DB_HOST=localhost
    PORT=3000
    ```

### Database Setup

1. Start PostgreSQL and create the database:
    ```sh
    psql -U yourusername
    CREATE DATABASE feedbackdb;
    ```

2. Run the migrations to create the tables:
    ```sh
    psql -U yourusername -d feedbackdb -f src/db/migrations/create_feedback_and_product_table.sql
    ```

3. Seed the database with initial data:
    ```sh
    psql -U yourusername -d feedbackdb -f src/db/seeds/seed.sql
    ```

### Running the Application

1. Start the server:
    ```sh
    npm run dev
    ```

2. The server will be running on `http://localhost:3000`.

### API Documentation

The API documentation is available at `http://localhost:3000/api-docs`. It is generated using Swagger.

### API Routes

#### Feedback Routes

- **GET /api/feedback**: Retrieve all feedback.
- **GET /api/feedback/:id**: Retrieve feedback by ID.
- **POST /api/feedback**: Create new feedback.
  - Request Body:
    ```json
    {
      "feedback": "Great product!",
      "product_id": 1,
      "user_id": 1
    }
    ```
- **PUT /api/feedback/:id**: Update feedback by ID.
  - Request Body:
    ```json
    {
      "feedback": "Updated feedback",
      "product_id": 1,
      "user_id": 1
    }
    ```
- **DELETE /api/feedback/:id**: Delete feedback by ID.

### Middleware

- **validateFeedback**: Validates the feedback data before creating or updating.
- **validateFeedbackExists**: Checks if the feedback exists before updating or deleting.

### Models

- **User**: Represents a user in the system.
- **Product**: Represents a product in the system.
- **Feedback**: Represents feedback given by a user for a product.

### Services

- **feedbackService**: Contains business logic related to feedback.
- **productService**: Contains business logic related to products.
- **userService**: Contains business logic related to users.

### Testing

To run the tests, use the following command:
```sh
npm test
```