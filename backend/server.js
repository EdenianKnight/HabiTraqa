const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

app.get('/', (req, res) => {
    res.send('HabiTraqa API is running');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
