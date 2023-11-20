require('dotenv').config();
const express = require('express');
const app = express();

require('./util/handler')();

// Routes
require('./routes/routes')(app);

// DB connexion
require('./config/db-connextion')();

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
