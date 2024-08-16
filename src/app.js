const express = require('express');

require('dotenv').config();
const sequelize = require('./db/config');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});