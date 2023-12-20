require('dotenv').config();
const express = require('express');
const app = express();

require('./util/handler')();

// DB connexion
require('./config/db-connextion')();

require('./config/session')(app);

// Routes
require('./routes/routes')(app);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
