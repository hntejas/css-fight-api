const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const invalidRouteHandler = require('./middlewares/invalid-route-handler');
const errorHandler = require('./middlewares/error-handler');
const authCheck = require('./middlewares/auth-check');

const fightRouter = require('./routes/fight.router');
const authRouter = require("./routes/auth.router");

const db = require("./utils/db")

const app = express();

app.use(cors());
app.use(bodyParser.json());

db.init();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.use('/auth', authRouter);
app.use('/fight', authCheck, fightRouter);

app.use(invalidRouteHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('server started');
});