// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errorHandlingMiddleware } = require('./middleware');
const { fileController } = require('./controllers');
const config = require('./config');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));
app.use('/api', fileController);

app.use(errorHandlingMiddleware);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
