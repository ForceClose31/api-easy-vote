const express = require('express');
const dotenv = require('dotenv');
const routes = require('../routes/routes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
