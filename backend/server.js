const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('HabiTraqa API is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
