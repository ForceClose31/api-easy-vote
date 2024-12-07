const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('../routes/route');
const candidateRoute = require('../routes/candidateRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', candidateRoute);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
