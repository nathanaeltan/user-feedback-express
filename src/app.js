const express = require('express');
const feedbackRoutes = require('./routes/feedbackRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

const app = express();
app.use(express.json());

// Main API
app.use('/api/feedback', feedbackRoutes);

// Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



module.exports = app;